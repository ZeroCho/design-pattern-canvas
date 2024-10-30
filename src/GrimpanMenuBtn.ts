import { BtnType, GrimpanMenu } from "./GrimpanMenu.js";

abstract class GrimpanMenuElementBuilder {
  btn!: GrimpanMenuElement;
  constructor() {}

  build() {
    return this.btn;
  }
}

abstract class GrimpanMenuElement {
  protected menu: GrimpanMenu;
  protected name: string;
  protected type: BtnType;

  protected constructor(menu: GrimpanMenu, name: string, type: BtnType) {
    this.menu = menu;
    this.name = name;
    this.type = type;
  }

  abstract draw(): void;
}

export class GrimpanMenuInput extends GrimpanMenuElement {
  private onChange?: (e: Event) => void;
  private value?: string | number;

  private constructor(menu: GrimpanMenu, name: string, type: BtnType, onChange?: () => void, value?: string | number) {
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
    this.menu.colorBtn = btn;
    this.menu.dom.append(btn);
  }

  static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuInput;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuInput(menu, name, type);
    }
  
    setOnChange(onChange: (e: Event) => void) {
      this.btn.onChange = onChange;
      return this;
    }

    setValue(value: string | number) {
      this.btn.value = value;
      return this;
    }
  }
}

export class GrimpanMenuBtn extends GrimpanMenuElement {
  private onClick?: () => void;
  private active?: boolean;

  private constructor(menu: GrimpanMenu, name: string, type: BtnType, onClick?: () => void, active?: boolean) {
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
    override btn: GrimpanMenuBtn;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuBtn(menu, name, type);
    }
  
    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }
   
    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }
  }
}