import Grimpan from './AbstractGrimpan.js';
import { ChromeGrimpanFactory } from "./GrimpanFactory.js";
class ChromeGrimpan extends Grimpan {
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
export default ChromeGrimpan;
