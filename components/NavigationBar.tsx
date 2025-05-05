import BrandGithub from "$tablericons/brand-github.tsx";
import BrandLinkedin from "$tablericons/brand-linkedin.tsx";
import BrandFacebook from "$tablericons/brand-facebook.tsx";
import BrandInstagram from "$tablericons/brand-instagram.tsx";
import BrandYoutube from "$tablericons/brand-youtube.tsx";
import { Button } from "./Button.tsx";

interface Item {
  name: string;
  href: string;
}

interface NavigationBarProps {
  active: string;
  class?: string;
  state: {
    lang: string;
  };
  setState: Function;
}

export default function NavigationBar(props: NavigationBarProps) {
  const brItems = [
    {
      name: "QueroCodar",
      href: "https://querocodar.com.br",
    },
  ];
  const enItems = [
    {
      name: "IWannaCode",
      href: "https://iwannacode.com",
    },
  ];
  const items = props.state.lang == "br" ? brItems : enItems;
  const propClass = props.class ?? "";
  return (
    <nav class={"flex " + propClass}>
      <ul class="flex justify-center items-center gap-4 mx-4 my-1 flex-wrap">
        {items.map((item) => (
          <li>
            <a
              href={item.href}
              className={`p-2 text-white hover:underline ${
                props.active == item.href ? "font-bold" : ""
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}

        <li className="flex items-center">
          <a
            href="http://www.linkedin.com/in/tiago-justino"
            className="hover:text-tiago-gray text-tiago-white inline-block"
          >
            <BrandLinkedin />
          </a>
        </li>
        <li className="flex items-center">
          <a
            href="https://github.com/tiagojustino"
            className="hover:text-tiago-gray text-tiago-white inline-block"
          >
            <BrandGithub />
          </a>
        </li>
        <li className="flex items-center">
          <a
            href="http://www.facebook.com/tiagovmjustino"
            className="hover:text-tiago-gray text-tiago-white inline-block"
          >
            <BrandFacebook />
          </a>
        </li>
        <li className="flex items-center">
          <a
            href="https://www.instagram.com/tiagovmjustino"
            className="hover:text-tiago-gray text-tiago-white inline-block"
          >
            <BrandInstagram />
          </a>
        </li>
        <li className="flex items-center">
          <a
            href="https://www.youtube.com/@TiagoJustinoVM"
            className="hover:text-tiago-gray text-tiago-white inline-block"
          >
            <BrandYoutube />
          </a>
        </li>
        <div className="max-w-screen-md mx-auto my-2 px(4 sm:6 md:8) space-y-12">
          <div className="md:flex items-center justify-end">
            <div className="flex text-center md:text-left justify-end">
              <Button
                disabled={props.state.lang == "br"}
                onClick={() => {
                  console.log("br");
                  props.setState({ lang: "br" });
                }}
              >
                <img
                  src="/br.png"
                  className="w-10 mx-1 my-1"
                  width={80}
                />
              </Button>
              <Button
                disabled={props.state.lang == "en"}
                onClick={() => {
                  console.log("en");
                  props.setState({ lang: "en" });
                }}
              >
                <img
                  src="/en.png"
                  className="w-10 mx-1 my-1"
                  width={80}
                />
              </Button>
            </div>
          </div>
        </div>
      </ul>
    </nav>
  );
}
