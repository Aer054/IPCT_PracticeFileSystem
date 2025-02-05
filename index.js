const express = require("express");
const cors = require('cors');
require('dotenv').config()

const PORT =process.env.PORT || 5000
const { initDB } = require('./models');
const router = require("./routes/index");
const app = express();
const errorHandler =require('./middleware/ErrorHandlerMiddleware')

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SystemFile API',
        version: '1.0.0',
        description: 'APIs to authenticate users',
      },
      servers: [
        {
          url: `http://${process.env.DB_HOST}:${process.env.PORT}`,
          description: 'Development server',
        },
      ],
    },
    apis: ['./routes/index.js', './routes/authRouter.js','./routes/fileRouter.js','./routes/folderRouter.js'], 
  };

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(cors());
app.options('*', cors()); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use('/api',router)
app.use(errorHandler)
initDB()
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
