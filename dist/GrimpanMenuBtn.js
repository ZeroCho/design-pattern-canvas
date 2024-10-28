class GrimpanMenuElementBuilder {
    btn;
    constructor() { }
    build() {
        return this.btn;
    }
}
class GrimpanMenuElement {
    menu;
    name;
    type;
    constructor(menu, name, type) {
        this.menu = menu;
        this.name = name;
        this.type = type;
    }
}
export class GrimpanMenuInput extends GrimpanMenuElement {
    onChange;
    value;
    constructor(menu, name, type, onChange, value) {
        super(menu, name, type);
        this.onChange = onChange;
        this.value = value;
    }
    draw() {
        const btn = document.createElement('input');
        btn.type = 'color';
        btn.title = this.name;
        btn.id = 'color-btn';
        if (this.onChange) {
            btn.addEventListener('change', this.onChange.bind(this));
        }
        this.menu.dom.append(btn);
    }
    static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanMenuInput(menu, name, type);
        }
        setOnChange(onChange) {
            this.btn.onChange = onChange;
            return this;
        }
        setValue(value) {
            this.btn.value = value;
            return this;
        }
    };
}
export class GrimpanMenuBtn extends GrimpanMenuElement {
    onClick;
    active;
    constructor(menu, name, type, onClick, active) {
        super(menu, name, type);
        this.active = active;
        this.onClick = onClick;
    }
    draw() {
        const btn = document.createElement('button');
        btn.textContent = this.name;
        btn.id = `${this.type}-btn`;
        if (this.onClick) {
            btn.addEventListener('click', this.onClick.bind(this));
        }
        this.menu.dom.append(btn);
    }
    static Builder = class GrimpanMenuBtnBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanMenuBtn(menu, name, type);
        }
        setOnClick(onClick) {
            this.btn.onClick = onClick;
            return this;
        }
        setActive(active) {
            this.btn.active = active;
            return this;
        }
    };
}
