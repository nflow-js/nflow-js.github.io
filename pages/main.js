d3.select(window)
  .on('scroll.sidemenu', updateSideMenu)
nflow = nFlow
function updateSideMenu(){
  var d3Body = d3.select('body')
  var d3Header = d3Body.select('.page-header')
  var headerHeight = parseInt(d3Header.style('height'))
  d3Body.classed('has-sidemenu', document.body.scrollTop>=headerHeight)
}

nFlow.enableDevTools()
function initTree(e, name){
  var f = nFlow.create(name || 'flow').parent(null)
  
  var tree =  nflowVis.Vis()
    .call(nflowVis.Tree)
    .emit('track', f)
    .emit('dom', d3.select(e).node())
  
  return f
}
