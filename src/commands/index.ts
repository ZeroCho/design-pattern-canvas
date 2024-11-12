import {Grimpan} from "../Grimpan.js";
import { GrimpanHistory } from "../GrimpanHistory.js";

export class Invoker {
  constructor(private readonly command: { run(): void }) {

  }
  invoke() {
    this.command.run();
  }
}

export class Adapter {
  constructor(private readonly command: Command) {}
  run() {
    this.command.execute();
  }
}
// new Invoker(new Adapter(new BackCommand({} as any)));

export abstract class Command {
  abstract name: string;
  abstract execute(): void;
}

export const counter: { [key:string]: number } = {};

abstract class CommandDecorator {
  name: string;
  constructor(protected readonly command: Command) {
    this.name = this.command.name;
  }
  abstract execute(): void;
}
class ExecuteLogger extends CommandDecorator {
  override execute() {
    console.log(this.command.name + ' 명령을 실행합니다.');
    this.command.execute();
  }
  showLogger() {}
}
class ExecuteCounter extends CommandDecorator {
  override execute() {
    this.command.execute();
    if (counter[this.command.name]) {
      counter[this.command.name]++;
    } else {
      counter[this.command.name] = 1;
    }
  }
  additional() {}
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
new ExecuteCounter(new ExecuteLogger(new BackCommand({} as any)));
new ExecuteLogger(new ExecuteCounter(new BackCommand({} as any)));

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