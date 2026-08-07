-- PsicoBase · controle de assinatura e cotas de produção
-- Pode ser executado mais de uma vez com segurança.

alter table public.profiles
  add column if not exists email text;

update public.profiles p
set email = u.email
from auth.users u
where u.id = p.id
  and (p.email is null or p.email = '');

create unique index if not exists profiles_email_lower_uidx
  on public.profiles (lower(email))
  where email is not null;

create table if not exists public.feature_usage_daily (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_date date not null,
  feature text not null check (feature in ('professor', 'questions', 'case_dossier')),
  use_count integer not null default 0 check (use_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, usage_date, feature)
);

alter table public.feature_usage_daily enable row level security;
revoke all on public.feature_usage_daily from anon, authenticated;

create table if not exists public.payment_events (
  event_key text primary key,
  provider text not null default 'lowify',
  event_status text,
  customer_email text,
  product_id text,
  action_taken text not null default 'received',
  received_at timestamptz not null default now()
);

alter table public.payment_events enable row level security;
revoke all on public.payment_events from anon, authenticated;

create or replace function public.consume_daily_quota(
  p_feature text,
  p_requested integer default 1,
  p_consume boolean default true
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_status text;
  v_is_pro boolean := false;
  v_limit integer;
  v_used integer := 0;
  v_consumed boolean := false;
  v_today date := timezone('America/Fortaleza', now())::date;
begin
  if v_user is null then
    raise exception 'not_authenticated' using errcode = '28000';
  end if;

  if p_feature not in ('professor', 'questions', 'case_dossier', 'supervision') then
    raise exception 'invalid_feature' using errcode = '22023';
  end if;

  select lower(coalesce(access_status, ''))
    into v_status
  from public.profiles
  where id = v_user;

  v_is_pro := coalesce(v_status = 'active', false);

  if p_feature = 'supervision' then
    return jsonb_build_object(
      'allowed', v_is_pro,
      'is_pro', v_is_pro,
      'feature', p_feature,
      'reason', case when v_is_pro then 'pro' else 'premium_required' end
    );
  end if;

  if v_is_pro and p_feature in ('professor', 'questions') then
    return jsonb_build_object(
      'allowed', true,
      'is_pro', true,
      'feature', p_feature,
      'limit', null,
      'used', null,
      'reason', 'unlimited'
    );
  end if;

  if p_feature = 'questions' and not v_is_pro and greatest(coalesce(p_requested, 1), 1) > 5 then
    return jsonb_build_object(
      'allowed', false,
      'is_pro', false,
      'feature', p_feature,
      'limit', 5,
      'used', 0,
      'reason', 'per_request_limit'
    );
  end if;

  v_limit := case
    when p_feature = 'case_dossier' and v_is_pro then 5
    when p_feature = 'case_dossier' then 1
    else 2
  end;

  if not p_consume then
    select coalesce((
      select use_count
      from public.feature_usage_daily
      where user_id = v_user
        and usage_date = v_today
        and feature = p_feature
    ), 0) into v_used;

    return jsonb_build_object(
      'allowed', v_used < v_limit,
      'is_pro', v_is_pro,
      'feature', p_feature,
      'limit', v_limit,
      'used', v_used,
      'remaining', greatest(v_limit - v_used, 0),
      'reason', case when v_used < v_limit then 'available' else 'daily_limit' end,
      'date', v_today
    );
  end if;

  insert into public.feature_usage_daily (user_id, usage_date, feature, use_count, updated_at)
  values (v_user, v_today, p_feature, 1, now())
  on conflict (user_id, usage_date, feature)
  do update set
    use_count = public.feature_usage_daily.use_count + 1,
    updated_at = now()
  where public.feature_usage_daily.use_count < v_limit
  returning use_count into v_used;

  v_consumed := found;

  if not v_consumed then
    select coalesce((
      select use_count
      from public.feature_usage_daily
      where user_id = v_user
        and usage_date = v_today
        and feature = p_feature
    ), 0) into v_used;
  end if;

  return jsonb_build_object(
    'allowed', v_consumed,
    'is_pro', v_is_pro,
    'feature', p_feature,
    'limit', v_limit,
    'used', v_used,
    'remaining', greatest(v_limit - v_used, 0),
    'reason', case when v_consumed then 'allowed' else 'daily_limit' end,
    'date', v_today
  );
end;
$$;

revoke all on function public.consume_daily_quota(text, integer, boolean) from public, anon;
grant execute on function public.consume_daily_quota(text, integer, boolean) to authenticated;
