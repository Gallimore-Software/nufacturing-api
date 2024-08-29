const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './src/routes/product-development-routes/*.js',
    './src/routes/sales-routes/*.js',
    '*.js'
]

swaggerAutogen(outputFile, endpointsFiles)