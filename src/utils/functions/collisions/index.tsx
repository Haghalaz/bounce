import { Graphics } from "pixi.js";
import Grid from "../../canvasObjects/grid";

export function collision(sprite1: Graphics, sprite2: Graphics): boolean {
  return sprite1.getBounds().intersects(sprite2.getBounds());
}

export function getCollisionSide(sprite1: Graphics, sprite2: Graphics): string | null {
  const dx = sprite1.x + sprite1.width / 2 - (sprite2.x + sprite2.width / 2);
  const dy = sprite1.y + sprite1.height / 2 - (sprite2.y + sprite2.height / 2);
  const width = (sprite1.width + sprite2.width) / 2;
  const height = (sprite1.height + sprite2.height) / 2;

  const crossWidth = width * dy;
  const crossHeight = height * dx;

  if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
    if (crossWidth > crossHeight) {
      return crossWidth > -crossHeight ? "bottom" : "left";
    } else {
      return crossWidth > -crossHeight ? "right" : "top";
    }
  }

  return null;
}

export function handleCollision(
  container: Grid,
  square: Graphics,
  circle: Graphics,
  squareIndex: number,
  color: number,
  velocityX: number,
  velocityY: number
) {
  const collisionResult = collision(square, circle);

  if (collisionResult) {
    if (square.tint !== color) {
      const side = getCollisionSide(square, circle);

      if (side == "left" || side == "right") velocityX = -velocityX;

      if (side == "top" || side == "bottom") velocityY = -velocityY;

      container.updateSquareColor(squareIndex, color);
    }
  }

  return [velocityX, velocityY];
}
