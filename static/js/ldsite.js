// Generated by LiveScript 1.3.0
(function(){
  return ldc.register('ldsite', [], function(){
    return {
      api: '/dash/api'
      /*
      consent: tos: do
        type: \link
        url: \/consent.pdf
        timing: <[prj-create signin]>
      */,
      ldcvmgrRoot: '/dash/modules/cover',
      avatarUrl: function(it){
        return "/dash/s/avatar/" + it + ".png";
      }
    };
  });
})();