import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv';


import productRouter from './routes/productRoutes.js'
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import paymentRouter from './routes/payment.js'

dotenv.config()
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/api/products' , productRouter)
app.use('/api/seed' , seedRouter)
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payment', paymentRouter);




app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000 ; 

app.listen(port,()=>{
    console.log(`serve at http://localhost:${port}`)
})