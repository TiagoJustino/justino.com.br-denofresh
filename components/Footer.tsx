import { ComponentChildren } from 'preact';
import BrandGithub from '$tablericons/brand-github.tsx';
type Props = {
  children?: ComponentChildren;
};

export default function Footer({ children }: Props) {
  const menus = [
    {
      title: 'Find me online',
      children: [
        { name: 'LinkedIn', href: 'http://www.linkedin.com/in/tiago-justino' },
        { name: 'GitHub', href: 'https://github.com/tiagojustino' },
        { name: 'Facebook', href: 'http://www.facebook.com/tiagovmjustino' },
        { name: 'Instagram', href: 'https://www.instagram.com/tiagovmjustino' },
        { name: 'YouTube', href: 'https://www.youtube.com/@TiagoJustinoVM' },
      ],
    },
    /*
    {
      title: 'Sitemap',
      children: [
        { name: 'Showcase', href: '/showcase' },
        { name: 'Blog', href: '/blog/introduction' },
      ],
    },
       */
  ];

  return (
    <footer class='border(t-2 gray-200) bg-gray-100 flex flex-col gap-4 justify-center'>
      <div class='flex flex-col md:flex-row w-full max-w-screen-lg gap-8 md:gap-16 px-8 py-8 text-sm'>
        <div class='flex-1'>
          <div class='flex items-center gap-1'>
            <img src='/favicon.ico' class='inline-block' />
            <div class='font-bold text-2xl'>Tiago Justino</div>
          </div>
          <div class='text-gray-500'>@tiagojustino</div>
        </div>

        {menus.map((item) => (
          <div class='mb-4' key={item.title}>
            <div class='font-bold'>{item.title}</div>
            <ul class='mt-2'>
              {item.children.map((child) => (
                <li class='mt-2' key={child.name}>
                  <a
                    class='text-gray-500 hover:text-gray-700'
                    href={child.href}
                  >
                    {child.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div class='text-gray-500 space-y-2'>
          <a href='https://fresh.deno.dev'>
            <img
              width='197'
              height='37'
              src='https://fresh.deno.dev/fresh-badge.svg'
              alt='Made with Fresh'
            />
          </a>

          <a
            href='https://github.com/TiagoJustino/querocodar'
            class='inline-block hover:text-black'
          >
            <BrandGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
