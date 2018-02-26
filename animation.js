var svg = d3.select("#tree-skeleton");
var width = window.innerWidth, height = window.innerHeight;
var index = -1;

var branches = [{ 'xPos': width*0.34, 'yPos': height*0.45 },
                { 'xPos': width*0.39, 'yPos': height*0.28 },
                { 'xPos': width*0.49, 'yPos': height*0.16 },
                { 'xPos': width*0.60, 'yPos': height*0.24 },
                { 'xPos': width*0.66, 'yPos': height*0.31 },
                { 'xPos': width*0.64, 'yPos': height*0.48 }];
var scale = 0.05;

var ranges = [{ 'minXPos': width*0.25, 'minYPos': height*0.27, 'maxXPos': width*0.43, 'maxYPos': height*0.53 },
              { 'minXPos': width*0.36, 'minYPos': height*0.14, 'maxXPos': width*0.50, 'maxYPos': height*0.40 },
              { 'minXPos': width*0.43, 'minYPos': height*0.01, 'maxXPos': width*0.53, 'maxYPos': height*0.40 },
              { 'minXPos': width*0.52, 'minYPos': height*0.09, 'maxXPos': width*0.62, 'maxYPos': height*0.42 },
              { 'minXPos': width*0.53, 'minYPos': height*0.19, 'maxXPos': width*0.72, 'maxYPos': height*0.43 },
              { 'minXPos': width*0.54, 'minYPos': height*0.32, 'maxXPos': width*0.70, 'maxYPos': height*0.53 }];

//function mouseover() {
//  d3.select(this)
//    .transition()
//      .duration(750)
//      .attr("transform", "translate(" + [branches[index].xPos-30, branches[index].yPos-30] + ")scale(" + (scale*3) + ")");
//}

var asd = firebase.app().database().ref();
// on update
asd.on("value", function (snap) {
    if(!snap.val())
        return;
    
    //var keys = Object.keys(snap.val());
    //var values = Object.values(snap.val());
    //console.log(values[values.length-1]);
    // TODO:
    // After 6, add only flower at random location
    index = (index+1)%6;
    
    addBushes(25);
});

function addBushes(i) {
    var randWidth = Math.random()*(ranges[index].maxXPos - ranges[index].minXPos + 1) + ranges[index].minXPos;
    var randHeight = Math.random()*(ranges[index].maxYPos - ranges[index].minYPos + 1) + ranges[index].minYPos;
    var randScale = Math.random()*2 + 2;
    
    setTimeout(function () {
        svg.append("image").attr("href", "bush.png").attr("class", "bush")
            .attr("transform", "translate(" + [randWidth, randHeight] + ")scale(" + scale + ")")
            .transition()
                .duration(750)
                .attr("transform", "translate(" + [randWidth-(randScale*10), randHeight-(randScale*10)] + ")scale(" + (scale*randScale) + ")");
        
        if (i-->0)
            addBushes(i);
        else
            addFlower();
    }, 100);
}
               
function addFlower() {
    svg.append("image").attr("href", "flower2.png").attr("class", "flower")
        .attr("transform", "translate(" + [branches[index].xPos, branches[index].yPos] + ")scale(" + (scale*0.5) + ")")
        .transition()
            .duration(750)
            .attr("transform", "translate(" + [branches[index].xPos-30, branches[index].yPos-30] + ")scale(" + (scale*3) + ")");
    
    d3.selectAll('.flower').each(function() {
        d3.select(this).moveToFront();
    })
}

d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};

/* add to database
    var updates = {};
	updates['thesis' + "3"] = 'branch1';
	firebase.database().ref().update(updates);
*/
(function (){
    $('body').mousemove(function() {
        console.log((event.pageX/1887) + ", " + (event.pageY/974));
    });
})();