import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { Body } from "../islands/Body.tsx";
import { DESCRIPTION, TITLE } from "../utils/constants.ts";

export default function MainPage(props: PageProps) {
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
      <Body />
    </>
  );
}
