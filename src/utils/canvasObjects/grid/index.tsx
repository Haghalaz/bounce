import { Container } from "pixi.js";
import Square from "../square";

interface GridProps {
  numRows: number;
  numCols: number;
  squareSize: number;
  primaryColor: number;
  secondaryColor: number;
}

class Grid extends Container {
  private squareList: Square[] = [];

  constructor({ numRows, numCols, squareSize, primaryColor, secondaryColor }: GridProps) {
    super();

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const x = col * squareSize;
        const y = row * squareSize;

        const squareColor = col < numCols / 2 ? secondaryColor : primaryColor;
        const squareInstance = new Square(squareColor, squareSize);
        const square = squareInstance.getSquare();

        square.position.set(x, y);

        this.addChild(square);
        this.squareList.push(squareInstance);
      }
    }
  }

  updateSquareColor(index: number, color: number) {
    if (index !== -1) {
      this.squareList[index].updateColorSquare(color);
    }
  }
}

export default Grid;
