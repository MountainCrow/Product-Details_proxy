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

app.use('/',createProxyMiddleware({
  target:'http://ec2-54-67-54-160.us-west-1.compute.amazonaws.com/',
  changeOrigin:true,
},))
app.use('/',createProxyMiddleware({
  target:'http://ec2-54-183-54-127.us-west-1.compute.amazonaws.com/',
  changeOrigin:true,
},))
app.use('/',createProxyMiddleware({
  target:'http://',
  changeOrigin:true,
},))

// app.get('/', (req, res) => {
//   res.send('Working...')
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})