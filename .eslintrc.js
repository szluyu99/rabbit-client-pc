module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": import.meta.env.DEV ? "warn": "off",
        "no-debugger": import.meta.env.DEV ? "warn": "off",
    },
};
