export default class IEGrimpan {
  private static instance: IEGrimpan;
  private constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('canvas 엘리먼트를 입력하세요');
    }
  }

  initialize() {}
  initializeMenu() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('canvas'))
    }
    return this.instance;
  }
}