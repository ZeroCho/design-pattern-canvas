import Grimpan from './AbstractGrimpan.js';

class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan;

  override initialize() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('canvas'))
    }
    return this.instance;
  }
}

export default IEGrimpan;
