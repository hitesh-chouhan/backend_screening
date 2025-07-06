
/**
 *
 * Contains api documentation of users module
 *
 **/

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Userss management
 */

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Users Create
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name
 *                 example: Ameen
 *               tenantId:
 *                 type: string
 *                 description: Tenant Id
 *                 example: 60b23dd722bebabfacaf6456
 *     responses:
 *       201:
 *         description: Users created successfully
 *       409:
 *         description: Similar record already exist
 *       403:
 *         description: Token missing
 *       401:
 *         description: Token expired
 *       400:
 *         description: Validation exception
 */

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Users Update
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Document Id
 *                 example: 60b23dd722bebabfacaf3456
 *               name:
 *                 type: string
 *                 description: Name
 *                 example: Ameen
 *               tenantId:
 *                 type: string
 *                 description: Tenant Id
 *                 example: 60b23dd722bebabfacaf6456
 *     responses:
 *       202:
 *         description: Users updated successfully
 *       409:
 *         description: Similar record already exist
 *       403:
 *         description: Token missing
 *       401:
 *         description: Token expired
 *       400:
 *         description: Validation exception
 */

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Users Delete
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: _id
 *         required: true
 *         description: Document id for search
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Users deleted successfully
 *       404:
 *         description: Record not found
 *       403:
 *         description: Token missing
 *       401:
 *         description: Token expired
 *       400:
 *         description: Validation exception
 */

/**
 * @swagger
 * /users/single:
 *   get:
 *     summary: Users Fetch - By using _id
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: _id
 *         required: true
 *         description: Document id for search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       404:
 *         description: Record not found
 *       403:
 *         description: Token missing
 *       401:
 *         description: Token expired
 *       400:
 *         description: Validation exception
 */

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Userss Fetch - With table operations
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: searchText
 *         required: false
 *         description: Free text for search
 *         schema:
 *           type: string
 *       - in: query
 *         name: pageNumber
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: number
 *       - in: query
 *         name: pageSize
 *         required: false
 *         description: Page size for pagination
 *         schema:
 *           type: number
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         description: Order for sorting
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortField
 *         required: false
 *         description: Field for sorting
 *         schema:
 *           type: string
 *       - in: query
 *         name: _id
 *         required: false
 *         description: Document id for search
 *         schema:
 *           type: string
 *       - in: query
 *         name: isDelete
 *         required: false
 *         description: Filter deleted documents - By default false
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Userss fetched successfully
 *       204:
 *         description: No Record Found
 *       403:
 *         description: Token missing
 *       401:
 *         description: Token expired
 *       400:
 *         description: Validation exception
 */