let count = 25;

AFRAME.registerComponent('allboxes', {
    init: function() {
        let sceneEl = document.querySelector('[allboxes]');
        for(let x = -count; x <= count; x++) 
        {
            for (let y = -count; y <= count; y++)
            {
                var newBox = document.createElement('a-entity');
                newBox.setAttribute("mybox", "position: " + x + " " + y + " -18");    
                newBox.setAttribute("class", "clickable");          
                sceneEl.appendChild(newBox);
            }
        }
    }
});

AFRAME.registerComponent('mybox', {
    schema: {
        position: { type: 'vec3' },
        color: { type: 'string' },
        scale: { type: 'vec3', default: { x: 0.75, y: 0.75, z: 0.75 } },
        preColor: { type: 'string' },
        hovered: { type: 'boolean', default: false }
    },
    init: function() {
        this.data.color = getBoxColor(this.data.position.x, this.data.position.y);
        this.el.setAttribute('material', "color: " + this.data.color);
        this.el.setAttribute('geometry', "primitive: box");   
        this.el.setAttribute('animation', "property: rotation; easing: linear; from: 90 0 0; to: 90 90 0; loop: true; dur: 2000");   
        this.el.object3D.scale.set(this.data.scale.x, this.data.scale.y, this.data.scale.z);        
        this.el.object3D.position.set(this.data.position.x, this.data.position.y, this.data.position.z);
    },
    update: function() {
        this.el.addEventListener("mouseenter", () => {
            console.log("OK")
            this.data.hovered = true;
        });
        this.el.addEventListener("mouseleave", () => {
            this.data.hovered = false;
        });
    },
    tick: function() {
        if (this.data.hovered) {
            this.data.color = "hsl(0, 60%, 50%)";
            this.el.setAttribute('animation', "property: rotation; easing: linear; from: 90 0 0; to: 90 -90 0; loop: true; dur: 1000");   
            this.el.setAttribute('material', "color: " + this.data.color);
        }
    }
});

function getBoxColor(x,y) 
{
    return "hsl(" + map(x+y, -count*2, count*2, 110, 200) + ", 60%, 50%)";
}

function map(value, in_min, in_max, out_min, out_max) 
{
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
