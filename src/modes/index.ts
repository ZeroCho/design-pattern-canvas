import { CircleSelectCommand, Command, EraserSelectCommand, PenSelectCommand, PipetteSelectCommand, PremiumCommandProxy, RectangleSelectCommand, SaveHistoryCommand } from "../commands/index.js";
import { Grimpan } from "../Grimpan.js";

const convertToHex = (color: number) => {
  if (color < 0) {
    return 0;
  } else if (color > 255) {
    return 255;
  }
  const hex = color.toString(16);
  return `0${hex}`.slice(-2); // 05 -> 05, 0ab -> ab
}
const rgb2hex = (r: number, g: number, b: number) => {
  return `#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`;
}

export abstract class Mode {
  constructor(protected grimpan: Grimpan) {}
  abstract mousedown(e: MouseEvent): void;
  abstract mousemove(e: MouseEvent): void;
  abstract mouseup(e: MouseEvent): void;
  invoke(command: Command) {
    command.execute();
  }
}
export class PenMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new PenSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
    this.grimpan.ctx.lineWidth = 1;
    this.grimpan.ctx.lineCap = 'round';
    this.grimpan.ctx.strokeStyle = this.grimpan.color;
    this.grimpan.ctx.globalCompositeOperation = 'source-over';
    this.grimpan.ctx.beginPath()
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) {
      return;
    }
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mouseup(e: MouseEvent): void {
    if (this.grimpan.active) {
      // 히스토리 저장
      this.invoke(new SaveHistoryCommand(this.grimpan));
    }
    this.grimpan.active = false;
  }
}
export class EraserMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new EraserSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
    this.grimpan.ctx.lineWidth = 10;
    this.grimpan.ctx.lineCap = 'round';
    this.grimpan.ctx.strokeStyle = '#000';
    this.grimpan.ctx.globalCompositeOperation = 'destination-out';
    this.grimpan.ctx.beginPath()
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) {
      return;
    }
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mouseup(e: MouseEvent): void {
    if (this.grimpan.active) {
      // 히스토리 저장
      this.invoke(new SaveHistoryCommand(this.grimpan));
    }
    this.grimpan.active = false;
  }
}
export class PipetteMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new PipetteSelectCommand(grimpan));
  }

  override mousedown(): void {
    
  }
  override mousemove(e: MouseEvent): void {
    const { data } = this.grimpan.ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
    if (data[3] === 0) {
      this.grimpan.changeColor('#ffffff');
      
    } else {
      this.grimpan.changeColor(rgb2hex(data[0], data[1], data[2]));
    }
  }
  override mouseup(): void {
    this.grimpan.setMode('pen');
  }
}
export class RectangleMode extends Mode {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  imageData?: ImageData;

  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new PremiumCommandProxy(new RectangleSelectCommand(grimpan)));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    this.imageData = this.grimpan.ctx.getImageData(0, 0, 300, 300);
  }
  override mousemove(e: MouseEvent): void {
    this.endX = e.offsetX;
    this.endY = e.offsetY;
    // 캔버스 리셋
    if (this.imageData) {
      this.grimpan.ctx.putImageData(this.imageData, 0, 0);
    }
    this.grimpan.ctx.lineWidth = 1;
    this.grimpan.ctx.lineCap = 'round';
    this.grimpan.ctx.strokeStyle = this.grimpan.color;
    this.grimpan.ctx.globalCompositeOperation = 'source-over';
    const width = this.endX! - this.startX!;
    const height = this.endY! - this.startY!;
    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.rect(this.startX!, this.startY!, width, height)
    this.grimpan.ctx.stroke();
  }
  override mouseup(e: MouseEvent): void {
    if (this.grimpan.active) {
      this.grimpan.ctx.lineWidth = 1;
      this.grimpan.ctx.lineCap = 'round';
      this.grimpan.ctx.strokeStyle = this.grimpan.color;
      this.grimpan.ctx.globalCompositeOperation = 'source-over';
      const width = this.endX! - this.startX!;
      const height = this.endY! - this.startY!;
      this.grimpan.ctx.beginPath();
      this.grimpan.ctx.rect(this.startX!, this.startY!, width, height)
      this.grimpan.ctx.stroke();
      // 히스토리 저장
      this.invoke(new SaveHistoryCommand(this.grimpan));
      this.startX = undefined;
      this.startY = undefined;
      this.imageData = undefined;
    }
    this.grimpan.active = false;
  }
}
export class CircleMode extends Mode {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  imageData?: ImageData;

  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new PremiumCommandProxy(new CircleSelectCommand(grimpan)));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    this.imageData = this.grimpan.ctx.getImageData(0, 0, 300, 300);
  }
  override mousemove(e: MouseEvent): void {
    this.endX = e.offsetX;
    this.endY = e.offsetY;
    // 캔버스 리셋
    if (this.imageData) {
      this.grimpan.ctx.putImageData(this.imageData, 0, 0);
    }
    this.grimpan.ctx.lineWidth = 1;
    this.grimpan.ctx.lineCap = 'round';
    this.grimpan.ctx.strokeStyle = this.grimpan.color;
    this.grimpan.ctx.globalCompositeOperation = 'source-over';
    const width = this.endX! - this.startX!;
    const height = this.endY! - this.startY!;
    const radius = Math.hypot(width, height);
    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.arc(this.startX!, this.startY!, radius, 0, Math.PI * 2)
    this.grimpan.ctx.stroke();
  }
  override mouseup(e: MouseEvent): void {
    if (this.grimpan.active) {
      this.grimpan.ctx.lineWidth = 1;
      this.grimpan.ctx.lineCap = 'round';
      this.grimpan.ctx.strokeStyle = this.grimpan.color;
      this.grimpan.ctx.globalCompositeOperation = 'source-over';
      const width = this.endX! - this.startX!;
      const height = this.endY! - this.startY!;
      const radius = Math.hypot(width, height);
      this.grimpan.ctx.beginPath();
      this.grimpan.ctx.arc(this.startX!, this.startY!, radius, 0, Math.PI * 2)
      this.grimpan.ctx.stroke();
      // 히스토리 저장
      this.invoke(new SaveHistoryCommand(this.grimpan));
      this.startX = undefined;
      this.startY = undefined;
      this.imageData = undefined;
    }
    this.grimpan.active = false;
  }
}