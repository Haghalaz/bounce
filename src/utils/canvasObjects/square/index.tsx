import { Graphics, Container } from "pixi.js";

class Square extends Container {
  private square: Graphics;
  private squareSize: number;

  constructor(color: number, squareSize: number) {
    super();

    this.squareSize = squareSize;
    this.square = new Graphics().beginFill(color).drawRect(0, 0, squareSize, squareSize).endFill();
    this.square.tint = color;

    this.addChild(this.square);
  }

  getSquare(): Graphics {
    return this.square;
  }

  updateColorSquare(color: number) {
    this.square.clear();
    this.square.beginFill(color).drawRect(0, 0, this.squareSize, this.squareSize).endFill();
    this.square.tint = color;
  }
}

export default Square;
