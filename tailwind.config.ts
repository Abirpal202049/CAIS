import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      primary: "var(--primary-color)",
      primaryLight: "var(--primary-light)",
      primaryDark: "var(--primary-dark)",
      primaryDarker: "var(--primary-darker)",
      primaryText: "var(--primary-color-text)",
      blue: "var(--blue)",
      green: "var(--green)",
      green100: "var(--green-100)",
      yellow: "var(--yellow)",
      cyan: "var(--cyan)",
      pink: "var(--pink)",
      indigo: "var(--indigo)",
      indigo100: "var(--indigo-100)",
      teal: "var(--teal)",
      orange: "var(--orange)",
      bluegray: "var(--bluegray)",
      purple: "var(--purple)",
      red: "var(--red)",
      red100: "var(--red-100)",
      surface: {
        0: "var(--surface-0)",
        50: "var(--surface-50)",
        100: "var(--surface-100)",
        200: "var(--surface-200)",
        300: "var(--surface-300)",
        400: "var(--surface-400)",
        500: "var(--surface-500)",
        600: "var(--surface-600)",
        700: "var(--surface-700)",
        800: "var(--surface-800)",
        900: "var(--surface-900)",
      },
    },
    fontFamily: {
      primary: "var(--font-family)",
    },
    borderRadius: {
      sm: "var(--border-radius-sm)",
      lg: "var(--border-radius-lg)",
      xl: "var(--border-radius-xl)",
      full: "var(--border-radius-full)",
    },
    extend: {
      textColor: {
        brand: "var(--primary-color)",
        primary: "var(--text-color)",
        secondary: "var(--text-color-secondary)",
        muted: "var(--text-color-muted)",
        error: "var(--text-color-error)",
        success: "var(--text-color-success)",
        warning: "var(--text-color-warning)",
        info: "var(--text-color-info)",
      },
      fontWeight: {
        bold: "var(--font-weight-bold)",
      },
      padding: {
        contentPadding: "var(--content-padding)",
      },
      spacing: {
        inlineSpacing: "var(--inline-spacing)",
      },
      borderWidth: {
        border: "var(--border)",
        borderLight: "var(--border-light)",
      },
      opacity: {
        disabled: "var(--disabled-opacity)",
      },
      backgroundColor: {
        maskBg: "var(--mask-bg)",
      },
      transitionDuration: {
        DEFAULT: "var(--transition-duration)",
      },
      boxShadow: {
        focusRing: "var(--focus-ring)",
      },
    },
  },
  plugins: [],
} satisfies Config;
