require! <[fs fs-extra path]>

# prj root, such as /server/users/org/my-org/prj
root = ""

# brd name
name = ""

# read brd form info
school = JSON.parse(fs.read-file-sync "#{name}-info.json" .toString!)
form = school.detail.group.0.form.list.filter -> it.name == 'form-file'

# read prj info
prjs = fs.read-file-sync "#{name}-prjs.json" .toString! .split(\\n) .filter(->it)

for idx from 0 til prjs.length =>
  prj = JSON.parse(prjs[idx])
  slug = prj.slug
  answer = prj.{}detail.{}answer
  prjname = (prj.name or '')replace(/[\\\/,"]/g,'-').trim!
  console.log "#{(idx + 1)} - #{prjname}"
  form.map (f) ->
    name = (f.title or "unnamed")replace(/[\\\/,"]/g,'-').trim!
    files = answer{}[f.key].[]list
    files.map (d,i) ->
      ext = if (/(\..+)$/.exec(d.fn)) => that.1 else ''
      src = path.join(root, slug, "upload", d.fn)
      des = path.join("files", (prjname), "#name-#{i + 1}#ext")
      if !fs.exists-sync(src) => return
      fs-extra.ensure-dir-sync path.dirname(des)
      fs-extra.copy-sync src, des, {overwrite: true}

