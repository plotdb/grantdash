# pack files

pack uploaded files based on board slug. usage:

1. export board info and project list from db ( replace `brd-slug` and `output` path ):

    copy (select row_to_json(t) from (select name,slug,detail from prj where brd = 'brd-slug' and state = 'active' and deleted is not true) t) to '/tmp/output-prj.json';

    copy (select row_to_json(t) from (select slug,detail from brd where slug = 'brd-slug') t) to '/tmp/output-info.json';

2. move above generated file here. 
3. modify `name` and `root` in `main.ls`, based on server path and board slug ( example in main.ls )
4. fix format: replace all double-backslash in json files to single-backslash ( g.g., with vim: `%s/\\\\/\\/g` )
5. run `main.ls`. all files are now named properly under `files` folder.

we expect this to be automated in code, but for now we will do it manually.
