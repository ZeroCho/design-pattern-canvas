import Grimpan from './AbstractGrimpan.js';
class ChromeGrimpan extends Grimpan {
    static instance;
    initialize() { }
    initializeMenu() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ChromeGrimpan(document.querySelector('canvas'));
        }
        return this.instance;
    }
}
export default ChromeGrimpan;
