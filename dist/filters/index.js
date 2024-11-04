export class Filter {
    next;
    setNext(filter) {
        this.next = filter;
        return filter;
    }
}
export class DefaultFilter extends Filter {
    async handle(offscreenCanvas) {
        if (this.next) {
            await this.next.handle(offscreenCanvas);
        }
    }
}
export class BlurFilter extends Filter {
    async handle(offscreenCanvas) {
        return new Promise((resolve, reject) => {
            const offscreenContext = offscreenCanvas.getContext('2d');
            offscreenContext.filter = 'blur(30px)';
            const image = new Image();
            offscreenCanvas.convertToBlob()
                .then((blob) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    const dataURL = reader.result;
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
            });
        });
    }
}
export class GrayscaleFilter extends Filter {
    async handle(offscreenCanvas) {
        return new Promise((resolve, reject) => {
            const offscreenContext = offscreenCanvas.getContext('2d');
            offscreenContext.filter = 'grayscale(1)';
            const image = new Image();
            offscreenCanvas.convertToBlob()
                .then((blob) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    const dataURL = reader.result;
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
            });
        });
    }
}
export class InvertFilter extends Filter {
    async handle(offscreenCanvas) {
        return new Promise((resolve, reject) => {
            const offscreenContext = offscreenCanvas.getContext('2d');
            offscreenContext.filter = 'invert(1)';
            const image = new Image();
            offscreenCanvas.convertToBlob()
                .then((blob) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    const dataURL = reader.result;
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
            });
        });
    }
}
