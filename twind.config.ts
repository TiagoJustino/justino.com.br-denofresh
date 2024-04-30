import { defineConfig, Preset } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetAutoprefix from "@twind/preset-autoprefix";
import * as colors from "twind/colors";

export default {
  ...defineConfig({
    presets: [presetTailwind() as Preset, presetAutoprefix() as Preset],
    theme: {
      colors: {
        tiago: {
          text: "#3fcf8e",
          bg: "#222222",
          black: "#333!important",
          white: "#eee!important",
          gray: "#bbb!important",
          neon: "#39FF14",
          blue: colors.blue,
        },
        blue: colors.blue,
        black: colors.black,
        gray: colors.gray,
        green: colors.green,
        white: colors.white,
        yellow: colors.yellow,
        transparent: "transparent",
      },
    },
  }),
  selfURL: import.meta.url,
};
