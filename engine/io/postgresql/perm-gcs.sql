create table if not exists perm_gcs (
  key serial primary key,
  owner int references users(key) not null,
  id text not null
);

