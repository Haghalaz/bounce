import { Application, Ticker } from "pixi.js";
import { createRef, useEffect, useState } from "react";

import { updateCirclePosition } from "./utils/functions/circleUtils";
import { handleCollision } from "./utils/functions/collisions";

import { LuWaves } from "react-icons/lu";
import { TbBounceRight } from "react-icons/tb";
import { WiSandstorm } from "react-icons/wi";
import Circle from "./utils/canvasObjects/circle";
import Grid from "./utils/canvasObjects/grid";
import { useWindowResize } from "./utils/hooks/useWindowResize";

const primaryColor = 0x39bfbf;
const secondaryColor = 0xffd0a4;

const initialVelocity = 15;
const initialPosition = 100;

const squareSize = 24;
const circleSize = 24;

let primaryVelocityX, primaryVelocityY, secondaryVelocityX, secondaryVelocityY;

function App() {
  const pixiContainer = createRef();
  const [sand, setSand] = useState(0);
  const [sea, setSea] = useState(0);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!pixiContainer.current) return;

    const app = new Application({ width: pixiContainer.current.clientWidth, height: pixiContainer.current.clientHeight, backgroundColor: 0x3d3940 });

    pixiContainer.current.appendChild(app.view);

    const numRows = pixiContainer.current.clientHeight / squareSize;
    const numCols = pixiContainer.current.clientWidth / squareSize;

    const gridContainer = new Grid({ numRows, numCols, squareSize, primaryColor, secondaryColor });

    const circlePrimaryInstance = new Circle({ color: primaryColor, circleSize });
    const circlePrimary = circlePrimaryInstance.getCircle();
    circlePrimary.x = initialPosition;
    circlePrimary.y = initialPosition;

    primaryVelocityX = primaryVelocityY = initialVelocity;

    const circleSecondaryInstance = new Circle({ color: secondaryColor, circleSize });
    const circleSecondary = circleSecondaryInstance.getCircle();
    circleSecondary.x = pixiContainer.current.clientWidth - initialPosition;
    circleSecondary.y = initialPosition;

    secondaryVelocityX = secondaryVelocityY = initialVelocity;

    const ticker = new Ticker();
    ticker.maxFPS = 120;

    ticker.add(() => {
      let sandCounter = 0;
      let seaCounter = 0;

      [primaryVelocityX, primaryVelocityY] = updateCirclePosition(app, circlePrimary, primaryVelocityX, primaryVelocityY);
      [secondaryVelocityX, secondaryVelocityY] = updateCirclePosition(app, circleSecondary, secondaryVelocityX, secondaryVelocityY);

      gridContainer.children.forEach((gridSquare) => {
        const squareGraphics = gridSquare;
        const squareIndex = gridContainer.getChildIndex(squareGraphics);

        if (squareGraphics.tint == secondaryColor) {
          sandCounter++;
        } else seaCounter++;

        [primaryVelocityX, primaryVelocityY] = handleCollision(
          gridContainer,
          squareGraphics,
          circlePrimary,
          squareIndex,
          secondaryColor,
          primaryVelocityX,
          primaryVelocityY
        );

        [secondaryVelocityX, secondaryVelocityY] = handleCollision(
          gridContainer,
          squareGraphics,
          circleSecondary,
          squareIndex,
          primaryColor,
          secondaryVelocityX,
          secondaryVelocityY
        );
      });

      setSand(sandCounter);
      setSea(seaCounter);
    });

    ticker.start();
    app.stage.addChild(gridContainer, circlePrimary, circleSecondary);
    setReload(false);

    return () => {
      ticker.stop();
      app.destroy(true);
    };
  }, [reload]);

  useWindowResize(() => setReload(true));

  //window.addEventListener("resize", () => setReload(true));

  return (
    <div className="grid h-screen w-screen place-items-center overflow-hidden bg-[#3D3940] py-16 transition-all">
      <div className="flex items-center justify-center gap-4">
        <TbBounceRight className="h-12 w-12 stroke-white" />
        <h2 className=" text-5xl font-bold tracking-widest text-white" onClick={() => setReload(true)}>
          BOUNCE
        </h2>
      </div>
      <div className="h-[30rem] w-[22rem] overflow-hidden rounded-lg bg-[#3D3940] md:h-[22rem] md:w-[40rem] lg:h-[30rem] lg:w-[60rem]" ref={pixiContainer} />
      <div className="grid w-96 grid-flow-col grid-cols-2 gap-12">
        <div className={`flex items-center justify-center gap-1  ${sand > sea && "opacity-50"}`}>
          <LuWaves className="h-4 w-4 stroke-white" />
          <p className="text-md  text-[#39bfbf]">The Sea {String(sea).padStart(3, "0")}</p>
        </div>
        <div className={`flex items-center justify-center gap-1 ${sea > sand && "opacity-50"}`}>
          <WiSandstorm className="h-6 w-6 fill-white" />
          <p className="text-md  text-[#ffd0a4]">The Sand {String(sand).padStart(3, "0")}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
