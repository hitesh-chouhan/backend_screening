
/**
 *
 * Contains api documentation of documnets module
 *
 **/

/**
 * @swagger
 * tags:
 *   name: Documnets
 *   description: Documnetss management
 */

/**
 * @swagger
 * /documnets/create:
 *   post:
 *     summary: Documnets Create
 *     tags: [Documnets]
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
 *         description: Documnets created successfully
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
 * /documnets/update:
 *   put:
 *     summary: Documnets Update
 *     tags: [Documnets]
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
 *         description: Documnets updated successfully
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
 * /documnets/delete:
 *   delete:
 *     summary: Documnets Delete
 *     tags: [Documnets]
 *     parameters:
 *       - in: query
 *         name: _id
 *         required: true
 *         description: Document id for search
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Documnets deleted successfully
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
 * /documnets/single:
 *   get:
 *     summary: Documnets Fetch - By using _id
 *     tags: [Documnets]
 *     parameters:
 *       - in: query
 *         name: _id
 *         required: true
 *         description: Document id for search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documnets fetched successfully
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
 * /documnets/all:
 *   get:
 *     summary: Documnetss Fetch - With table operations
 *     tags: [Documnets]
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
 *         description: Documnetss fetched successfully
 *       204:
 *         description: No Record Found
 *       403:
 *         description: Token missing
 *       401:
 *         description: Token expired
 *       400:
 *         description: Validation exception
 */