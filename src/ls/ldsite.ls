(->
  # TODO refactor this to a better location
  ldc.register \ldsite, <[]>, ->
    return {
      api: \/dash/api
      /*
      consent: tos: do
        type: \link
        url: \/consent.pdf
        timing: <[prj-create signin]>
      */
      ldcvmgr-root: \/dash/modules/cover
      avatar-url: -> "/dash/s/avatar/#it.png"
    }
)!
