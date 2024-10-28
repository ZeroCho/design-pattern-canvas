import { ChromeGrimpanFactory, IEGrimpanFactory } from "./GrimpanFactory.js";
export class Grimpan {
    canvas;
    ctx;
    history;
    menu;
    mode;
    constructor(canvas, factory) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error('canvas 엘리먼트를 입력하세요');
        }
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    setMode(mode) {
        console.log('mode change', mode);
        this.mode = mode;
    }
    static getInstance() { }
}
export class ChromeGrimpan extends Grimpan {
    static instance;
    menu;
    history;
    constructor(canvas, factory) {
        super(canvas, factory);
        this.menu = factory.createGrimpanMenu(this, document.querySelector('#menu'));
        this.history = factory.createGrimpanHistory(this);
    }
    initialize(option) {
        this.menu.initialize(option.menu);
        this.history.initialize();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ChromeGrimpan(document.querySelector('canvas'), ChromeGrimpanFactory);
        }
        return this.instance;
    }
}
export class IEGrimpan extends Grimpan {
    static instance;
    initialize() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new IEGrimpan(document.querySelector('canvas'), IEGrimpanFactory);
        }
        return this.instance;
    }
}
