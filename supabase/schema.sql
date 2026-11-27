-- =========================================
-- 1. PROFILES (dados públicos do jogador)
-- =========================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_public"
  on public.profiles for select
  using (true);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Cria o profile automaticamente quando alguém se cadastra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'username',
      split_part(new.email, '@', 1) || '_' || substr(new.id::text, 1, 4)
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================
-- 2. MONSTERS
-- =========================================
create table public.monsters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete cascade,
  name text not null,
  description text,
  image_url text,
  type text not null
    check (type in ('fire', 'water', 'grass', 'electric', 'normal')),
  weight numeric(6,2) not null check (weight > 0),
  height numeric(5,2) not null check (height > 0),
  hp integer not null default 100 check (hp between 10 and 100),
  attack integer not null default 50 check (attack between 10 and 100),
  defense integer not null default 50 check (defense between 10 and 100),
  speed integer not null default 50 check (speed between 10 and 100),
  created_at timestamptz not null default now()
);

create index monsters_user_id_idx on public.monsters (user_id);

-- =========================================
-- 3. ROW LEVEL SECURITY
-- =========================================
alter table public.monsters enable row level security;

create policy "monsters_select_public"
  on public.monsters for select
  using (true);

create policy "monsters_insert_authenticated"
  on public.monsters for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "monsters_update_owner"
  on public.monsters for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "monsters_delete_owner"
  on public.monsters for delete
  to authenticated
  using (auth.uid() = user_id);

-- =========================================
-- 4. PERMISSÕES DA API
-- =========================================
grant usage on schema public to anon, authenticated;
grant select on public.monsters to anon, authenticated;
grant insert, update, delete on public.monsters to authenticated;
grant select on public.profiles to anon, authenticated;
grant update on public.profiles to authenticated;

-- =========================================
-- 5. SEED: 4 monstros iniciais (sem dono)
-- =========================================
insert into public.monsters
  (name, description, type, weight, height, hp, attack, defense, speed)
values
  ('Flamix',
   'Um lagarto de pelagem ardente que cospe brasas quando fica irritado.',
   'fire', 38.50, 1.10, 80, 85, 55, 70),

  ('Aquaron',
   'Criatura dos rios com escamas azuis, resistente e de movimentos fluidos.',
   'water', 62.00, 1.60, 100, 65, 80, 50),

  ('Folhagor',
   'Guardião da floresta coberto de folhas, lento, mas muito difícil de derrubar.',
   'grass', 75.30, 1.45, 95, 60, 85, 40),

  ('Voltibit',
   'Pequeno monstro elétrico que corre faiscando e ataca antes de qualquer um.',
   'electric', 12.80, 0.60, 65, 75, 45, 100);
