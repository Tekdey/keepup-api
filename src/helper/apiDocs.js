const expressJSDocSwagger = require("express-jsdoc-swagger");

const options = {
  info: {
    version: "1.0.0",
    title: "keep'up",
    email: "keepup.oclock@gmail.com",
  },
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  basePath: "api/v1/",
  baseDir: __dirname,

  filesPattern: [
    "../router/**/*.js",
    "../helper/**/*.js",
    "../data/*.js",
    "../schema/*.js",
  ],

  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
  exposeApiDocs: true,
  apiDocsPath: "/api/docs",
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns Express JSDoc Swagger middleware that create web documentation
 */
module.exports = (app) => expressJSDocSwagger(app)(options);
