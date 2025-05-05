import { useEffect, useRef } from "preact/hooks";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { useState } from "preact/hooks";

export interface IDrawer {
  loop?: (ctx: CanvasRenderingContext2D) => Promise<void>;
  setup?: (ctx: CanvasRenderingContext2D) => Promise<void>;
}

interface CanvasProps {
  drawer?: IDrawer;
  children?: Element;
}

export default function Canvas(props: CanvasProps) {
  const canvasRef = useRef(null);
  let ctx: CanvasRenderingContext2D | null = null;
  let canvas: HTMLCanvasElement | null = null;

  const [state, setState] = useState({ lang: "en" });

  async function innerLoop() {
    if (!canvas || !ctx) {
      return;
    }

    if (
      canvas.width != canvas.parentElement.offsetWidth ||
      canvas.height != canvas.parentElement.offsetHeight
    ) {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    if (props.drawer?.loop) {
      await props.drawer.loop(ctx);
    }

    requestAnimationFrame(innerLoop);
  }

  async function innerSetup() {
    if (!canvasRef.current) {
      return;
    }
    canvas = canvasRef.current as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    if (props.drawer?.setup) {
      await props.drawer.setup(ctx);
    }

    requestAnimationFrame(innerLoop);
  }

  useEffect(() => {
    innerSetup();
  }, []);

  return (
    <div className="flex flex-col min-h-screen selection::bg-tiago-bg selection::text-tiago-white">
      <div className="bg-tiago-bg flex flex-col">
        <Header
          title="Tiago Justino"
          active="/"
          state={state}
          setState={setState}
        />
      </div>
      {!!props.children
        ? (
          <div id="div1" className="flex-1 flex flex-row size-full">
            <div id="canvasContainer" className="flex-1 w-2/3">
              <canvas ref={canvasRef} className="bg-gray-300 size-full">
              </canvas>
            </div>
            <div className="w-1/3">
              {props.children}
            </div>
          </div>
        )
        : (
          <div id="canvasContainer" className="flex-1">
            <canvas ref={canvasRef} className="bg-gray-300 size-full"></canvas>
          </div>
        )}
      <Footer />
    </div>
  );
}
