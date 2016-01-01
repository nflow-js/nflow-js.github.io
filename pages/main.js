d3.select(window)
  .on('scroll.sidemenu', updateSideMenu)

function updateSideMenu(){
  var d3Body = d3.select('body')
  var d3Header = d3Body.select('.page-header')
  var headerHeight = parseInt(d3Header.style('height'))
  d3Body.classed('has-sidemenu', document.body.scrollTop>=headerHeight)
}

function initTree(e, name){
  var dom = d3.select(e)
  var f = nflow.create(name || 'flow').parent(null)
  tree().dom(dom.node()).flow(f)
  return f
}
