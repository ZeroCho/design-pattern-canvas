import ChromeGrimpan from './ChromeGrimpan.js';
import IEGrimpan from './IEGrimpan.js';
function grimpanFactory(type) {
    if (type === 'ie') {
        return IEGrimpan.getInstance();
    }
    else if (type === 'chrome') {
        return ChromeGrimpan.getInstance();
    }
    else if (type === 'safari') {
        return SafariGrimpan.getInstance();
    }
    else {
        throw new Error('일치하는 type이 없습니다');
    }
}
function main() {
    grimpanFactory('ie');
    grimpanFactory('chrome');
    grimpanFactory('safari');
}
main();
