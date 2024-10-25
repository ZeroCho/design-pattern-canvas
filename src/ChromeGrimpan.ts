import Grimpan from './AbstractGrimpan.js';

class ChromeGrimpan extends Grimpan {
  private static instance: ChromeGrimpan;

  override initialize() {}
  override initializeMenu() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('canvas'))
    }
    return this.instance;
  }
}

export default ChromeGrimpan;