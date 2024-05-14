export default function BlogTitle(props: { title: string, disabled: boolean }) {
  return props.disabled ? (
    <span class="text(2xl gray-900) block flex items-center">
      <div class="text-tiago-white font-bold text-2xl">{props.title}</div>
    </span>
  ) : (
    <a href="/" class="text(2xl gray-900) block flex items-center">
      <div class="text-tiago-white font-bold text-2xl hover:text-tiago-gray">{props.title}</div>
    </a>
  );
}
