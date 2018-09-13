module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module"
  },
  parser: "babel-eslint",
  rules: {
    indent: ["warn", 4],
    quotes: ["error", "single"],
    semi: ["error", "always"]
  },
  globals: {
    $: true,
    xla: true,
    xlQuickLogin: true,
    getCookie: true,
    setCookie: true,
    haslogin: true,
    login: true,
    logout: true,
    msgExit: true,
  }
};
