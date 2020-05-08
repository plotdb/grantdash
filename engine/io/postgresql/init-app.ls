require! <[../../../secret ../postgresql pg]>

queries = []

queries.push """
create type state as enum ('active','pending','deleted','canceled','suspended','invalid');
"""

queries.push """create table if not exists board (
  key serial primary key,
  owner int references users(key) not null,
  slug text not null,
  title text not null constraint title_len check (char_length(title) <= 100),
  description text constraint description_len check (char_length(description) <= 500),
  detail jsonb,
  createdtime timestamp not null default now(),
  state state not null,
  deleted bool default false
)"""

queries.push """create table if not exists project (
  key serial primary key,
  owner int references users(key) not null,
  slug text not null,
  board int references board(key),
  title text not null constraint title_len check (char_length(title) <= 100),
  description text constraint description_len check (char_length(description) <= 500),
  detail jsonb,
  createdtime timestamp not null default now(),
  state state not null,
  deleted bool default false
)"""


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
