-- Create debts table
create table
    public.debts (
        id uuid primary key default gen_random_uuid (),
        user_id uuid not null references auth.users (id) on delete cascade,
        counterpart_name text not null,
        type text not null check (type in ('owed_to_me', 'i_owe')),
        amount bigint not null,
        paid_amount bigint default 0,
        note text,
        due_date date,
        settled_at timestamptz,
        created_at timestamptz default now (),
        updated_at timestamptz default now ()
    );

-- Enable Row Level Security
alter table debts enable row level security;

-- Create RLS Policies
create policy "Users can view own debts" on debts for
select
    using (auth.uid () = user_id);

create policy "Users can insert own debts" on debts for insert
with
    check (auth.uid () = user_id);

create policy "Users can update own debts" on debts for
update using (auth.uid () = user_id);

create policy "Users can delete own debts" on debts for delete using (auth.uid () = user_id);