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
        

        // Registrierung der Event-Listener
        this.registerEventListener();
    }

    /**
     * Meldet diverse EventListener an.
     */
    registerEventListener() {
        // Ergänzen Sie hier die Anmeldung der Event-Listener
    }

    /**
     * Passt die Größe der Canvas-Elemente der {@link DrawingBoard}s an.
     */
    adjustBoardSize() {
        this.board.resize(window.innerWidth - 170, window.innerHeight - 70);
    }

    /* Ergänzen Sie hier Ihre eigenen Methoden */

}
