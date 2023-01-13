export type Point = { x: number, y: number };

/**
 * DrawingBoard mit einem Canvas zum Zeichnen von einfachen Figuren.
 * Die Figuren die gezeichnet werden können, werden über eine {@code ToolBar}
 * ausgewählt. Die Farbe kann über die {@code ColorBar} gewählt werden.
 * 
 * DrawingBoard with a Canvas for drawing simple shapes.
 */
export class DrawingBoard {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;


    /**
     * Erzeugt ein Canvas mit gegebener id und hängt dieses an das gegebene Parent-Element.
     * 
     * Creates a new Canvas with given id and appends it to the given parent element.
     */
    constructor(parent: Element, id: string) {
        this.canvas = document.createElement("canvas");
        this.canvas.id = id;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Cannot retrieve 2d context");
        }
        this.ctx = ctx;
        parent.appendChild(this.canvas);
    }

    /**
     * Gibt das Canvas element zurück.
     * 
     * Returns the canvas element.
     */
    get element() {
        return this.canvas;
    }

    /**
     * Setzt die Größe des Canvas. Beachte dass die Größe einens Canvas über
     * dessen width- und height-Attribute gesetzt werden muss. Die entsprechenden
     * Style-Attribute führen nur dazu, dass das Canvas skaliert wird.
     * 
     * Resizes the canvas. Note that the real size of a canvas needs to be 
     * set via its witdh and height. The same values in the style only scale
     * the canvas.
     */
    resize(width: number, height: number) {

        const oldFillStyle = this.ctx.fillStyle;
        const oldStrokeStyle = this.ctx.strokeStyle;

        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx.fillStyle = oldFillStyle;
        this.ctx.strokeStyle = oldStrokeStyle;
    }

    /**
     * Löscht den Inhalt.
     * 
     * Clears all content.
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Sets the color with which new shapes are drawn.
     * 
     * @par colorStyle color by means of an CSS string.
     */
    setColor(colorStyle: string) {
        this.ctx.fillStyle = colorStyle;
        this.ctx.strokeStyle = colorStyle;
    }

    /**
     * Zeichnet ein Rechteck innerhalb der gegebenen Koordinaten.
     * 
     * Draws a rectangle within given coordinates.
     */
    drawRect(start: Point, end: Point) {
        const left = Math.min(start.x, end.x) - this.canvas.offsetLeft;
        const top = Math.min(start.y, end.y) - this.canvas.offsetTop;
        const width = Math.abs(start.x - end.x);
        const height = Math.abs(start.y - end.y);
        this.ctx.fillRect(left, top, width, height);
    }
    
    /**
     * Zeichnet eine Ellipse innerhalb der gegebenen Koordinaten.
     * 
     * Draws an ellipses within given coordinates.
     */
    drawEllipse(start: Point, end: Point) {
        const left = Math.min(start.x, end.x) - this.canvas.offsetLeft;
        const top = Math.min(start.y, end.y) - this.canvas.offsetTop;
        const width = Math.abs(start.x - end.x);
        const height = Math.abs(start.y - end.y);

        this.ctx.beginPath();
        this.ctx.ellipse(left + width / 2, top + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
        this.ctx.fill();

    }

    /**
     * Zeichen eine Line vom start- zum end-Punkte.
     * 
     * Draws a line from start to end.
     */
    drawLine(start: Point, end: Point) {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x - this.canvas.offsetLeft, start.y - this.canvas.offsetTop);
        this.ctx.lineTo(end.x - this.canvas.offsetLeft, end.y - this.canvas.offsetTop);
        this.ctx.stroke();
    }

    /**
     * Startet die Zeichnung einer Polylinie oder eines gefüllten Polygons.
     * Weitere Linien der Polylinie bzhw. des Polygons müssen ünber
     * {@draw drawLineSegment} ergänzt werden und das Polygon schließlich mit
     * {@link fillPoly} gefüllt werden.
     * 
     * Starts the drawing of a polyline or polyfill at the given point.
     * Subsequent line segments are to be added via {@link drawLineSegment},
     * a polyfill must be filled via {@link fillPoly} eventually.
     */
    startPoly(point: Point) {
        this.ctx.beginPath();
        this.ctx.moveTo(point.x - this.canvas.offsetLeft, point.y - this.canvas.offsetTop);
    }

    /**
     * Zeichnet ein Liniensegment einer Polylinie oder eines Polygons.
     * Dies Polylinie bzw. das Polygon muss vorher mit {@link startPoly} gestartet 
     * worden sein.
     * 
     * Draws a new line segment of a polyline or polyfill. The polyline must 
     * have been started via {@link startPoly} before.
     */
    drawLineSegment(start: Point, end: Point) {
        if (start) {
            if (Math.abs(end.x - start.x) > 1 || Math.abs(end.y - start.y) > 1) {
                this.ctx.lineTo(end.x - this.canvas.offsetLeft, end.y - this.canvas.offsetTop);
                this.ctx.stroke();
            }
        }
    }

    /**
     * Füllt ein Polygon aus, dessen Liniensegmente vorher mittels {@link drawLineSegment}
     * gezeichnet worden sind.
     * 
     * Fills a polyfill, the line segments must have been drawn via
     * {@link drawLineSegment} before.
     */
    fillPoly() {
        this.ctx.fill();
    }


}
