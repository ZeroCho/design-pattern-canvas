import { ChromeGrimpanMenu, IEGrimpanMenu } from './GrimpanMenu.js'
import { ChromeGrimpanHistory, IEGrimpanHistory } from './GrimpanHistory.js'
import {Grimpan, ChromeGrimpan, IEGrimpan} from './Grimpan.js';

export abstract class AbstractGrimpanFactory {
  static createGrimpan() {
    throw new Error('하위 클래스에서 구현하셔야 합니다.');
  };
  static createGrimpanMenu(grimpan: Grimpan, dom: HTMLElement) {
    throw new Error('하위 클래스에서 구현하셔야 합니다.');
  };
  static createGrimpanHistory(grimpan: Grimpan) {
    throw new Error('하위 클래스에서 구현하셔야 합니다.');
  };
}

export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return ChromeGrimpan.getInstance()
  }
  static override createGrimpanMenu(grimpan: ChromeGrimpan, dom: HTMLElement) {
    return ChromeGrimpanMenu.getInstance(grimpan, dom);
  }
  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan)
  }
}

export class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance()
  }
  static override createGrimpanMenu(grimpan: IEGrimpan, dom: HTMLElement) {
    return IEGrimpanMenu.getInstance(grimpan, dom)
  }
  static override createGrimpanHistory(grimpan: IEGrimpan) {
    return IEGrimpanHistory.getInstance(grimpan)
  }
}
