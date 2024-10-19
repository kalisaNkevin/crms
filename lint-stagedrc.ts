// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const buildEslintCommand = (filenames: any) =>
  `npm run format --fix --file ${filenames.map((f: any) => path.relative(process.cwd(), f)).join(" --file ")}`;

module.exports = {
  "*.{js,jsx}": [buildEslintCommand],
};
