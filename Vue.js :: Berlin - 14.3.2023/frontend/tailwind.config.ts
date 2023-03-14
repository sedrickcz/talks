import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  plugins: [require("daisyui")],
  content: [
    "./layouts/**/*.{html,js,ts,vue}",
    "./pages/**/*.{html,js,ts,vue}",
    "./components/**/*.{html,js,ts,vue}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["synthwave"],
  },
};
