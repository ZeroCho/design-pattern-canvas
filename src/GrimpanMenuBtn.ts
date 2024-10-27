import { GrimpanMenu } from "./GrimpanMenu.js";

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

  protected constructor(menu: GrimpanMenu, name: string) {
    this.menu = menu;
    this.name = name;
  }

  abstract draw(): void;
}

export class GrimpanMenuInput extends GrimpanMenuElement {
  private onChange?: () => void;
  private value?: string | number;

  private constructor(menu: GrimpanMenu, name: string, onChange?: () => void, value?: string | number) {
    super(menu, name);
    this.onChange = onChange;
    this.value = value;
  }

  draw() {
    const btn = document.createElement('input');
    btn.type = 'color';
    btn.title = this.name;
    if (this.onChange) {
      btn.addEventListener('change', this.onChange.bind(this));
    }
    this.menu.dom.append(btn);
  }

  static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuInput;
    constructor(menu: GrimpanMenu, name: string) {
      super();
      this.btn = new GrimpanMenuInput(menu, name);
    }
  
    setOnChange(onChange: () => void) {
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

  private constructor(menu: GrimpanMenu, name: string, onClick?: () => void, active?: boolean) {
    super(menu, name);
    this.active = active;
    this.onClick = onClick;
  }

  draw() {
    const btn = document.createElement('button');
    btn.textContent = this.name;
    if (this.onClick) {
      btn.addEventListener('click', this.onClick.bind(this));
    }
    this.menu.dom.append(btn);
  }

  static Builder = class GrimpanMenuBtnBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuBtn;
    constructor(menu: GrimpanMenu, name: string) {
      super();
      this.btn = new GrimpanMenuBtn(menu, name);
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