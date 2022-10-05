const expressJSDocSwagger = require("express-jsdoc-swagger");

const options = {
  info: {
    version: "1.0.0",
    title: "(Keep'Up) API",
    description: "Express api for keep'up app.",
    contact: {
      name: "Nathan Bardi, Jeffrey Mussard",
      email: "keepup.oclock@gmail.com",
    },
  },
  security: {
    BasicAuth: {
      type: "http",
      scheme: "basic",
    },
  },
  consumes: ["application/json"],
  produces: ["application/json"],
  baseDir: __dirname,

  filesPattern: [
    "../../router/*.js",
    "../helper/**/*.js",
    "../../data/*.js",
    "../../schema/*.js",
  ],

  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
  exposeApiDocs: true,
  apis: ["../../router/*.js"],
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns Express JSDoc Swagger middleware that create web documentation
 */
module.exports = (app) => expressJSDocSwagger(app)(options);
