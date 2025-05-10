import { useEffect, useRef, useState } from 'preact/hooks';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

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
  const animationFrameId = useRef<number | null>(null);
  const drawerRef = useRef(props.drawer);

  useEffect(() => {
    drawerRef.current = props.drawer;
  }, [props.drawer]);

  let ctx: CanvasRenderingContext2D | null = null;
  let canvas: HTMLCanvasElement | null = null;

  const [state, setState] = useState({ lang: 'en' });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;

    async function setup() {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
      if (drawerRef.current?.setup) {
        await drawerRef.current.setup(ctx);
      }
    }

    async function loop() {
      if (!isMounted || !ctx || !canvas.parentElement) return;

      if (
        canvas.width != canvas.parentElement.offsetWidth ||
        canvas.height != canvas.parentElement.offsetHeight
      ) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        if (drawerRef.current?.setup) {
          await drawerRef.current.setup(ctx);
        }
      }

      if (drawerRef.current?.loop) {
        await drawerRef.current.loop(ctx);
      }
      animationFrameId.current = requestAnimationFrame(loop);
    }

    setup().then(() => {
      if (isMounted) {
        animationFrameId.current = requestAnimationFrame(loop);
      }
    });

    return () => {
      isMounted = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className='flex flex-col min-h-screen selection::bg-tiago-bg selection::text-tiago-white'>
      <div className='bg-tiago-bg flex flex-col'>
        <Header
          title='Tiago Justino'
          active='/'
          state={state}
          setState={setState}
        />
      </div>
      {!!props.children
        ? (
          <div id='div1' className='flex-1 flex flex-row size-full'>
            <div id='canvasContainer' className='flex-1 w-2/3'>
              <canvas ref={canvasRef} className='bg-gray-300 size-full'>
              </canvas>
            </div>
            <div className='w-1/3'>
              {props.children}
            </div>
          </div>
        )
        : (
          <div id='canvasContainer' className='flex-1'>
            <canvas ref={canvasRef} className='bg-gray-300 size-full'></canvas>
          </div>
        )}
      <Footer />
    </div>
  );
}
