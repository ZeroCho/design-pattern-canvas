export class GrimpanMenu {
    grimpan;
    constructor(grimpan) {
        this.grimpan = grimpan;
    }
    static getInstance(grimpan) { }
}
export class IEGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize() {
    }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new IEGrimpanMenu(grimpan);
        }
        return this.instance;
    }
}
export class ChromeGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize() {
    }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan);
        }
        return this.instance;
    }
}
