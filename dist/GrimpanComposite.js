"use strict";
class Character {
    att = 10;
    equipment = [];
    getAtt() {
        const childrenAtt = this.equipment.reduce((a, c) => a + c.getAtt(), 0);
        return this.att + childrenAtt;
    }
    equip(item) {
        this.equipment.push(item);
    }
}
class Sword {
    att = 50;
    equipment = [];
    getAtt() {
        const childrenAtt = this.equipment.reduce((a, c) => a + c.getAtt(), 0);
        return this.att + childrenAtt;
    }
    equip(item) {
        this.equipment.push(item);
    }
}
class Jewel {
    att = 5;
    getAtt() {
        return this.att;
    }
}
class Jewel2 {
    att = 3;
    getAtt() {
        return this.att;
    }
}
const sword = new Sword();
sword.equip(new Jewel());
sword.equip(new Jewel2());
const character = new Character();
character.equip(sword);
// 총 공격력은 몇이냐?
character.getAtt(); // 68
class Circle {
    x;
    y;
    width;
    height;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    getBoundingRect() {
        return [this.x, this.y, this.width, this.height];
    }
}
class Rectangle {
    x;
    y;
    width;
    height;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    getBoundingRect() {
        return [this.x, this.y, this.width, this.height];
    }
}
class ShapeGroup {
    shapes = [];
    add(shape) {
        this.shapes.push(shape);
    }
    getBoundingRect() {
        let x = 0;
        let y = 0;
        let width = 0;
        let height = 0;
        this.shapes.forEach((shape) => {
            const [sx, sy, sw, sh] = shape.getBoundingRect();
            if (sx < x) {
                x = sx;
            }
            if (sy < y) {
                y = sy;
            }
            if (sw > width) {
                width = sw;
            }
            if (sh > height) {
                height = sh;
            }
        });
        return [x, y, width, height];
    }
}
const c1 = new Circle(0, 0, 50, 50);
const c2 = new Circle(25, 25, 75, 75);
const circleGroup = new ShapeGroup();
circleGroup.add(c1);
circleGroup.add(c2);
const circleWithRectangleGroup = new ShapeGroup();
circleWithRectangleGroup.add(circleGroup);
circleWithRectangleGroup.add(new Rectangle(0, 0, 100, 25));
circleWithRectangleGroup.getBoundingRect(); // ?
// GrimpanMenu
// SubMenu1   SubMenu2       Btn Btn Btn
// Btn Btn    Btn Btn Btn
