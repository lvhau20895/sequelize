// phải ghi đúng cú pháp và khai báo thẳng hàng

/**
 * @swagger
 * /api/user/get-user:
 *  get:
 *      description: responses
 *      tags: [User]
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/user/get-user-by-id/{id}:
 *  get:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: id
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/user/get-user-pagination:
 *  get:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: query
 *        name: page
 *      - in: query
 *        name: size
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/user/updateUser/{id}:
 *  put:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: id
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *      responses:
 *          200:
 *              description: res
 */
