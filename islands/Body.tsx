import Header from "../components/Header.tsx";
import { Intro } from "./Intro.tsx";
import Footer from "../components/Footer.tsx";
import { useState } from "preact/hooks";

export function Body() {
  const [state, setState] = useState({ lang: "en" });
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
      <div className="flex-1">
        <Intro state={state} setState={setState} />
      </div>
      <Footer />
    </div>
  );
}
