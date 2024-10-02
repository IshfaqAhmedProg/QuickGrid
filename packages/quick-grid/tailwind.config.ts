import type { Config } from "tailwindcss";
import sharedConfig from "@cubics/tailwind-config";

const config: Config = {
  content: ["./src/**/*.tsx"],
  prefix: "qk-",
  presets: [sharedConfig],
};

export default config;
