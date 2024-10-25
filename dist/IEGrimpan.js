import Grimpan from './AbstractGrimpan.js';
class IEGrimpan extends Grimpan {
    static instance;
    initialize() { }
    initializeMenu() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new IEGrimpan(document.querySelector('canvas'));
        }
        return this.instance;
    }
}
export default IEGrimpan;
