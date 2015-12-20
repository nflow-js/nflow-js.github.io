(function(){
var anchors = d3.select('.page')
  .selectAll('h2')
  .datum(function(){ return this.innerText })
  .insert('a')
  .classed('anchor', true)
  .attr('name', String)
  .attr('href', function(d){ return '#'+d})

d3.select('nav.anchors')
  .selectAll('a')
  .data(anchors.data())
  .enter()
  .append('a')
  .text(String)
  .attr('href', function(d){ return '#'+d})
  
d3.selectAll('a')
  .filter(function(){ return this.hash })
  .on('click', scroll)


  function scroll(){
    console.log(this)
    var d = this.hash;
    history.pushState(null, null, d)
    d3.event.preventDefault()
    var e = d3.selectAll('a.anchor')
      .filter(function(e){console.log(this.href, d); return this.hash==d})
      .node()

    d3.transition()
      .delay(0)
      .duration(300)
      .tween("scroll", scrollTween(e.offsetTop));
  }

function scrollTween(offset) {
  return function() {
    var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
    return function(t) { scrollTo(0, i(t)); };
  };
}


}())

