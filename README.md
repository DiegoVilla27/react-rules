# ReactRules

Rules to linters (React and TypeScript), prettier, husky and commitlint

- This project was generated with [Vite](https://vitejs.dev/guide/) version 5.2.11
- Creation command: `npm create vite@latest react-rules -- --template react-ts`
- Node - Version 20.12.2
- Npm - Version 10.5.0

## Development server

Run `npm run dev` for a dev server and navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Commits

Commit Structure Guidelines:

- `feat: Subject` (Introduces a new feature)
- `fix: Subject` (Resolves a bug or issue)
- `styles: Subject` (Updates styles such as SCSS, CSS, Stylus, Less, etc.)
- `docs: Subject` (Modifies documentation, including README and environment configurations)
- `test: Subject` (Adds or updates unit tests or end-to-end tests)
- `refactor: Subject` (Improves existing code without changing functionality)

> ¡IMPORTANT! _`Subject is sentence-case`_

## Please follow these steps:

### Husky

Install and Configure Husky (Git Hooks)

- `npm i -D husky`
- Script and Execute (One-time setup) -> `"prepare": "husky install"` (This command will create the _`.husky`_ folder in the root directory)
- Create a Git Hook for `commit-msg` to run a regular expression validator (CommitLint) before each commit:
  - Execute command (Old version): `npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'`
  - Execute command (New version): `echo "npx --no -- commitlint --edit \${1}" > .husky/commit-msg`
- Create a Git Hook for `pre-commit` to run lint-staged (Prettier and ESLint) and tests before each commit:
  - Script -> `"test:staged": "git diff --cached --diff-filter=d --name-only -- '*.test.tsx' | xargs -I {} npm run test --include={} --browsers=ChromeHeadless --watch=false"`
    - `git diff` Displays changes in files
    - `--cached` Shows only staged files
    - `--diff-filter=d` Ignores deleted files
    - `--name-only` Displays only file names
    - `'*.test.tsx'` Filters only files with .test.tsx extension
    - `|` Redirects output from the previous command to the next
    - `xargs` Takes a list of elements and passes them as arguments to another command
    - `-I {}` Saves the list of elements in {}
    - `ng test` Executes tests
    - `--include={}` Includes the saved list of elements for individual testing
    - `--browsers=ChromeHeadless` Runs tests in Chrome without the graphical interface
    - `--watch=false` Does not open the browser window
  - Execute command (Old version): `npx husky add .husky/pre-commit "npx lint-staged && git diff --cached --diff-filter=d --name-only -- '*.test.tsx' | xargs -I {} npm run test --include={} --browsers=ChromeHeadless --watch=false"`
  - Execute command (New version): `echo "npx lint-staged && git diff --cached --diff-filter=d --name-only -- '*.test.tsx' | xargs -I {} npm run test --include={} --browsers=ChromeHeadless --watch=false" > .husky/pre-commit`
- Create a Git Hook for `pre-push` to execute a specified command before each push:
  - Execute command (Old version): `npx husky add .husky/pre-push "#HERE ANYTHING COMMAND"`
  - Execute command (New version): `echo "#HERE ANYTHING COMMAND" > .husky/pre-push`

### Prettier

Install and Configure Prettier

- `npm i -D prettier`
- Script -> `"pretier": "prettier . --write"` (Exec prettier for all files).
- Create file _`.prettierrc.json`_

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": false,
  "quoteProps": "preserve",
  "jsxSingleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": true,
  "overrides": [
    {
      "files": ["*.js", "*.ts", "*.tsx", "*.jsx", "*.css", "*.scss"],
      "options": {
        "semi": true
      }
    }
  ]
}
```

- Create or update file _`.editorconfig`_

```json
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

### Lint, Lint-Staged and Commit Lint

Install and Configure Lint (Linter), Lint-Staged (Staged Commits Linter), and Commit Lint (Conventional Commits)

- `npm i -D lint-staged @commitlint/types @commitlint/cli @commitlint/config-conventional eslint-plugin-react@latest eslint-plugin-html`
- Create file _`.eslintrc.json`_
```json
{
  "root": true,
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime" // This line indicates that we are utilizing React 17 or higher and require its new rules
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true, // We enable JSX support
      "tsx": true // We enable JSX support
    }
  },
  "plugins": [
    "react-refresh",
    "@typescript-eslint",
    "react"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off", // These two rules disable the need to import React in components
    "react/jsx-uses-react": "off",
    "quotes": [ // Rule for using double quotes
      "error",
      "double",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "eqeqeq": [ // Rule for strict equality (=== or !==)
      "error",
      "smart"
    ],
    "no-console": [ // Rule to avoid using console statements
      "error"
    ],
    "no-else-return": [ // Rule to disallow else as a return
      "error",
      {
        "allowElseIf": true
      }
    ],
    "no-empty": [ // Rule to disallow empty blocks
      "error",
      {
        "allowEmptyCatch": false
      }
    ],
    "no-extra-semi": [ // Rule to disallow extra semicolons
      "error"
    ],
    "@typescript-eslint/no-extra-semi": [
      "error"
    ],
    "semi": [ // Rule to ensure there is a semicolon at the end
      "error",
      "always",
      {
        "omitLastInOneLineBlock": true,
        "omitLastInOneLineClassBody": true
      }
    ],
    "@typescript-eslint/semi": [
      "error",
      "always",
      {
        "omitLastInOneLineBlock": true,
        "omitLastInOneLineClassBody": true
      }
    ]
  }
}
```

- Create file _`.lintstagedrc`_

```json
{
  "**/*.{js,jsx,ts,tsx}": ["prettier --write", "eslint"]
}
```

- Script -> `"lint": "ng lint"` (Executes the linter)
- Script -> `"lint:fix": "ng lint --fix ."` (Fixes errors reported by the linter)
- Script -> `"lint:staged": "npx lint-staged"` (Executes the linter for files staged for commit)
- Create file _`commitlint.config.ts`_
```typescript
import type { UserConfig } from "@commitlint/types"
import { RuleConfigSeverity } from "@commitlint/types"

/** 
 * Docs https://commitlint.js.org/#/reference-rules
  Each rule has 3 properties:
  -> Level
  0: Disables the rule
  1: Enables the rule like a warning
  2: Enables the rule like a error
  -> Applicable
  "always": Enables the rule always
  "never": Disable the rule always
  -> Value
  string|boolean|number|array

  "name-rule": [Level, Applicable, Value]
*/

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [
      // Se encarga de validar el tipo
      RuleConfigSeverity.Error,
      "never"
    ],
    "type-enum": [
      // Se encarga de los tipos (Example: feat, fix, bug and others)
      RuleConfigSeverity.Error,
      "always",
      ["feat", "fix", "styles", "docs", "test", "refactor"]
    ],
    "type-case": [
      // Se encarga del case en el type
      RuleConfigSeverity.Error,
      "always",
      "lower-case"
    ],
    "scope-empty": [
      // Se encarga del scope (Example: feat(frontend), fix(web) and others)
      RuleConfigSeverity.Error,
      "always"
    ],
    "subject-empty": [
      // Se encarga de validar el subject
      RuleConfigSeverity.Error,
      "never"
    ],
    "subject-case": [
      // Se encarga del case en el subject
      RuleConfigSeverity.Error,
      "always",
      "sentence-case"
    ],
    "subject-min-length": [
      // Se encarga del tamaño minimo del subject
      RuleConfigSeverity.Error,
      "always",
      10
    ],
    "subject-max-length": [
      // Se encarga del tamaño máximo del subject
      RuleConfigSeverity.Error,
      "always",
      50
    ],
    "body-empty": [
      // Se encarga de validar el body
      RuleConfigSeverity.Error,
      "always"
    ],
    "footer-empty": [
      // Se encarga de validar el footer
      RuleConfigSeverity.Error,
      "always"
    ]
  }
}
module.exports = Configuration
```

### Jest

Jest to testing application

- `npm install --save-dev jest @types/jest jest-transform-stub @testing-library/react @testing-library/jest-dom @babel/preset-env @babel/preset-react react-test-renderer ts-jest jest-environment-jsdom @types/jest @babel/preset-typescript babel-plugin-transform-import-meta @babel/plugin-transform-runtime babel-plugin-transform-vite-meta-env`
- Script -> `"test": "jest --coverage"` (Executes all unit tests)
- Script -> `"test:one": "jest --coverage --collectCoverageFrom='your-url-relative-component-here' --watch your-url-relative-component-here"` (Executes a single unit test)
- Create file _`jest.config.cjs`_ and paste this:
```cjs
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: false,
        useESM: true,
        babelConfig: true,
        plugins: ["babel-plugin-transform-vite-meta-env"],
      }
    ],
  }
};
```
- Create file _`babel.config.cjs`_ and paste this:
```cjs
module.exports = function (api) {
  api.cache(true);
  const presets = [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ];
  return {
    presets,
    plugins: [
      "@babel/plugin-transform-runtime",
      "babel-plugin-transform-import-meta",
      "babel-plugin-transform-vite-meta-env",
    ],
  };
};
```

## Aliases

Configuration to import files

- Add in _`tsconfig.json`_:
```json
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"],
  "@components/*": ["src/components/*"],
  "@otherFolder/*": ["src/otherFolder/*"]
}
```

- Add in _`vite.config.ts`_
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@components': path.resolve(__dirname, './src/components'),
    '@otherFolder': path.resolve(__dirname, './src/otherFolder')
  }
}
```
- Add in _`jest.config.cjs`_
```
moduleNameMapper: {
  '^@components/(.*)$': '<rootDir>/src/components/$1',
  '^@otherFolder/(.*)$': '<rootDir>/src/otherFolder/$1'
}
```

## Errors or Tips

> To disable `@apply error scss` for _Tailwind CSS_ in VSCode, add the following script to your _.vscode > settings.json_: _`"scss.lint.unknownAtRules": "ignore"`_

> If Husky isn't working on MacOS, execute the command (within the root project): _`chmod ug+x .husky/*`_

> To view prettified console objects in testing, use the following syntax: `console.log(JSON.stringify(obj, undefined, 2));`

## Developer

> Developed By: **`Diego Villa`**. - Website: [https://www.cabuweb.com](https://www.cabuweb.com)