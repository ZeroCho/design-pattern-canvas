export class MenuDrawVisitor {
}
export class ChromeMenuDrawVisitor extends MenuDrawVisitor {
    drawBtn(btn) {
        const btnElement = document.createElement('button');
        btnElement.textContent = btn.name;
        btnElement.id = `${btn.type}-btn`;
        if (btn.onClick) {
            btnElement.addEventListener('click', btn.onClick.bind(btn));
        }
        btn.menu.dom.append(btnElement);
        return btnElement;
    }
    drawInput(input) {
        const inputElement = document.createElement('input');
        inputElement.type = 'color';
        inputElement.title = input.name;
        inputElement.id = 'color-btn';
        if (input.onChange) {
            inputElement.addEventListener('change', input.onChange.bind(input));
        }
        input.menu.colorBtn = inputElement;
        input.menu.dom.append(inputElement);
        return inputElement;
    }
    drawSaveBtn(btn) {
        const btnElement = document.createElement('button');
        btnElement.textContent = btn.name;
        btnElement.id = `${btn.type}-btn`;
        if (btn.onClick) {
            btnElement.addEventListener('click', btn.onClick.bind(btn));
        }
        this.drawFilter(btn, '블러', btn.onClickBlur);
        this.drawFilter(btn, '흑백', btn.onClickGrayscale);
        this.drawFilter(btn, '반전', btn.onClickInvert);
        btn.menu.dom.append(btnElement);
        return btnElement;
    }
    drawFilter(btn, title, onChange) {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.title = title;
        input.addEventListener('change', onChange.bind(btn));
        btn.menu.dom.append(input);
    }
}
