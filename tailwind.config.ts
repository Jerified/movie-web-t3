import { type Config } from "tailwindcss";
// const withMT from '@material-tailwind/react/utils/withMT'

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: ""
  }
} satisfies Config;
