require('dotenv').config();
//require('newrelic');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const { createProxyMiddleware }= require('http-proxy-middleware')
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '../dist')))

const productDetailsLB = createProxyMiddleware('http://ec2-54-183-193-8.us-west-1.compute.amazonaws.com');
const reviewsLB = createProxyMiddleware('http://ec2-52-53-212-33.us-west-1.compute.amazonaws.com/');
const productServiceLB = createProxyMiddleware('http://ec2-13-57-221-22.us-west-1.compute.amazonaws.com/');


app.use(productDetailsLB)
  .use(productServiceLB)
  .use(reviewsLB)


app.get('/', (req, res) => {
  res.send('Working...')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})