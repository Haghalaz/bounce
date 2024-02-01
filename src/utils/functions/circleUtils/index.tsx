import { Application, Graphics, ICanvas } from "pixi.js";

export function updateCirclePosition(app: Application<ICanvas>, circle: Graphics, velocityX: number, velocityY: number) {
  circle.x += velocityX;
  circle.y += velocityY;

  if (circle.x <= 0 || circle.x + circle.width >= app.renderer.width - circle.width) velocityX = -velocityX;

  if (circle.y <= 0 || circle.y + circle.height >= app.renderer.height) velocityY = -velocityY;

  return [velocityX, velocityY];
}
