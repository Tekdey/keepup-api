const router = require("express").Router();
const { user, activity, event, message } = require("../controller");
const controller = require("../controller");
const { authenticate } = require("../middleware");

/**
 * GET /api/v1/signup
 * @summary Data needed for signup page
 * @tags User
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 * @example response - 400 - example error response
 * "No sports found"
 * @example response - 200 - example success response
 *        {
 *         "level": [
 *           "Débutant",
 *           "Intermediaire",
 *           "Expert"
 *         ],
 *         "gender": [
 *           "Homme",
 *           "Femme",
 *           "Non" binaire,
 *           "Non précisé"
 *         ],
 *         "sports": [
 *           {
 *             "_id": "63315bfe03beff9752dd8e39",
 *             "category": "sports d'endurance",
 *             "sport": "course à pied",
 *             "icon": "https://firebasestorage.googleapis.com/v0/b/keepup-oclock.appspot.com/o/icon%2F1664179118901?alt=media&token=eb8726ef-ba16-4c0c-8482-50789b1000b9",
 *             "__v": 0
 *           }
 *          ]
 *         }
 */
router.get("/signup", user.formSignup);

/**
 * GET /api/v1/user/:id
 * @summary Route to get a user's data
 * @tags User
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 * @example response - 400 - example error response
 * "This user does not exist"
 * @example response - 200 - example success response
 * {
*"user": {
*"_id": "6331760ae17d6c76841f590e",
*"firstname": "Guillaumee",
*"lastname": "Lubowitz",
*"handicap": true,
*"gender": "Homme",
*"email": "yyyy@edceqxd.com",
*"image_url": "http://image.noelshack.com/fichiers/2022/38/4/1663838623-default-user-image.png",
*"dob": "06/03/2000",
*"sports": [
*{
*"level": "Expert",
*"sport": {
*"_id": "63315cc303beff9752dd8e45",
*"category": "sports collectifs",
*"sport": "basketball",
*"icon": "https://firebasestorage.googleapis.com/v0/b/keepup-oclock.appspot.com/o/icon%2F1664179346997?alt=media&token=b22e262f-261c-4e3c-83df-f99d83eb39c8",
*"__v": 0
*},
*"_id": "6334101c8183fe874cdcf7fd"
*},
*{
*"level": "Expert",
*"sport": {
*"_id": "63315bfe03beff9752dd8e39",
*"category": "sports d'endurance",
*"sport": "course à pied",
*"icon": "https://firebasestorage.googleapis.com/v0/b/keepup-oclock.appspot.com/o/icon%2F1664179118901?alt=media&token=eb8726ef-ba16-4c0c-8482-50789b1000b9",
*"__v": 0
*},
*"_id": "6334470f652b9b382b99096f"
*}
*],
*"city": "Nimes",
*"zipcode": 30000,
*"updated_at": "2022-09-26T09:51:06.455Z",
*"created_at": "2022-09-26T09:51:06.455Z",
*"__v": 0
}
}
 */
router.get("/user/:id", authenticate, user.getOne);

/**
 * GET /api/v1/user/:id/view
 * @summary Route to get a user's essential data
 * @tags User
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 * @example response - 400 - example error response
 * "This user does not exist"
 * @example response - 200 - example success response
 * {
 *    "user": {
 *    "_id": "6331760ae17d6c76841f590e",
 *    "firstname": "Guillaumee",
 *    "gender": "Homme",
 *    "image_url": "http://image.noelshack.com/fichiers/2022/38/4/1663838623-default-user-image.png",
 *    "dob": "06/03/2000",
 *    "sports": [
 *        {
 *            "level": "Expert",
 *            "sport": "63315cc303beff9752dd8e45",
 *            "_id": "6334101c8183fe874cdcf7fd"
 *        },
 *        {
 *            "level": "Expert",
 *            "sport": "63315bfe03beff9752dd8e39",
 *            "_id": "6334470f652b9b382b99096f"
 *        }
 *    ],
 *    "city": "Nimes"
 *}
 *}
 */
router.get("/user/:id/view", authenticate, user.getView);

/**
 * GET /api/v1/auth/password/:email
 * @summary Route to reset user's password
 * @tags User
 * @return  200 - success response - application/json
 * @return {string} 403 - 	Forbidden
 * @example response - 403 - example error response
 * "Veuillez réessayer ulterieurement"
 */
router.get("/auth/password/:email", user.forgetPassword);

/**
 * GET /api/v1/event/:id
 * @summary Route to get an event's data
 * @tags Event
 * @param {string} id - event id
 * @return {object} 200 - success response - application/json
 * @return {string} 403 - 	Forbidden
 * @example response - 403 - example error response
 * "Event not found"
 * @example response - 200 - example success response
 *    {
 *        "period": {
 *            "start": 1000,
 *            "end": 1200
 *        },
 *        "location": {
 *            "type": "Point",
 *            "coordinates": [
 *                47.21644064935077,
 *                -1.5367457118565118
 *            ]
 *        },
 *        "_id": "63348fecf0805bc06edcbfdc",
 *        "sport": {
 *            "_id": "63315c9303beff9752dd8e42",
 *            "category": "sports d'endurance",
 *            "sport": "cyclisme ",
 *            "icon": "https://firebasestorage.googleapis.com/v0/b/keepup-oclock.appspot.com/o/icon%2F1664179326373?alt=media&token=868eb8a7-0452-4aa2-8cc1-4a14795a0e99",
 *            "__v": 0
 *        },
 *        "level": "Débutant",
 *        "gender": "Non précisé",
 *        "max": 30,
 *        "date": "2022-09-28T00:00:00.000Z",
 *        "messages": [
 *            "63386445659df8d36bd1044b",
 *            "6338644b659df8d36bd1044e",
 *            "63386450659df8d36bd10451",
 *            "633c246ed259add045be3fea"
 *        ],
 *        "admin": {
 *            "_id": "6331760ae17d6c76841f590e",
 *            "firstname": "Guillaumee",
 *            "gender": "Homme",
 *            "image_url": "http://image.noelshack.com/fichiers/2022/38/4/1663838623-default-user-image.png",
 *            "dob": "06/03/2000",
 *            "sports": [
 *                {
 *                    "level": "Expert",
 *                    "sport": "63315cc303beff9752dd8e45",
 *                    "_id": "6334101c8183fe874cdcf7fd"
 *                },
 *                {
 *                    "level": "Expert",
 *                    "sport": "63315bfe03beff9752dd8e39",
 *                    "_id": "6334470f652b9b382b99096f"
 *                }
 *            ],
 *            "city": "Nimes"
 *        },
 *        "participant": [],
 *        "country": "France",
 *        "address": "9407 Strosin Bypass",
 *        "city": "nantes",
 *        "zipcode": 69100,
 *        "created_at": "2022-09-29T12:23:08.985Z",
 *        "__v": 6
 *    }
 */
router.get("/event/:id", authenticate, event.getOne);

/**
 * GET /api/v1/event/:id/chat
 * @summary Route to get an event's data
 * @tags Event
 * @return {object} 200 - success response - application/json
 * @return {string} 403 - 	Forbidden
 * @example response - 403 - example error response
 * "No messages found"
 * @example response - 200 - example success response
 * {
 *        "messages": [
 *            {
 *                "_id": "633c246ed259add045be3fea",
 *                "sender": {
 *                    "_id": "633b3c6f70d759b74901c645",
 *                    "firstname": "Toto"
 *                },
 *                "receiver": "63348fecf0805bc06edcbfdc",
 *                "content": "Hello",
 *                "created_at": "2022-10-04T12:17:50.884Z",
 *                "__v": 0
 *            },
 *            {
 *                "_id": "633c23c4d259add045be3fe6",
 *                "sender": {
 *                    "_id": "633b19efde79d4e88ba658fc",
 *                    "firstname": "Nathan"
 *                },
 *                "receiver": "63348fecf0805bc06edcbfdc",
 *                "content": "ok",
 *                "created_at": "2022-10-04T12:15:00.374Z",
 *                "__v": 0
 *            }
 *           ]
 *}
 */
router.get("/event/:id/chat", authenticate, message.getMessagesByEvent);

/**
 * GET /api/v1/sports
 * @summary Route to get an event's data
 * @tags Activity
 * @return {object} 200 - success response - application/json
 * @return {string} 403 - 	Forbidden
 * @example response - 403 - example error response
 * "No sports found"
 * @example response - 200 - example success response
 * {
 *   "sports": [
 *       {
 *         "_id": "63315bfe03beff9752dd8e39",
 *         "category": "sports d'endurance",
 *         "sport": "course à pied",
 *         "icon": "https://firebasestorage.googleapis.com/v0/b/keepup-oclock.appspot.com/o/icon%2F1664179118901?alt=media&token=eb8726ef-ba16-4c0c-8482-50789b1000b9",
 *         "__v": 0
 *       },
 *       {
 *         "_id": "63315c6503beff9752dd8e3c",
 *         "category": "sports d'endurance",
 *         "sport": "natation",
 *         "icon": "https://firebasestorage.googleapis.com/v0/b/keepup-oclock.appspot.com/o/icon%2F1664179198273?alt=media&token=b8a60a39-5694-440e-83c5-62b16ec073bc",
 *         "__v": 0
 *       }
 *       ]
 *}
 */
router.get("/sports", authenticate, activity.getSports);

/**
 * GET /api/v1/sports
 * @summary Route to get an event's data
 * @tags Activity
 * @return {object} 200 - success response - application/json
 * @return {string} 403 - 	Forbidden
 * @example response - 403 - example error response
 * "No sports found"
 * @example response - 200 - example success response
 * {
 *   [
 *	    {
 *		"period": {
 *			"start": 1665058293,
 *			"end": 1665663093
 *		},
 *		"location": {
 *			"type": "Point",
 *			"coordinates": [
 *				43.836699,
 *				4.360054
 *			]
 *		},
 *		"_id": "634526aea3f53127fed200ff",
 *		"name": "De la randonné ca vous dit ?",
 *		"sport": {
 *			"_id": "63315c7e03beff9752dd8e3f",
 *			"category": "sports d'endurance",
 *			"sport": "randonnée ",
 *			"icon": "https://firebasestorage.googleapis.com/v0/b/keepup-oclock.appspot.com/o/icon%2F1664179301088?alt=media&token=86df2f0c-87d4-418e-88cd-46ec005f74e4",
 *			"__v": 0
 *		},
 *		"level": "Débutant",
 *		"max": 30,
 *		"date": "2000-06-02T22:00:00.000Z",
 *		"messages": [],
 *		"admin": {
 *			"_id": "6345266a5213ced3e99d5328",
 *			"firstname": "Nathan"
 *		},
 *		"participant": [],
 *		"country": "France",
 *		"address": "2 rue de l'horloge",
 *		"city": "Nimes",
 *		"zipcode": 30000,
 *		"created_at": "2022-10-11T08:17:50.299Z",
 *		"__v": 0
 *	    }
 *  ]
 * }
 */
router.get("/user/event/:id", event.findAllEventByUser);
router.get("/user/event/admin/:id", event.findAllEventCreatedByUser);

module.exports = router;
