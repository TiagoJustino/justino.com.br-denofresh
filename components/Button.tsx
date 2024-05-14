import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={'transition-colors' + (props.disabled ? ' grayscale' : ' hover:bg-gray-200 hover:cursor-poiner')}
    />
  );
}
