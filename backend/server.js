import express from 'express';
import colors from 'colors';
import cors from 'cors'

import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js'
 
dotenv.config()

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors());

app.use('/api/books/', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} and listening on PORT ${PORT}`.blue)
  })

app.get('/', (req, res) => {
    res.send('API is running...')
})

