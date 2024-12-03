/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        'timeline': "url('./src/assets/Timeline/waves.gif')", 
      },
      colors: {
        "dark-navy": "#000e23",
        "deep-teal": "#213951",
        "forest-green": "#3a6667",
        gold: "#f9a825",
        jade: "#497d67",
        golden: "#cc9900",
        aqua: "#00c3b5",
        "misty-blue": "#b6c1d3",
        cream: "#f6e5af",
        "light-navy-blue": "#0077C2",
        lightblue: "#59a5f5",
        "bright-blue": "#00BFFF",
        "dark-navy-blue": "#00619a",
        "bright-green": "#86efac",
        "dark-green": "#19725d",
        "light-green": "#c6ffe6",
        "bright-yellow": "#f5be0b",
        "light-yellow": "#fef1c7",
        "bright-orange": "#FF6600",
        "light-orange": "#ff983f",
        border: "hsl(var(--border))",
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
