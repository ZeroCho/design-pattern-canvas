import {Grimpan, IEGrimpan, ChromeGrimpan} from "./Grimpan.js";
import { SubscriptionManager } from "./Observer.js";

class StackIterator {
  private index = 0;
  constructor(private readonly stack: HistoryStack) {}

  next() {
    if (!this.done) {
      return this.stack[this.index++];
    }
    // 없는 순간
  }

  get done() {
    return this.stack.length === this.index;
    // [0, 1, 2]
  }
}

interface Clonable {
  clone(): Clonable;
}
class HistoryStack extends Array implements Clonable {
  clone() {
    return this.slice() as HistoryStack;
  }
  override slice(start?: number, end?: number): HistoryStack {
    return super.slice(start, end) as HistoryStack;
  }
}

export abstract class GrimpanHistory {
  grimpan: Grimpan;
  stack: HistoryStack;
  index = -1;

  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
    this.stack = new HistoryStack();
    SubscriptionManager.getInstance().subscribe('saveComplete', {
      name: 'history',
      publish: this.afterSaveComplete.bind(this)
    });
  }

  // caretaker
  saveHistory() {
    const snapshot = this.grimpan.makeSnapshot();
    if (this.index === this.stack.length - 1) {
      this.stack.push(snapshot);
      this.index++;
    } else {
      // 뒤로가기를 몇 번 누른 상황
      this.stack = this.stack.slice(0, this.index + 1);
      this.stack.push(snapshot);
      this.index++;
    }
    (document.querySelector('#back-btn') as HTMLButtonElement).disabled = false;
    (document.querySelector('#forward-btn') as HTMLButtonElement).disabled = true;
    console.log('save', this.index, this.stack);
  }

  afterSaveComplete() {
    console.log('history: save complete');
  }

  cancelSaveCompleteAlarm() {
    SubscriptionManager.getInstance().unsubscribe('saveComplete', 'history');
  }

  undoable() {
    return this.index > 0;
  }

  redoable() {
    return this.index < this.stack.length - 1;
  }

  undo(): void {
    console.log('undo', this.index, this.stack);
    if (this.undoable()) { // [0]
      this.index--;
      (document.querySelector('#forward-btn') as HTMLButtonElement).disabled = false;
    } else {
      return;
    }
    if (!this.undoable()) {
      (document.querySelector('#back-btn') as HTMLButtonElement).disabled = true;
    }
    this.grimpan.restore(this.stack[this.index]);
  }

  redo(): void {
    console.log('redo', this.index, this.stack);
    if (this.redoable()) {
      this.index++;
      (document.querySelector('#back-btn') as HTMLButtonElement).disabled = false;
    } else {
      return;
    }
    if (!this.redoable()) {
      (document.querySelector('#forward-btn') as HTMLButtonElement).disabled = true;
    }
    this.grimpan.restore(this.stack[this.index]);
  }

  getStack() {
    return this.stack.clone();
  }

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
  }

  initialize() {
    (document.querySelector('#back-btn') as HTMLButtonElement).disabled = true;
    (document.querySelector('#forward-btn') as HTMLButtonElement).disabled = true;
  }

  static getInstance(grimpan: Grimpan) {}
}

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;

  static override getInstance(grimpan: IEGrimpan): IEGrimpanHistory {
    if (!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan)
    }
    return this.instance;
  }
}

export class ChromeGrimpanHistory extends GrimpanHistory {
  private static instance: ChromeGrimpanHistory;

  static override getInstance(grimpan: ChromeGrimpan): ChromeGrimpanHistory {
    if (!this.instance) {
      this.instance = new ChromeGrimpanHistory(grimpan)
    }
    return this.instance;
  }
}
