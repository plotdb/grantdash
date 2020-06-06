# Internal APIs

all APIs are prefixed with `/dash/api`.

# POBs ( Project, Organization and Boards )

 - /brd/<slug>/list - list all projects, given board and (optionally) group slug. parameters:
   - offset, limit - pagination control.
   - keyword, category, tag, group - filter

 - /prj/<slug> - project detail.



# User Specific

 * api
   * /d/me/reauth/      - get
   * /d/me/             - get,delete
   * /d/me/avatar       - put
   * /d/me/sync         - post
   * /d/me/passwd       - put
   * /d/me/legal        - put
   * /d/me/config       - put
   * /d/me/o/list       - post
   * /d/user/:id        - put

 * app
   * /me/
   * /me/reauth/
   * /me/settings/
   * /me/billing/
   * /user/:id



error handling

router ->
  1. handle directly in code 
  2. Promise.catch error-handler
  3. next(new ldError)
  4. unexpected error in next

    
