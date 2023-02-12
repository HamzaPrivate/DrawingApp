import { ColorBar } from "./ColorBar.js";
import { Point, DrawingBoard } from "./DrawingBoard.js";
import { ToolBar } from "./ToolBar.js";

/**
 * Controller eines einfachen Zeichenprogramms.
 *
 * Die Werkzeuge werden über eine {@link ToolBar} ausgewählt 
 * und die Farbe über eine {@link ColorBar}. 
 * 
 * Die eigentliche Zeichnung wird mit einem {@link DrawingBoard} erstellt.
 * Ebenfalls über ein {@link DrawingBoard} wird das Feedback angezeigt, also
 * die Figur während sie noch gezeichnet wird.
 * 
 * Controller of a simpel drawing program.
 * The tool is selected with a {@link ToolBar} and the color with a {@link ColorBar}.
 * The drawing itself is done via a {@link DrawingBoard}. The same class is used
 * for providing feedback while the shape is drawn.
 */
export class Controller {

    board: DrawingBoard;
    colorbar: ColorBar;
    toolbar: ToolBar;
    startpoint: Point;

    /**
     * Erstellt die {@link ToolBar}, die {@link ColorBar} sowie die beiden
     * {@link DrawingBoard}s für die eigentliche Zeichnung und das Feedback.
     */
    constructor() {
        const main = document.getElementById("main");
        if (!main) {
            throw new Error("Main div nicht gefunden.");
        }

        // Ergänzen Sie hier die Erzeugung der Komponenten
        this.toolbar = new ToolBar(main, "toolbar");
        this.colorbar = new ColorBar(main, "colorbar");
        this.board = new DrawingBoard(main, "board");
        this.startpoint = undefined!;
        this.adjustBoardSize();

        // Registrierung der Event-Listener
        this.registerEventListener();
    }

    /**
     * Meldet diverse EventListener an.
     */
    registerEventListener() {
        // Ergänzen Sie hier die Anmeldung der Event-Listener
        window.addEventListener('resize', () => this.adjustBoardSize());
        const toolbar = this.toolbar.element;
        toolbar.addEventListener('click', (e) => this.changeTool(e));
        const colorbar = this.colorbar.element;
        colorbar.addEventListener('click', (e) => this.changeColor(e));

        const board = this.board.element;
            board.addEventListener('click', (e) => {
                if(!this.startpoint){
                    let p = {
                        x: e.x,
                        y: e.y
                    };
                    this.startpoint = p;
                }
                else
                this.draw(e)
            });
        }
    

    

    /**
     * Passt die Größe der Canvas-Elemente der {@link DrawingBoard}s an.
     */
    adjustBoardSize() {
        this.board.resize(window.innerWidth - 170, window.innerHeight - 70);
    }

    /* Ergänzen Sie hier Ihre eigenen Methoden */
    changeColor(ev: Event){
        const target = ev.target as HTMLDivElement;
        this.colorbar.select(target);
    }
    changeTool(ev: Event){
        const target = ev.target as HTMLElement;
        this.toolbar.select(target);
    }

    draw(ev: MouseEvent){
        if(!this.toolbar.tool || !this.colorbar.color){
            throw new Error("Tool oder Color nicht ausgewählt");
        }
        if(!this.startpoint){
            throw new Error("Es wurde kein Startpunkt gesetzt.");
        }
        let end = {
            x: ev.x,
            y: ev.y
        };
        this.board.setColor(this.colorbar.color);
        switch (this.toolbar.tool) {
            case "rect": this.board.drawRect(this.startpoint, end); break;
            
            default: break;
        }
        this.startpoint = undefined!;
    }

}
