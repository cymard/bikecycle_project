class Canvas {
    constructor(){
        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.rect = canvas.getBoundingClientRect();
        this.tracer = false;
    }

    /**
     * Permet de tracer une ligne sur un canvas
     * @param {number} x1 - coordonnée x du point de départ du trait
     * @param {number} y1 - coordonnée y du point de départ du trait
     * @param {number} x2 - coordonnée x du point de d'arrivé du trait
     * @param {number} y2 - coordonnée y du point de d'arrivé du trait
     */
    tracerUnTrait(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.strokeStyle = "black";
    }

    mouseDown(event){
        this.x = event.clientX - this.rect.left;
        this.y = event.clientY - this.rect.top;
        this.tracer = true;
        this.tracerUnTrait(this.x, this.y, event.clientX - this.rect.left, event.clientY - this.rect.top);
    }

    mouseMove(event){
        if (this.tracer === true) {
            this.tracerUnTrait(this.x, this.y, event.clientX - this.rect.left, event.clientY - this.rect.top);
            this.x = event.clientX - this.rect.left;
            this.y = event.clientY - this.rect.top;
        }
    }

    mouseUp(event){
        this.tracer = false;
    }

    testChangementPositionXY(){
        if(this.x === 0 && this.y === 0){
            return false;
        }else{
            return true;
        }
    }


}
   
const instanceCanva = new Canvas();

////canvas signature

canvas.addEventListener("mousedown", function (event) {
    instanceCanva.mouseDown(event);
})

canvas.addEventListener("mousemove", function (event) {
    instanceCanva.mouseMove(event);
})

canvas.addEventListener("mouseup", function (event) {
    instanceCanva.mouseUp(event);
})
