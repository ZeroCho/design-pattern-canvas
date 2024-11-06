import {Grimpan} from "../Grimpan.js";
import { GrimpanHistory } from "../GrimpanHistory.js";

export abstract class Command {
  abstract execute(): void;
}

export class BackCommand extends Command {
  name = 'back';

  constructor(private history: GrimpanHistory) {
    super();
  }

  override execute(): void {
    this.history.undo(); // receiver에게 로직 전송
  }
}
export class ForwardCommand extends Command {
  name = 'forward';

  constructor(private history: GrimpanHistory) {
    super();
  }

  override execute(): void {
    this.history.redo(); // receiver에게 로직 전송
  }
}
export class PenSelectCommand extends Command {
  name = 'penSelect';

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    // 펜 구현
    this.grimpan.menu.setActiveBtn('pen');
  }
}
export class SaveHistoryCommand extends Command {
  name = 'saveHistory';

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    // 그리기 끝난 후 현재 상태 저장
    this.grimpan.history.saveHistory();
  }
}
export class EraserSelectCommand extends Command {
  name = 'eraserSelect';

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    // 지우개 구현
    this.grimpan.menu.setActiveBtn('eraser');
  }
}

export class CircleSelectCommand extends Command {
  name = 'circleSelect';

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn('circle');
  }
}

export class RectangleSelectCommand extends Command {
  name = 'rectangleSelect';

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn('rectangle');
  }
}

export class PipetteSelectCommand extends Command {
  name = 'pipetteSelect';

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn('pipette');
  }
}

export class SaveCommand extends Command {
  name = 'save';

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.saveStrategy();
  }
}