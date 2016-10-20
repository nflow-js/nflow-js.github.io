var tree =  nflowVis.Vis()
  .call(nflowVis.Tree)
  .emit('track', nflow)
  .emit('dom', document.querySelector('figure'))
