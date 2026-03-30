import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import boundaries from 'eslint-plugin-boundaries'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      boundaries,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        { type: "app", pattern: "app" },
        { type: "pages", pattern: "src/pages/*", capture: ["page"] },
        { type: "widgets", pattern: "widgets/*", capture: ["widget"] },
        { type: "features", pattern: "features/*", capture: ["feature"] },
        { type: "entities", pattern: "entities/*", capture: ["entity"] },
        { type: "shared", pattern: "shared/*", capture: ["segment"] },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        2,
        {
          default: "allow",
          rules: [
            // --- 1. Layer hierarchy (formerly element-types) ---
            {
              from: { type: "shared" },
              disallow: [{ to: { type: ["app", "pages", "widgets", "features", "entities"] } }],
              message: "Shared module must not import upper layers ({{to.type}})",
            },
            {
              from: { type: "entities" },
              disallow: [{ to: { type: ["app", "pages", "widgets", "features"] } }],
              message: "Entity must not import upper layers ({{to.type}})",
            },
            {
              from: { type: "entities" },
              disallow: [{ to: { type: "entities", captured: { entity: "!{{from.captured.entity}}" } } }],
              message: "Entity must not import other entity",
            },
            {
              from: { type: "features" },
              disallow: [{ to: { type: ["app", "pages", "widgets"] } }],
              message: "Feature must not import upper layers ({{to.type}})",
            },
            {
              from: { type: "features" },
              disallow: [{ to: { type: "features", captured: { feature: "!{{from.captured.feature}}" } } }],
              message: "Feature must not import other feature",
            },
            {
              from: { type: "widgets" },
              disallow: [{ to: { type: ["app", "pages"] } }],
              message: "Widget must not import upper layers ({{to.type}})",
            },
            {
              from: { type: "widgets" },
              disallow: [{ to: { type: "widgets", captured: { widget: "!{{from.captured.widget}}" } } }],
              message: "Widget must not import other widget",
            },
            {
              from: { type: "pages" },
              disallow: [{ to: { type: "app" } }],
              message: "Page must not import upper layers ({{to.type}})",
            },
            {
              from: { type: "pages" },
              disallow: [{ to: { type: "pages", captured: { page: "!{{from.captured.page}}" } } }],
              message: "Page must not import other page",
            },

            // --- 2. Entry points (formerly entry-point) ---

            {
              to: {
                type: "shared",
                captured: { segment: "lib" },
                internalPath: "!{*.ts,*.tsx,*/index.ts}"
              },
              disallow: [{ from: { type: "*" } }],
              message: "Shared lib: only first-level files or second-level index files are allowed",
            },
            // Shared constants & api: strictly via index.ts
            {
              to: {
                type: "shared",
                captured: { segment: ["constants", "api"] },
                internalPath: "!index.ts"
              },
              disallow: [{ from: { type: "*" } }],
              message: "This module can only be imported via index.ts",
            },
            // Shared ui: allow everything
            {
              to: { type: "shared", captured: { segment: "ui" } },
              allow: [{ from: { type: "*" } }],
            },
            // All other layers (app, pages, etc.): strictly via root index element
            {
              to: {
                type: ["app", "pages", "widgets", "features", "entities"],
                internalPath: "!index.{ts,tsx}"
              },
              disallow: [{ from: { type: "*" } }],
              message: "Layers must be imported via index.(ts|tsx)",
            },
          ],
        },
      ],
      // Accessibility rules - most important ones
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/no-access-key": "error",
      "jsx-a11y/no-distracting-elements": "error",
      "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
      "jsx-a11y/no-noninteractive-element-interactions": "error",
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/tabindex-no-positive": "error",
    },
  },
])
