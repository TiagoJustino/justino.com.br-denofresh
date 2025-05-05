import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { DESCRIPTION, TITLE } from "../utils/constants.ts";
import AnimatedImage from "../islands/AnimatedImage.tsx";

export default function AnimatedImagePage(props: PageProps) {
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
      <AnimatedImage />
    </>
  );
}
