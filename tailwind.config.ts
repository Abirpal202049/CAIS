import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx,html}",
    "./src/components/**/*.{ts,tsx,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
