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
  var dom = d3.select(e)
  var f = nFlow.create(name || 'flow').parent(null)
  
  var tree =  nflow.create('vis')
        .call(nflowVis.Tree)
        .call(nflowVis.Vis)
  tree.emit('dom', d3.select('figure').node())
  tree.emit('dragging', false)
  tree.emit('track', f)
  
  return f
}
