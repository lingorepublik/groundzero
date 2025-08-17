import tseslint from "typescript-eslint";
import rootConfig from "../../eslint.config.js";

export default tseslint.config([
  ...rootConfig,
  {
    files: ["**/*.{ts,tsx}"],
  },
]);
