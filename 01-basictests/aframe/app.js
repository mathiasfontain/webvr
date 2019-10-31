let count = 5;

AFRAME.registerComponent('boxes', {
    init: function() { 
        let sceneEl = document.querySelector('[boxes]');
        for(let x = -count; x < count; x++) 
        {
            for (let y = -count; y < count; y++)
            {
                var newBox = document.createElement('a-entity');
                newBox.setAttribute("mybox", "position: " + x + " " + y + " 0");                
                sceneEl.appendChild(newBox);
            }
        }
    },
});

AFRAME.registerComponent('mybox', {
    schema: {
        position: { type: 'vec3' },
        rotation: { type: 'number' },
        color: { type: 'string' },
        scale: { type: 'vec3', default: { x: 0.75, y: 0.1, z: 0.75 } }
    },
    init: function() {
        this.data.color = getBoxColor(this.data.position.x, this.data.position.y);
        this.el.setAttribute('material', "color: " + this.data.color);
        this.el.setAttribute('geometry', "primitive: box");   
        this.el.object3D.scale.set(this.data.scale.x, this.data.scale.y, this.data.scale.z);        
        this.el.object3D.position.set(this.data.position.x, this.data.position.z, this.data.position.y);
    }
});

function getBoxColor(x,y) 
{
    return "hsl(" + map(x+y, -count*2, count*2, 0, 255) + ", 60%, 50%)";
}

function map(value, in_min, in_max, out_min, out_max) 
{
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
