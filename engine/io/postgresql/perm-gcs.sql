create table if not exists perm_gcs (
  key serial primary key,
  owner int references users(key) not null,
  brd text,
  grp text,
  id text not null
);

create unique index if not exists perm_gcs_index on perm_gcs (id);
