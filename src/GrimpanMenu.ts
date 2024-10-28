import { Grimpan, GrimpanMode, IEGrimpan, ChromeGrimpan } from "./Grimpan.js";
import { GrimpanMenuBtn, GrimpanMenuInput } from "./GrimpanMenuBtn.js";
import { BackCommand, CircleSelectCommand, Command, EraserSelectCommand, PenSelectCommand, PipetteSelectCommand, RectangleSelectCommand } from "./commands/index.js";

export abstract class GrimpanMenu {
  grimpan: Grimpan;
  dom: HTMLElement;

  protected constructor(grimpan: Grimpan, dom: HTMLElement) {
    this.grimpan = grimpan;
    this.dom = dom;
  }

  setActiveBtn(type: GrimpanMode) {
    document.querySelector('.active')?.classList.remove('active');
    document.querySelector(`#${type}-btn`)?.classList.add('active');
    this.grimpan.setMode(type);
  }

  abstract initialize(types: BtnType[]): void

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}

export class IEGrimpanMenu extends GrimpanMenu {
  private static instance: IEGrimpanMenu;
  initialize(types: BtnType[]): void {
    
  }

  static override getInstance(grimpan: IEGrimpan, dom: HTMLElement): IEGrimpanMenu {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan, dom)
    }
    return this.instance;
  }
}

export type BtnType = 'pen' | 'circle' | 'rectangle' | 'eraser' | 'back' | 'forward' | 'save' | 'pipette' | 'color';
export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu;
  override initialize(types: BtnType[]): void {
    types.forEach(this.drawButtonByType.bind(this));
    this.setActiveBtn('pen');
  }

  executeCommand(command: Command) {
    // 비활성화 로직
    // if (비활성화) {
    //   return;
    // }
    // Invoker가 명령을 실행
    command.execute();
  }

  onClickBack() {
    this.executeCommand(new BackCommand(this.grimpan.history)); // { name: 'back' };
  }

  onClickPen() {
    const command = new PenSelectCommand(this.grimpan);
    this.executeCommand(command); // { name: 'pen' };
    this.grimpan.history.stack.push(command);
  }

  onClickEraser() {
    this.executeCommand(new EraserSelectCommand(this.grimpan)); // { name: 'eraser' };
  }

  onClickCircle() {
    this.executeCommand(new CircleSelectCommand(this.grimpan)); // { name: 'eraser' };
  }

  onClickRectangle() {
    this.executeCommand(new RectangleSelectCommand(this.grimpan)); // { name: 'eraser' };
  }

  onClickPipette() {
    this.executeCommand(new PipetteSelectCommand(this.grimpan)); // { name: 'eraser' };
  }

  drawButtonByType(type: BtnType) {
    switch (type) {
      case 'back': {
        const btn = new GrimpanMenuBtn.Builder(this, '뒤로', type)
          .setOnClick(this.onClickBack.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case 'forward': {
        const btn = new GrimpanMenuBtn.Builder(this, '앞으로', type)
          .setOnClick(() => {
            // 앞으로가기 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case 'color': {
        const btn = new GrimpanMenuInput.Builder(this, '컬러', type)
          .setOnChange(() => {
            // 컬러 변경 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case 'pipette': {
        const btn = new GrimpanMenuBtn.Builder(this, '스포이드', type)
        .setOnClick(this.onClickPipette.bind(this))
        .build();
        btn.draw();
        return btn;
      }
      case 'eraser': {
        const btn = new GrimpanMenuBtn.Builder(this, '지우개', type)
        .setOnClick(this.onClickEraser.bind(this))
        .build();
        btn.draw();
        return btn;
      }
      case 'pen': {
        const btn = new GrimpanMenuBtn.Builder(this, '펜', type)
          .setOnClick(this.onClickPen.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case 'circle': {
        const btn = new GrimpanMenuBtn.Builder(this, '원', type)
          .setOnClick(this.onClickCircle.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case 'rectangle': {
        const btn = new GrimpanMenuBtn.Builder(this, '사각형', type)
          .setOnClick(this.onClickRectangle.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case 'save': {
        const btn = new GrimpanMenuBtn.Builder(this, '저장', type).build();
        btn.draw();
        return btn;
      }
      default:
        throw new Error(`알 수 없는 타입 ${type}`);
    }
  }
  static override getInstance(grimpan: ChromeGrimpan, dom: HTMLElement): ChromeGrimpanMenu {
    if (!this.instance) {
      this.instance = new ChromeGrimpanMenu(grimpan, dom)
    }
    return this.instance;
  }
}