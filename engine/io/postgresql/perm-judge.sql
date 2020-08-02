
create table if not exists perm_judge (
  key serial primary key,
  createdtime timestamp not null default now(),
  owner int,
  brd text not null constraint perm_judge_brd_len check (char_length(brd) <= 64),
  grp text not null constraint perm_judge_grp_len check (char_length(grp) <= 64),
  type int, /* 0 - criteria, 1 - other */
  id text not null unique,
  displayname text
);

create unique index if not exists perm_judge_index on perm_judge (brd, grp, type, owner);
create index if not exists perm_judge_owner on perm_judge (owner);

create table if not exists permtoken_judge (
  brd text not null constraint permtoken_judge_brd_len check (char_length(brd) <= 64),
  grp text not null constraint permtoken_judge_grp_len check (char_length(grp) <= 64),
  token text not null unique primary key,
  id text not null unique,
  email text,
  createdtime timestamp not null default now(),
  redeemspan int not null default 1209600,
  count int not null default 1
);

create index if not exists permtoken_judge_id on permtoken_judge (id);

