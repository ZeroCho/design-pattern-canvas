import { GrimpanMenuBtn, GrimpanMenuInput } from "./GrimpanMenuBtn.js";
export class GrimpanMenu {
    grimpan;
    dom;
    constructor(grimpan, dom) {
        this.grimpan = grimpan;
        this.dom = dom;
    }
    static getInstance(grimpan, dom) { }
}
export class IEGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) {
    }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new IEGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
export class ChromeGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) {
        types.forEach(this.drawButtonByType.bind(this));
    }
    drawButtonByType(type) {
        switch (type) {
            case 'back': {
                const btn = new GrimpanMenuBtn.Builder(this, '뒤로').build();
                btn.draw();
                return btn;
            }
            case 'forward': {
                const btn = new GrimpanMenuBtn.Builder(this, '앞으로').build();
                btn.draw();
                return btn;
            }
            case 'color': {
                const btn = new GrimpanMenuInput.Builder(this, '컬러').build();
                btn.draw();
                return btn;
            }
            case 'pipette': {
                const btn = new GrimpanMenuBtn.Builder(this, '스포이드').build();
                btn.draw();
                return btn;
            }
            case 'eraser': {
                const btn = new GrimpanMenuBtn.Builder(this, '지우개').build();
                btn.draw();
                return btn;
            }
            case 'pen': {
                const btn = new GrimpanMenuBtn.Builder(this, '펜').build();
                btn.draw();
                return btn;
            }
            case 'circle': {
                const btn = new GrimpanMenuBtn.Builder(this, '원').build();
                btn.draw();
                return btn;
            }
            case 'rectangle': {
                const btn = new GrimpanMenuBtn.Builder(this, '사각형').build();
                btn.draw();
                return btn;
            }
            case 'save': {
                const btn = new GrimpanMenuBtn.Builder(this, '저장').build();
                btn.draw();
                return btn;
            }
            default:
                throw new Error(`알 수 없는 타입 ${type}`);
        }
    }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
