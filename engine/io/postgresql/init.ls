require! <[../../../secret ../postgresql pg]>

queries = []

queries.push """create extension if not exists pg_trgm;"""

queries.push init-exception-table = """create table if not exists exception (
  key serial primary key,
  detail jsonb,
  ip text,
  createdtime timestamp default now()
)"""

# staff: 1 = root, null / 0 = regular user, > 2 for future use
queries.push init-users-table = """create table if not exists users (
  key serial primary key,
  username text not null unique constraint nlen check (char_length(username) <= 100),
  password text constraint pwlen check (char_length(password) <= 100),
  usepasswd boolean,
  verified jsonb,
  displayname text, constraint displaynamelength check (char_length(displayname) <= 100),
  description text,
  datasize int,
  createdtime timestamp,
  lastactive timestamp,
  public_email boolean,
  avatar text,
  detail jsonb,
  plan jsonb,
  payment jsonb,
  config jsonb,
  staff int,
  deleted boolean
)"""

queries.push init-mailverifytoken-table = """create table if not exists mailverifytoken (
  owner int references users(key) on delete cascade,
  token text,
  time timestamp
)"""

queries.push init-pwresettoken-table = """create table if not exists pwresettoken (
  owner int references users(key) on delete cascade,
  token text,
  time timestamp
)"""

queries.push init-sessions-table = """create table if not exists sessions (
  key text not null unique primary key,
  detail jsonb
)"""

queries.push init-sessions-key-table = """
  create index if not exists sessions_detail_key on sessions (((detail->'passport'->'user'->>'key')::int))
"""

client = new pg.Client secret.io-pg.uri
(e) <- client.connect
if e => return console.log e
console.log "connected"

query = (q) -> new Promise (res, rej) ->
  (e,r) <- client.query q, _
  if e => rej e
  res r

consume = ->
  if queries.length =>
    task = queries.splice(0, 1).0
    query task
      .then -> consume!
      .catch -> [console.log(it), client.end!]
  else
    console.log "done."
    client.end!

consume!
