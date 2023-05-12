/**
 * @swagger
 * definitions:
 *   authenticated:
 *     properties:
 *       success:
 *         type: boolean
 *       data:
 *          type: object
 *       message:
 *          type: string
 *
 *   register-body:
 *     properties:
 *       name:
 *         type: string
 *       phone:
 *         type: string
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Register's an User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Register
 *         description: User's Details
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/register-body'
 *     responses:
 *       201:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/authenticated'
 */


/**
 * @swagger
 * definitions:
 *   login:
 *     properties:
 *       phone:
 *         type: string
 *       password:
 *         type: string
 *       deviceToken:
 *          type: string
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: User Login from here
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Login
 *         description: Login Credentials
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/login'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/authenticated'
 */

/**
 * @swagger
 * definitions:
 *   current-user:
 *     properties:
 *       success:
 *         type: boolean
 *       data:
 *          properties:
 *              role:
 *                  type: string
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              createdAt:
 *                  type: string
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     description: Get current logged in user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token should be like <Bearer {TOKEN}>
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: On Success
 *         schema:
 *           $ref: '#/definitions/current-user'
 */

/**
 * @swagger
 * definitions:
 *   forgot-password:
 *     properties:
 *       success:
 *         type: boolean
 *       message:
 *         type: string
 *   forgot-password-body:
 *     properties:
 *       email:
 *         type: string
 */

/**
 * @swagger
 * /auth/forgotpassword:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Forgot Password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Enter email to reset password
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/forgot-password-body'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/forgot-password'
 */

/**
 * @swagger
 * definitions:
 *   reset-password:
 *     properties:
 *       password:
 *         type: string
 *
 */

/**
 * @swagger
 * /auth/resetpassword/{resettoken}:
 *   put:
 *     tags:
 *       - Authentication
 *     description: Reset Password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: resettoken
 *         description: Reset your password
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         description:  Your password
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/reset-password'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/authenticated'
 */


/**
 * @swagger
 * definitions:
 *   update_details:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *
 */

/**
 * @swagger
 * /auth/updatedetails:
 *   put:
 *     tags:
 *       - Authentication
 *     description: Update User details
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: User Details
 *        description: Enter Fields to be updated
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/update_details'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/current-user'
 */


/**
 * @swagger
 * definitions:
 *   update-password:
 *     properties:
 *       currentPassword:
 *         type: string
 *       newPassword:
 *         type: string
 *
 */

/**
 * @swagger
 * /auth/updatepassword:
 *   put:
 *     tags:
 *       - Authentication
 *     description: Update password after login
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: User Details
 *        description: Enter old and new password
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/update-password'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/authenticated'
 */

/**
 * @swagger
 * definitions:
 *   logout-res:
 *     properties:
 *       success:
 *         type: string
 *       data:
 *         type: object
 *
 */
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     description: Logout from account
 *     produces: application/json
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/logout-res'
 */