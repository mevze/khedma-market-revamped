import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        hand: ["var(--jimmy-sans)"],
        satoshi: ["var(--satoshi)"],
        ranade: ["var(--ranade)"],
      },
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
          darker: "hsl(var(--border-darker))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        info: {
          50: "#eff6ff",
          100: "#dbe9fe",
          200: "#bedaff",
          300: "#91c3ff",
          400: "#539cfc",
          500: "#387ef9",
          600: "#225fee",
          700: "#1a4adb",
          800: "#1c3db1",
          900: "#1c378c",
          950: "#162455",
        },
        success: {
          50: "#f2fcf1",
          100: "#e3f8e0",
          200: "#c7f0c2",
          300: "#99e392",
          400: "#71d168",
          500: "#3fb235",
          600: "#2f9326",
          700: "#277421",
          800: "#235c1f",
          900: "#1e4c1b",
          950: "#0b290a",
        },
        warning: {
          50: "#fffbeb",
          100: "#fff5c6",
          200: "#ffe988",
          300: "#ffd74a",
          400: "#ffc116",
          500: "#f9a207",
          600: "#dd7a02",
          700: "#b75506",
          800: "#94410c",
          900: "#7a350d",
          950: "#461b02",
        },
        destructive: {
          100: "#FFE5D7",
          200: "#FFC4B0",
          300: "#FF9D88",
          400: "#FF786B",
          500: "#FF3A3A",
          600: "#DB2A39",
          700: "#B71D37",
          800: "#931234",
          900: "#7A0B31",
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          100: "#f7f7f7",
          200: "#ededed",
          300: "#dfdfdf",
          400: "#c8c8c8",
          500: "#a3a3a3",
          600: "#888888",
          700: "#7b7b7b",
          800: "#676767",
          900: "#545454",
          950: "#363636",
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          darker: "hsl(var(--muted-foreground-darker))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spinner-spin": {
          "0%": { transform: "rotate(0deg)" },
          to: { transform: "rotate(1turn)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spinner-ease-spin": "spinner-spin .8s ease-in-out infinite",
        "spinner-linear-spin": "spinner-spin .8s linear infinite",
      },
      boxShadow: {
        focus: "var(--focus-ring)",
        input: "var(--input-shadow)",
      },
      transitionTimingFunction: {
        ease: "ease",
      },
      transitionProperty: {
        input:
          "background-color, background, border-color, color, fill, stroke, opacity, box-shadow, transform",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
} satisfies Config;

export default config;
