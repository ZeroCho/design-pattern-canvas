import { ChromeGrimpanFactory } from './GrimpanFactory.js';

function main() {
  const factory = ChromeGrimpanFactory;
  const grimpan = factory.createGrimpan();
  const grimpanMenu = factory.createGrimpanMenu(grimpan, document.querySelector('#menu')!);
  const grimpanHistory = factory.createGrimpanHistory(grimpan);
  grimpan.initialize();
  grimpanMenu.initialize(
    ['back', 'forward', 'color', 'pipette', 'pen', 'circle', 'rectangle', 'eraser', 'save']
  );
  grimpanHistory.initialize();
}

main();
