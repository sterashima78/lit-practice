module.exports = {
  source: ["src/**/*.json"],
  transform: {
    cssCompute: {
      type: "value",
      transitive: true,
      matcher: (token) => {
        return typeof token.value === "string" && token.value.includes("*");
      },
      transformer: (token) => `calc(${token.value})`,
    },
  },
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "libs/scss/",
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables",
      }],
      "options": {
        "outputReferences": true,
      },
    },
    "css": {
      "transformGroup": "css",
      "buildPath": "libs/css/",
      transforms: ["name/cti/kebab", "cssCompute"],
      "files": [
        {
          "format": "css/variables",
          "destination": "variables.css",
        },
      ],
      "options": {
        "outputReferences": true,
      },
    },
    "ts": {
      "transformGroup": "js",
      "buildPath": "libs/js/",
      "files": [
        {
          "format": "javascript/es6",
          "destination": "colors.js",
          "filter": {
            "attributes": {
              "category": "colors",
            },
          },
        },
        {
          "format": "typescript/es6-declarations",
          "destination": "colors.d.ts",
          "filter": {
            "attributes": {
              "category": "colors",
            },
          },
        },
      ],
      "options": {
        "outputReferences": true,
      },
    },
  },
};
