function GreetPt() {
  return (
    <div className="flex-1 text-center md:text-left">
      <h2 className="py-2 text(5xl sm:5xl lg:5xl gray-900) sm:tracking-tight sm:leading-[1.1]!">
        Olá,
        <br /> Meu nome é <span className="font-extrabold">Tiago Justino</span>
        .
      </h2>

      <p className="mt-4 text(3xl sm:3xl lg:3xl gray-600)">
        Sou desenvolvedor de software.
      </p>
    </div>
  );
}
function GreetEn() {
  return (
    <div className="flex-1 text-center md:text-left">
      <h2 className="py-2 text(5xl sm:5xl lg:5xl gray-900) sm:tracking-tight sm:leading-[1.1]!">
        Hello,
        <br /> My name is <span className="font-extrabold">Tiago Justino</span>
        .
      </h2>

      <p className="mt-4 text(3xl sm:3xl lg:3xl gray-600)">
        I'm a software developer.
      </p>
    </div>
  );
}

function TextPt() {
  return (
    <>
      <div className="md:flex items-center">
        <p>
          Sou Tiago Justino, desenvolvedor de software com quase 20 anos de
          experiência, bacharel em Ciências da Computação pela{" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://www.uece.br/cct/ciencias-da-computacao/"
          >
            Universidade Estadual do Ceará
          </a>{" "}
          e mestre em Interação Humano-Computador pelo{" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://www.rit.edu/study/human-computer-interaction-ms"
          >
            Rochester Institute of Technology
          </a>, co-fundador da{" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://www.cubienergia.com/"
          >
            CUBi Energia
          </a>, atualmente morando em{" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://maps.app.goo.gl/LjkzcsHr8w6SV8nt9"
          >
            Montreal QC, Canada.
          </a>
        </p>
      </div>
      <div className="md:flex items-center">
        <p>
          Para conhecer mais sobre minha experiência profissional acesse meu
          currículo ({" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="/tiago-justino-resume-en-us.pdf"
          >
            en-US
          </a>{" "}
          /{" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="/tiago-justino-resume-pt-br.pdf"
          >
            pt-BR
          </a>{" "}
          ).
        </p>
      </div>
    </>
  );
}

function TextEn() {
  return (
    <>
      <div className="md:flex items-center">
        <p>
          I am Tiago Justino, software developer with almost 20 years of
          experience, BS in Computer Science from{" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://www.uece.br/cct/ciencias-da-computacao/"
          >
            The State University of Ceará
          </a>{" "}
          and MS in Human Computer Interaction from{" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://www.rit.edu/study/human-computer-interaction-ms"
          >
            The Rochester Institute of Technology
          </a>, co-founder of{" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://www.cubienergia.com/"
          >
            CUBi Energia
          </a>, currently living in{" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://maps.app.goo.gl/LjkzcsHr8w6SV8nt9"
          >
            Montreal QC, Canada.
          </a>
        </p>
      </div>
      <div className="md:flex items-center">
        <p>
          To know more about my professional experience please download my
          Résumé ({" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="/tiago-justino-resume-en-us.pdf"
          >
            en-US
          </a>{" "}
          /{" "}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="/tiago-justino-resume-pt-br.pdf"
          >
            pt-BR
          </a>{" "}
          ).
        </p>
      </div>
    </>
  );
}

export function Intro(
  { state, setState }: { state: { lang: string }; setState: Function },
) {
  return (
    <>
      <section class="max-w-screen-md mx-auto my-2 px(4 sm:6 md:8) space-y-12">
        <div className="md:flex items-center">
          {state.lang == "en" ? GreetEn() : GreetPt()}
          <picture class="block mt-4 md:mt-0">
            <img
              src="/tiago.jpeg"
              class="w-80 mx-auto"
              width={800}
              height={678}
              alt="A picture of Tiago Justino"
            />
          </picture>
        </div>
        {state.lang == "en" ? TextEn() : TextPt()}
      </section>
    </>
  );
}
