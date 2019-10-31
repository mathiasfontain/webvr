let lon = 0;
let lat = 0;

AFRAME.registerComponent('issdata', {
    schema: {
        xPos: {type: 'number', default: 0},
        yPos: {type: 'number', default: -100}
    },
    init: function() {
        resetStation();
        setInterval(resetStation, 5000);
    },
    update: function() {
    },
    tick: function() {
        this.data.xPos = map(lon, -180, 180, -10, 10);
        this.data.yPos = map(lat, -90, 90, -5, 5);
        this.el.setAttribute("position", this.data.xPos + " " + this.data.yPos + " -8");
    }
});

function resetStation() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.wheretheiss.at/v1/satellites/25544', true);
    request.onload = function() {
        var issData = JSON.parse(this.response);
        lon = issData.longitude;
        lat = issData.latitude;
        console.log("ISS-Position: " + lon + ":" + lat);
    }
    request.send();
}

function map(value, in_min, in_max, out_min, out_max) 
{
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
