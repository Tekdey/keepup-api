const router = require("express").Router();
const controller = require("../controller");
const { user: param, dynamicController } = require("../middleware/parameter");
const validator = require("../service/validation/validator");
const schema = require("../service/validation/schema");
const { confirmChangePassword } = require("../middleware");
const { authenticate } = require("../middleware");

// Defining the router param with its value
router.param("collection", param.collection);
// Dynamic controller
/**
 * POST /api/v1/create/:collection
 * @summary Dynamic route to create records
 * @tags Create
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 * @example request - example payload
 * {
 *      "name": <string>,
 *      "sport": <objectId>,
 *      "level": <string>,
 *      "gender": <string>,
 *      "description": <string>,
 *      "max": <number>,
 *      "date": <timestamp>,
 *      "period": {"start":"08:00","end":"10:00"},
 *      "admin": <objectId>,
 *      "country": <string>,
 *      "address": <string>,
 *      "location": {
 *      "type" : "Point",
 *      "coordinates" : [
 *        45.763217322939916, 4.835893475715351
 *         ]
 *       }
 *}
 * @example request - other payload example
 *  {
 *      "firstname": <string>,
 *      "lastname": <string>,
 *      "gender": <string>,
 *      "email": <string>,
 *      "password": <string>,
 *      "image_url": <string>,
 *      "dob": <string>,
 *      "description": <string>,
 *      "sports": {<objectId>,<string>},
 *      "city": <string>,
 *      "zipcode": <number>,
 *}
 * @example request - other payload example
 *  {
 *      "category": <string>,
 *      "name": <string>,
 *      "icon": <string>,
 *  }
 * @example response - 200 - example success response
 *       "<collection> have been created"
 *
 * @example response - 400 - example error response
 *       "Fail to create <collection>"
 *
 */
router.post(
  "/create/:collection",
  validator.create(schema.create),
  dynamicController(controller)
);

/**
 * POST /api/v1/auth/login
 * @summary Route to login user
 * @tags User
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.post(
  "/auth/login",
  validator.login(schema.login),
  controller.user.login
);

/**
 * POST /api/v1/auth/token
 * @summary Route to verify a token
 * @tags User
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.post("/auth/token", validator.body(schema.token), controller.user.token);

/**
 * POST /api/v1/auth/password/:id/confirm"
 * @summary Route to confirme the change of password
 * @tags User
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.post(
  "/auth/password/:id/confirm",
  confirmChangePassword,
  controller.user.confirmPassword
);

/**
 * POST /api/v1/events"
 * @summary Route to search events
 * @tags Event
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.post(
  "/events",
  // [validator.search(schema.search)],
  controller.event.findEvents
);

module.exports = router;
