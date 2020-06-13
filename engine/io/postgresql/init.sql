create extension if not exists pg_trgm;


create table if not exists exception (
  key serial primary key,
  detail jsonb,
  ip text,
  createdtime timestamp default now()
);

create table if not exists users (
  key serial primary key,
  username text not null unique constraint users_username_len check (char_length(username) <= 100),
  password text constraint users_password_len check (char_length(password) <= 100),
  usepasswd boolean,
  verified jsonb,
  displayname text, constraint users_displayname_length check (char_length(displayname) <= 64),
  description text, constraint users_description_length check (char_length(description) <= 1024),
  title text, constraint  users_title_length check (char_length(title) <= 100),
  tags text, constraint users_tags_length check (char_length(tags) <= 256),
  createdtime timestamp,
  lastactive timestamp,
  detail jsonb,
  plan jsonb,
  payment jsonb,
  config jsonb,
  staff int,
  deleted boolean
);

create index idx_user_displayname on users (lower(displayname) varchar_pattern_ops);

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

create table if not exists org (
  key serial primary key,
  owner int references users(key) not null,
  slug text not null unique constraint org_slug_len check (char_length(slug) <= 64),
  name text not null constraint org_name_len check (char_length(name) <= 100),
  description text constraint org_description_len check (char_length(description) <= 500),
  detail jsonb,
  createdtime timestamp not null default now(),
  state state not null default 'active',
  deleted bool default false
);

create table if not exists brd (
  key serial primary key,
  owner int references users(key) not null,
  org text references org(slug),
  slug text not null unique constraint brd_slug_len check (char_length(slug) <= 64),
  name text not null constraint brd_name_len check (char_length(name) <= 100),
  description text constraint brd_description_len check (char_length(description) <= 500),
  detail jsonb,
  starttime timestamp,
  endtime timestamp,
  location text,
  createdtime timestamp not null default now(),
  state state not null default 'active',
  deleted bool default false
);

create table if not exists prj (
  key serial primary key,
  owner int references users(key) not null,
  slug text not null unique constraint prj_slug_len check (char_length(slug) <= 64),
  brd text references brd(slug),
  thumb text,
  grp text,
  name text not null constraint prg_name_len check (char_length(name) <= 100),
  description text constraint prj_description_len check (char_length(description) <= 500),
  category text,
  tag jsonb,
  detail jsonb,
  createdtime timestamp not null default now(),
  state state not null default 'active',
  deleted bool default false
);

create index if not exists org_slug on org (slug);
create index if not exists brd_slug on brd (slug);
create index if not exists prj_slug on prj (slug);

create table if not exists discuss (
  key serial primary key,
  url text unique constraint discuss_url_len check (char_length(slug) <= 256),
  slug text not null unique constraint discuss_slug_len check (char_length(slug) <= 256),
  createdtime timestamp not null default now(),
  modifiedtime timestamp not null default now(),
  title text constraint discuss_title_len check (char_length(title) <= 256)
);

create index if not exists discuss_url on discuss (url);
create index if not exists discuss_slug on discuss (slug);

create table if not exists comment (
  key serial primary key,
  owner int references users(key) not null,
  discuss int,
  reply int,
  distance int,
  content jsonb,
  history jsonb,
  createdtime timestamp not null default now(),
  state state not null default 'pending',
  deleted bool default false
);

create index if not exists comment_distance on comment (distance);

create table if not exists post (
  key serial primary key,
  owner int references users(key) not null,
  title text, constraint post_title_length check (char_length(title) <= 256),
  slug text not null unique constraint post_slug_len check (char_length(slug) <= 256),
  brd text references brd(slug),
  detail jsonb,
  history jsonb,
  createdtime timestamp not null default now(),
  modifiedtime timestamp not null default now(),
  state state not null default 'pending',
  deleted bool default false
);
