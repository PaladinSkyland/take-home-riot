import swaggerJsdoc from 'swagger-jsdoc';
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     adminToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Use this token to access admin routes.
 *     teacherToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Use this token to access teacher routes.
 *     studentToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Use this token to access student routes.
 */

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Riot Take Home Test',
      version: '1.0.0',
      description: 'A simple Express API application for riot take home test',
    },
  },
  apis: ['./src/swagger.ts', './src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
