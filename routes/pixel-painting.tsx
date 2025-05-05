import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { DESCRIPTION, TITLE } from "../utils/constants.ts";
import PixelPainting from "../islands/PixelPainting.tsx";

export default function PixelPaintingPage(props: PageProps) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.url.href} />
      </Head>
      <PixelPainting />
    </>
  );
}
