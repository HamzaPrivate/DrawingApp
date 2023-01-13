/**
 * Angebotene Werkzeuge (Tools)
 * 
 * Provided tools.
 */
export type Tool = "rect" | "circle" | "line" | "polyline" | "polygon";

/**
 * Erzeugt ein DIV mit gegebener id und hängt dieses an das gegebene Parent-Element.
 * Innerhalb dises Divs (der Toolbar) sind einzelne Bilder, die die Werkzeuge darstellen.
 * 
 * Creates a new div with given id and appends it to the given parent element.
 * Inside this div for each tool an image is added.
 */
export class ToolBar {
    private divBar: HTMLDivElement;
    private selected: Element;

    /**
     * Erzeugt die HTML-Elemente und hängt die Toolbar in den DOM ein.
     * Initial ist das erste Tool, d.h. das Rechteck (rect) selektiert.
     * 
     * Creates the HTML elements and addsthe toolbar to the DOM.
     * Initially the first tool, i.e. the rectangle (rect), is selected.
     */
    constructor(parent: Element, id: string) {
        this.divBar = document.createElement("div");
        this.divBar.id = id;

        for (const tool of ["rect", "circle", "line", "polyline", "polygon"]) {
            const img = document.createElement("img");
            img.className = "tool";
            img.src = `img/${tool}.svg`;
            img.id = tool;
            this.divBar.appendChild(img);
        }
        this.selected = this.divBar.firstElementChild!;
        this.selected.className = "selectedTool";

        parent.appendChild(this.divBar);
    }

    /**
     * Gibt das DIV mit der Toolbar selbst zurück.
     * 
     * Returns the DIV with the toolbar itself.
     */
    get element() {
        return this.divBar;
    }

    /**
     * Wählt das gegebene Element in der Toolbar aus. Dieses Element muss natürlich
     * in der Toolbar enthalten sein (also vorher im Konstruktor erzeugt worden sein).
     * 
     * Selects the given element in the toolbar. This element must be a child of the
     * toolbar, i.e. it must have been created in the constructor.
     */
    select(toolElement: Element) {
        if (toolElement.parentElement != this.divBar) {
            throw Error("Kann kein Tool selektieren, das nicht im colorbar ist.");
        }
        this.selected.className = "tool";
        this.selected = toolElement;
        this.selected.className = "selectedTool";
    }

    /**
     * Gibt einen String mit dem Namen des selektierten Tools zurück.
     * 
     * Retuns a string with the name of the selected tool.
     */
    get tool(): Tool {
        return this.selected.id as Tool;
    }

}
