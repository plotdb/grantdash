# Stages, Permissions & Options

List all possible configuration and permissions 

## Permissions

Indicate what kind of privilege an user has.  There are two kinds of permission - `action` or `role`.

 * role - label user with certain role and grant permission based on what this role can do:
   - owner
   - judge

 * action - grant privilege to user to do certain action who obtains this action.
   - prj-new
   - prj-edit-own
   - comment-new
   - comment-edit

## Stages

Event-related options that may changed through time.

 * public         - 活動公開
 * prj-new        - 開放建立提案
 * prj-edit       - 開放修改提案
 * prj-view       - 開放瀏覽提案
 * prj-list-view  - 開放瀏覽提案列表
 * comment-new    - 開放建立評論
 * comment-delete - 開放刪除自己的評論
 * comment-edit   - 開放編輯自己的評論
 * comment-view   - 開放瀏覽評論
 * judge-criteria - 開放資格審查表
 * judge-primary  - 開放初審表
 * judge-final    - 開放決選表


## Options

For configuring how system works and looks like. 

### Org-based

 - public-user - /user/:id public and visible to anonymous users.
