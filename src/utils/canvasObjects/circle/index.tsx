import { Graphics, Container } from "pixi.js";

interface CircleProps {
  color: number;
  circleSize: number;
}

class Circle extends Container {
  private circle: Graphics;

  constructor({ color, circleSize }: CircleProps) {
    super();

    this.circle = new Graphics()
      .beginFill(color)
      .drawRoundedRect(0, 0, circleSize, circleSize, circleSize ** 10)
      .endFill();
    this.circle.tint = color;

    this.addChild(this.circle);
  }

  getCircle(): Graphics {
    return this.circle;
  }
}

export default Circle;
