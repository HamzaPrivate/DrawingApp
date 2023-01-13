/**
 * Farbauswahlpalette.
 */
export class ColorBar {

    private div: HTMLDivElement;
    private divSelected: HTMLDivElement;

    /**
     * Erzeugt ein DIV mit gegebener id und hängt dieses an das gegebene Parent-Element.
     * Innerhalb dises Divs (der ColorBar) sind einzelne Divs, deren
     * Background-Color die Farben darstellen.
     * Initial wird die erste Farbe (schwarz) ausgewählt.
     * 
     * Creates a new div with given id and appends it to the given parent element.
     * Inside this div for each color a div (with corresponding background color)
     * is added.
     * Initially the first color (black) is selected.
     */
    constructor(parent: Element, id: string) {
        this.div = document.createElement("div");
        this.div.id = id;
        for (let r = 0; r <= 255; r += 255 / 5) {
            for (let g = 0; g <= 255; g += 255 / 5) {
                for (let b = 0; b <= 255; b += 255 / 5) {
                    const divColor = document.createElement("div");
                    divColor.className = (r + g + b == 0) ? "selectedColor" : "color";
                    divColor.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    this.div.appendChild(divColor);

                }
            }
        }
        this.divSelected = this.div.firstElementChild as HTMLDivElement;
        parent.appendChild(this.div);
    }

    /**
     * Gibt das DIV mit der ColorBar selbst zurück.
     * 
     * Returns the DIV with the ColorBar itself.
     */
    get element() {
        return this.div;
    }

    /**
    * Wählt das gegebene Element in der Colorbar aus. Dieses Element muss natürlich
    * in der Colorbar enthalten sein (also vorher im Konstruktor erzeugt worden sein).
    * 
    * Selects the given element in the Colorbar. This element must be a child of the
    * Colorbar, i.e. it must have been created in the constructor.
    */
    select(divColor: HTMLDivElement) {
        if (divColor.parentElement != this.div) {
            throw Error("Kann keine Farbe selektieren, die nicht im colorbar ist.");
        }
        this.divSelected.className = "color";
        this.divSelected = divColor;
        divColor.className = "selectedColor";
    }

    /**
     * Gibt den selektierten Farbwert als CSS-String zurück.
     * 
     * Returns the selected color by means of an CSS string.
     */
    get color() {
        return this.divSelected.style.backgroundColor;
    }

}
