// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from './routes/_404.tsx';
import * as $_app from './routes/_app.tsx';
import * as $boucing_ball from './routes/boucing-ball.tsx';
import * as $index from './routes/index.tsx';
import * as $overlap from './routes/overlap.tsx';
import * as $Body from './islands/Body.tsx';
import * as $BouncingBall from './islands/BouncingBall.tsx';
import * as $Canvas from './islands/Canvas.tsx';
import * as $Circle from './islands/Circle.tsx';
import * as $Intro from './islands/Intro.tsx';
import * as $Overlap from './islands/Overlap.tsx';
import type { Manifest } from '$fresh/server.ts';

const manifest = {
  routes: {
    './routes/_404.tsx': $_404,
    './routes/_app.tsx': $_app,
    './routes/boucing-ball.tsx': $boucing_ball,
    './routes/index.tsx': $index,
    './routes/overlap.tsx': $overlap,
  },
  islands: {
    './islands/Body.tsx': $Body,
    './islands/BouncingBall.tsx': $BouncingBall,
    './islands/Canvas.tsx': $Canvas,
    './islands/Circle.tsx': $Circle,
    './islands/Intro.tsx': $Intro,
    './islands/Overlap.tsx': $Overlap,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
