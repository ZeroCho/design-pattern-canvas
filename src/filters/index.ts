export abstract class Filter {
  next?: Filter;
  setNext(filter: Filter) {
    this.next = filter;
    return filter;
  }

  abstract handle(offscreenCanvas: OffscreenCanvas): Promise<void>;
}

export class DefaultFilter extends Filter {
  override async handle(offscreenCanvas: OffscreenCanvas) {
    if (this.next) {
      await this.next.handle(offscreenCanvas);
    }
  }
}
export class BlurFilter extends Filter {
  override async handle(offscreenCanvas: OffscreenCanvas) {
    return new Promise<void>((resolve, reject) => {
      const offscreenContext = offscreenCanvas.getContext('2d')!;
      offscreenContext.filter = 'blur(30px)';
      const image = new Image();
      offscreenCanvas.convertToBlob()
        .then((blob) => {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            const dataURL = reader.result as string;
            console.log('dataURL', dataURL);
            image.src = dataURL;
          });
          reader.readAsDataURL(blob);
        });
      image.addEventListener('load', async () => {
        offscreenContext.drawImage(image, 0, 0);
        if (this.next) {
          await this.next.handle(offscreenCanvas);
        }
        resolve();
      })
    });
  }
}
export class GrayscaleFilter extends Filter {
  override async handle(offscreenCanvas: OffscreenCanvas) {
    return new Promise<void>((resolve, reject) => {
      const offscreenContext = offscreenCanvas.getContext('2d')!;
      offscreenContext.filter = 'grayscale(1)';
      const image = new Image();
      offscreenCanvas.convertToBlob()
        .then((blob) => {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            const dataURL = reader.result as string;
            console.log('dataURL', dataURL);
            image.src = dataURL;
          });
          reader.readAsDataURL(blob);
        });
      image.addEventListener('load', async () => {
        offscreenContext.drawImage(image, 0, 0);
        if (this.next) {
          await this.next.handle(offscreenCanvas);
        }
        resolve();
      })
    });
  }
}
export class InvertFilter extends Filter {
  override async handle(offscreenCanvas: OffscreenCanvas) {
    return new Promise<void>((resolve, reject) => {
      const offscreenContext = offscreenCanvas.getContext('2d')!;
      offscreenContext.filter = 'invert(1)';
      const image = new Image();
      offscreenCanvas.convertToBlob()
        .then((blob) => {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            const dataURL = reader.result as string;
            console.log('dataURL', dataURL);
            image.src = dataURL;
          });
          reader.readAsDataURL(blob);
        });
      image.addEventListener('load', async () => {
        offscreenContext.drawImage(image, 0, 0);
        if (this.next) {
          await this.next.handle(offscreenCanvas);
        }
        resolve();
      })
    });
  }
}
