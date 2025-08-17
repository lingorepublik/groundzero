import tseslint from "typescript-eslint";
import rootConfig from "../../eslint.config.js";
import path from "path";
import { fileURLToPath } from "url";
import { globalIgnores } from "eslint/config";
import { rules } from "eslint-plugin-react-refresh";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config([
  ...rootConfig,
  globalIgnores([".react-router/"]),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "react-refresh/only-export-components": "off",
      "no-empty-pattern": "off", // Allow empty destructuring patterns
    },
  },
]);
