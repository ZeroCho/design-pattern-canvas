export class GrimpanHistory {
    grimpan;
    constructor(grimpan) {
        this.grimpan = grimpan;
    }
    static getInstance(grimpan) { }
}
export class IEGrimpanHistory extends GrimpanHistory {
    static instance;
    initialize() {
    }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new IEGrimpanHistory(grimpan);
        }
        return this.instance;
    }
}
export class ChromeGrimpanHistory extends GrimpanHistory {
    static instance;
    initialize() {
    }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanHistory(grimpan);
        }
        return this.instance;
    }
}
