import { ChromeGrimpanFactory } from './GrimpanFactory.js';

function main() {
  const factory = ChromeGrimpanFactory;
  const grimpan = factory.createGrimpan();
  const grimpanMenu = factory.createGrimpanMenu(grimpan);
  const grimpanHistory = factory.createGrimpanHistory(grimpan);
  grimpan.initialize();
  grimpanMenu.initialize();
  grimpanHistory.initialize();
}

main();
