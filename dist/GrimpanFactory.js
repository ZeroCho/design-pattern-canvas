import ChromeGrimpan from './ChromeGrimpan.js';
import IEGrimpan from './IEGrimpan.js';
import { ChromeGrimpanMenu, IEGrimpanMenu } from './GrimpanMenu.js';
import { ChromeGrimpanHistory, IEGrimpanHistory } from './GrimpanHistory.js';
export class AbstractGrimpanFactory {
    static createGrimpan() {
        throw new Error('하위 클래스에서 구현하셔야 합니다.');
    }
    ;
    static createGrimpanMenu(grimpan) {
        throw new Error('하위 클래스에서 구현하셔야 합니다.');
    }
    ;
    static createGrimpanHistory(grimpan) {
        throw new Error('하위 클래스에서 구현하셔야 합니다.');
    }
    ;
}
export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return ChromeGrimpan.getInstance();
    }
    static createGrimpanMenu(grimpan) {
        return ChromeGrimpanMenu.getInstance(grimpan);
    }
    static createGrimpanHistory(grimpan) {
        return ChromeGrimpanHistory.getInstance(grimpan);
    }
}
export class IEGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return IEGrimpan.getInstance();
    }
    static createGrimpanMenu(grimpan) {
        return IEGrimpanMenu.getInstance(grimpan);
    }
    static createGrimpanHistory(grimpan) {
        return IEGrimpanHistory.getInstance(grimpan);
    }
}
