import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

const TITLE = "Tiago Justino - Software Developer";
const DESCRIPTION = "Tiago Justino - Software Developer";

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

      <div class="flex flex-col min-h-screen selection::bg-tiago-bg selection::text-tiago-white">
        <div class="bg-tiago-bg flex flex-col">
          <Header title="" active="/" />
        </div>
        <div class="flex-1">
          <Intro />
        </div>
        <Footer />
      </div>
    </>
  );
}

function Intro() {
  return (
      <section class="max-w-screen-md mx-auto my-16 px(4 sm:6 md:8) space-y-12">
        <div className="md:flex items-center">
          <div className="flex-1 text-center md:text-left">
            <h2 class="py-2 text(5xl sm:5xl lg:5xl gray-900) sm:tracking-tight sm:leading-[1.1]!">
              Hello,
              <br/> My name is <span class="font-extrabold">Tiago Justino</span>
              .
            </h2>

            <p class="mt-4 text(3xl sm:3xl lg:3xl gray-600)">
              I'm a software developer.
            </p>
          </div>

          <picture class="block mt-4 md:mt-0">
            <img
                src="/tiago-04.png"
                class="w-80 mx-auto"
                width={800}
                height={678}
                alt="letters T and J"
            />
          </picture>
        </div>
        <div className="md:flex items-center"><p>
          I am Tiago Justino, BS in Computer Science from <a
            class="text-blue-500 hover:text-blue-700 hover:underline"
             href="https://www.uece.br/cct/ciencias-da-computacao/">The
            State University of Ceará</a> and
          MS in Human Computer Interaction from <a
            class="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://www.rit.edu/study/human-computer-interaction-ms">The
          Rochester Institute of Technology</a>,
          co-founder of <a
            class="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://www.cubienergia.com/">CUBi
          Energia</a>,
          currently living in <a
            class="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://maps.app.goo.gl/LjkzcsHr8w6SV8nt9">Montreal QC, Canada.</a>
        </p>
        </div>
        <div className="md:flex items-center"><p>
          To know more about my professional experience please download my Résumé ( <a
            class="text-blue-500 hover:text-blue-700 hover:underline"
            href="/tiago-justino-resume-en-us.pdf">en-US</a> / <a
            class="text-blue-500 hover:text-blue-700 hover:underline"
            href="/tiago-justino-resume-pt-br.pdf">pt-BR</a> ).
        </p>
        </div>
      </section>
);
}

