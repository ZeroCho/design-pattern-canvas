export class Invoker {
    command;
    constructor(command) {
        this.command = command;
    }
    invoke() {
        this.command.run();
    }
}
export class Adapter {
    command;
    constructor(command) {
        this.command = command;
    }
    run() {
        this.command.execute();
    }
}
// new Invoker(new Adapter(new BackCommand({} as any)));
export class Command {
}
export const counter = {};
class CommandDecorator {
    command;
    name;
    constructor(command) {
        this.command = command;
        this.name = this.command.name;
    }
}
class ExecuteLogger extends CommandDecorator {
    execute() {
        console.log(this.command.name + ' 명령을 실행합니다.');
        this.command.execute();
    }
    showLogger() { }
}
class ExecuteCounter extends CommandDecorator {
    execute() {
        this.command.execute();
        if (counter[this.command.name]) {
            counter[this.command.name]++;
        }
        else {
            counter[this.command.name] = 1;
        }
    }
    additional() { }
}
export class BackCommand extends Command {
    history;
    name = 'back';
    constructor(history) {
        super();
        this.history = history;
    }
    execute() {
        this.history.undo(); // receiver에게 로직 전송
    }
}
new ExecuteCounter(new ExecuteLogger(new BackCommand({})));
new ExecuteLogger(new ExecuteCounter(new BackCommand({})));
export class ForwardCommand extends Command {
    history;
    name = 'forward';
    constructor(history) {
        super();
        this.history = history;
    }
    execute() {
        this.history.redo(); // receiver에게 로직 전송
    }
}
export class PenSelectCommand extends Command {
    grimpan;
    name = 'penSelect';
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        // 펜 구현
        this.grimpan.menu.setActiveBtn('pen');
    }
}
export class SaveHistoryCommand extends Command {
    grimpan;
    name = 'saveHistory';
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        // 그리기 끝난 후 현재 상태 저장
        this.grimpan.history.saveHistory();
    }
}
export class EraserSelectCommand extends Command {
    grimpan;
    name = 'eraserSelect';
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        // 지우개 구현
        this.grimpan.menu.setActiveBtn('eraser');
    }
}
export class CircleSelectCommand extends Command {
    grimpan;
    name = 'circleSelect';
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.menu.setActiveBtn('circle');
    }
}
export class RectangleSelectCommand extends Command {
    grimpan;
    name = 'rectangleSelect';
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.menu.setActiveBtn('rectangle');
    }
}
export class PipetteSelectCommand extends Command {
    grimpan;
    name = 'pipetteSelect';
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.menu.setActiveBtn('pipette');
    }
}
export class SaveCommand extends Command {
    grimpan;
    name = 'save';
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.saveStrategy();
    }
}
