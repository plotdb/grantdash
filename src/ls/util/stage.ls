ldc.register \stage, <[]>, ->
  lc = {cache: {}}
  return do
    get: ({brd}) ->
      if !lc.cache[brd] =>
        ld$.fetch \/dash/api/stage, {method: \GET}, {params: {brd: brd}, type: \json}
          .then ->
            lc.cache[brd] = it or {}
            if !(lc.cache[brd].config) => lc.cache[brd].config = {}
            return lc.cache[brd]
      else Promise.resolve lc.cache[brd]

