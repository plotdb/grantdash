create extension if not exists pg_trgm;


create table if not exists exception (
  key serial primary key,
  detail jsonb,
  ip text,
  createdtime timestamp default now()
);

create table if not exists users (
  key serial primary key,
  username text not null unique constraint nlen check (char_length(username) <= 100),
  password text constraint pwlen check (char_length(password) <= 100),
  usepasswd boolean,
  verified jsonb,
  displayname text, constraint displaynamelength check (char_length(displayname) <= 100),
  description text,
  createdtime timestamp,
  lastactive timestamp,
  detail jsonb,
  plan jsonb,
  payment jsonb,
  config jsonb,
  staff int,
  deleted boolean
);

create table if not exists mailverifytoken (
  owner int references users(key) on delete cascade,
  token text,
  time timestamp
);

create table if not exists pwresettoken (
  owner int references users(key) on delete cascade,
  token text,
  time timestamp
);

create table if not exists sessions (
  key text not null unique primary key,
  detail jsonb
);

create index if not exists sessions_detail_key on sessions (((detail->'passport'->'user'->>'key')::int));

create type state as enum ('active','pending','deleted','canceled','suspended','invalid');

create table if not exists organization (
  key serial primary key,
  owner int references users(key) not null,
  slug text not null,
  name text not null constraint name_len check (char_length(name) <= 100),
  description text constraint description_len check (char_length(description) <= 500),
  detail jsonb,
  createdtime timestamp not null default now(),
  state state not null default 'active',
  deleted bool default false
);

create table if not exists board (
  key serial primary key,
  owner int references users(key) not null,
  org int references organization(key),
  slug text not null,
  name text not null constraint name_len check (char_length(name) <= 100),
  description text constraint description_len check (char_length(description) <= 500),
  detail jsonb,
  starttime timestamp,
  endtime timestamp,
  location text,
  createdtime timestamp not null default now(),
  state state not null default 'active',
  deleted bool default false
);

create table if not exists project (
  key serial primary key,
  owner int references users(key) not null,
  slug text not null,
  board int references board(key),
  name text not null constraint name_len check (char_length(name) <= 100),
  description text constraint description_len check (char_length(description) <= 500),
  detail jsonb,
  createdtime timestamp not null default now(),
  state state not null default 'active',
  deleted bool default false
);
