AFRAME.registerComponent('hover', {
    schema: {
        color: {type: 'number', default: 0},
        counter: {type: 'number', default: 0},
        timer: {type: 'number', default: 0},
        hovered: {type: 'boolean', default: false}
    },
    init: function() {
        this.el.setAttribute("material", "color: hsl(" + this.data.color + ", 0%, 50%)")
    },
    update: function() {
        this.el.addEventListener("mouseenter", () => {
            this.data.timer = performance.now();
            this.data.hovered = true;
        });
        this.el.addEventListener("mouseleave", () => {
            this.data.hovered = false;
        });
    },
    tick: function() {
        if (this.data.hovered) {
            this.data.counter = performance.now() - this.data.timer;
            if(this.data.counter > 2000) {
                let entered = document.getElementById('scene1').getAttribute('visible');
                document.getElementById('scene1').setAttribute('visible', !entered);
                document.getElementById('scene2').setAttribute('visible', entered);
                if (entered) {
                    document.getElementById('enter').classList.remove("clickable");
                    document.getElementById('exit').classList.add("clickable");
                }
                else {
                    document.getElementById('enter').classList.add("clickable");
                    document.getElementById('exit').classList.remove("clickable");
                } 
            } else {
                this.data.counter++;
                this.el.setAttribute("material", "color: hsl(" + this.data.color + ", " + (Math.round(this.data.counter/40)) + "%, 50%)");
            }
        }
        else {
            if (this.data.counter > 0) {
                (this.data.counter < 100) ? 0 : this.data.counter-=100;           
                this.el.setAttribute("material", "color: hsl(" + this.data.color + ", " + (Math.round(this.data.counter/40)) + "%, 50%)");
            }
        }
    }
});