const {nextui} = require("@nextui-org/react");
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js",
  "./src/components/ProfileDropdown",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
