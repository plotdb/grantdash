require! <[fs]>
data = {}

count = do
  prj: 300
  judge: 10

t1 = Date.now!
for i from 0 til count.judge =>
  for j from 0 til count.prj =>
    data{}[i]{}[j].v = Math.ceil(Math.random! * 3)

t2 = Date.now!

for i from 0 til count.prj =>
  val = [0,0,0]
  for j from 0 til count.judge =>
    val[data[j][i] or 0]++

t3 = Date.now!

console.log t2 - t1
console.log t3 - t2
fs.write-file-sync 'xx', JSON.stringify(data)
