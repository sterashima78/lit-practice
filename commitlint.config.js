/* eslint-disable no-undef */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "lit-practice-token",
        "lit-practice-wc",
        "lit-practice-react",
        "lit-practice-vue3",
        "lit-practice-vue27",
        "lit-practice-vue26",
      ],
    ],
    "header-max-length": [2, "always", 150],
  },
};
