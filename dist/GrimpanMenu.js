import { GrimpanMenuBtn, GrimpanMenuInput } from "./GrimpanMenuBtn.js";
export class GrimpanMenu {
    grimpan;
    dom;
    constructor(grimpan, dom) {
        this.grimpan = grimpan;
        this.dom = dom;
    }
    static getInstance(grimpan, dom) { }
}
export class IEGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) {
    }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new IEGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
class Command {
}
class BackCommand extends Command {
    name = 'back';
    execute() {
        this.grimpan.history.goBack();
    }
}
class PenCommand extends Command {
    name = 'pen';
    execute() {
        // 펜 구현
    }
}
class EraserCommand extends Command {
    name = 'eraser';
    execute() {
        // 지우개 구현
    }
}
export class ChromeGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) {
        types.forEach(this.drawButtonByType.bind(this));
        document.addEventListener('keyup', this.onClickBack);
    }
    executeCommand(command) {
        // 비활성화 로직
        // if (비활성화) {
        //   return;
        // }
        command.execute();
    }
    onClickBack() {
        this.executeCommand(new BackCommand()); // { name: 'back' };
    }
    onClickPen() {
        const command = new PenCommand();
        this.executeCommand(command); // { name: 'pen' };
        this.grimpan.history.push(command);
    }
    onClickEraser() {
        this.executeCommand(new EraserCommand()); // { name: 'eraser' };
    }
    drawButtonByType(type) {
        switch (type) {
            case 'back': {
                const btn = new GrimpanMenuBtn.Builder(this, '뒤로')
                    .setOnClick(this.onClickBack)
                    .build();
                btn.draw();
                return btn;
            }
            case 'forward': {
                const btn = new GrimpanMenuBtn.Builder(this, '앞으로')
                    .setOnClick(() => {
                    // 앞으로가기 작업
                })
                    .build();
                btn.draw();
                return btn;
            }
            case 'color': {
                const btn = new GrimpanMenuInput.Builder(this, '컬러')
                    .setOnChange(() => {
                    // 컬러 변경 작업
                })
                    .build();
                btn.draw();
                return btn;
            }
            case 'pipette': {
                const btn = new GrimpanMenuBtn.Builder(this, '스포이드').build();
                btn.draw();
                return btn;
            }
            case 'eraser': {
                const btn = new GrimpanMenuBtn.Builder(this, '지우개')
                    .setOnClick(() => {
                    // 지우개 작업
                })
                    .build();
                btn.draw();
                return btn;
            }
            case 'pen': {
                const btn = new GrimpanMenuBtn.Builder(this, '펜')
                    .setOnClick(() => {
                    // 펜 긋기 작업
                })
                    .build();
                btn.draw();
                return btn;
            }
            case 'circle': {
                const btn = new GrimpanMenuBtn.Builder(this, '원')
                    .setOnClick(() => {
                    // 원 그리기 작업
                })
                    .build();
                btn.draw();
                return btn;
            }
            case 'rectangle': {
                const btn = new GrimpanMenuBtn.Builder(this, '사각형')
                    .setOnClick(() => {
                    // 사각형 그리기 작업
                })
                    .build();
                btn.draw();
                return btn;
            }
            case 'save': {
                const btn = new GrimpanMenuBtn.Builder(this, '저장').build();
                btn.draw();
                return btn;
            }
            default:
                throw new Error(`알 수 없는 타입 ${type}`);
        }
    }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
