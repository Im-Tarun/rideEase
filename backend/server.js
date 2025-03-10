import express, { urlencoded } from 'express'
import  dotenv from 'dotenv'
import cors from 'cors'
import dbcon from './config/dbcon.js'
import useRouter from './routes/user.route.js'
import captainRouter from './routes/captain.route.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use("/api/user",  useRouter)
app.use("/api/captain", captainRouter)
app.use(urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  dbcon();
  console.log(`Server is running on http://localhost:${port}`);
});