import { useEffect, useRef } from 'preact/hooks';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { useState } from 'preact/hooks';

export interface IDrawer {
  loop?: (ctx: CanvasRenderingContext2D) => Promise<void>;
  setup?: (ctx: CanvasRenderingContext2D) => Promise<void>;
}

interface CanvasProps {
  drawer?: IDrawer;
}

export default function Canvas({ drawer }: CanvasProps) {
  const canvasRef = useRef(null);

  const [state, setState] = useState({ lang: 'en' });

  async function innerLoop() {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    if (drawer?.loop) {
      await drawer.loop(ctx);
    }

    requestAnimationFrame(innerLoop);
  }

  async function innerSetup() {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    if (drawer?.setup) {
      await drawer.setup(ctx);
    }

    requestAnimationFrame(innerLoop);
  }

  useEffect(() => {
    innerSetup();
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
      <div id='canvasContainer' className='flex-1'>
        <canvas ref={canvasRef} className='bg-gray-300 size-full'></canvas>
      </div>
      <Footer />
    </div>
  );
}
