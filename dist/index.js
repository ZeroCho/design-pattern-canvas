import { ChromeGrimpanFactory } from './GrimpanFactory.js';
function main() {
    const factory = ChromeGrimpanFactory;
    const grimpan = factory.createGrimpan();
    grimpan.initialize({
        menu: ['back', 'forward', 'color', 'pipette', 'pen', 'circle', 'rectangle', 'eraser', 'save'],
    });
}
main();
