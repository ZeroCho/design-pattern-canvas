import { BackCommand, ForwardCommand } from "./commands/index.js";
import { ChromeGrimpanFactory, IEGrimpanFactory } from "./GrimpanFactory.js";
import { CircleMode, EraserMode, PenMode, PipetteMode, RectangleMode } from "./modes/index.js";
export class Grimpan {
    canvas;
    ctx;
    history;
    menu;
    mode;
    color;
    active;
    constructor(canvas, factory) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error('canvas 엘리먼트를 입력하세요');
        }
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.color = '#000';
        this.active = false;
    }
    setMode(mode) {
        console.log('mode change', mode);
        switch (mode) {
            case 'pen':
                this.mode = new PenMode(this);
                break;
            case 'eraser':
                this.mode = new EraserMode(this);
                break;
            case 'pipette':
                this.mode = new PipetteMode(this);
                break;
            case 'rectangle':
                this.mode = new RectangleMode(this);
                break;
            case 'circle':
                this.mode = new CircleMode(this);
                break;
        }
    }
    setColor(color) {
        this.color = color;
    }
    changeColor(color) {
        this.setColor(color);
        if (this.menu.colorBtn) {
            this.menu.colorBtn.value = color;
        }
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
        window.addEventListener('keyup', (e) => {
            console.log(e);
            if (e.code === 'KeyZ' && e.ctrlKey && e.shiftKey) {
                this.menu.executeCommand(new ForwardCommand(this.history));
                return;
            }
            if (e.code === 'KeyZ' && e.ctrlKey) {
                this.menu.executeCommand(new BackCommand(this.history));
                return;
            }
        });
        this.canvas.addEventListener('mousedown', this.onMousedown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMousemove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseup.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseup.bind(this));
    }
    onMousedown(e) {
        this.mode.mousedown(e);
    }
    onMousemove(e) {
        this.mode.mousemove(e);
    }
    onMouseup(e) {
        this.mode.mouseup(e);
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
    onMousedown(e) {
    }
    onMousemove(e) {
    }
    onMouseup(e) {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new IEGrimpan(document.querySelector('canvas'), IEGrimpanFactory);
        }
        return this.instance;
    }
}
