module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    rules: {
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "semi": "off", // must disable base rule to enable typescript version
        "@typescript-eslint/semi": ["warn"],
        "no-unused-vars": "off", // must disable base rule to enable typescript version
        "@typescript-eslint/no-unused-vars": ["error", {
            "ignoreRestSiblings": true,
            "args": "after-used"
        }],
        "no-undef": "off", // ignores for js config files
        "no-multiple-empty-lines": [1, {
            "max": 1,
            "maxBOF": 0,
        }],
        "comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "never"
        }],
        "react/display-name": "off",
        "react/no-unescaped-entities": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "max-len": [ "warn", { "code": 140 }],
        "no-console": "error",
        "no-undef": "off",
        "ordered-imports": "off",
        "quotes": [ "warn", "double" ],
        "sort-keys": "off"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};