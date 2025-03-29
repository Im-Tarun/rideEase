import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbcon from './config/dbcon.js'
import cookieParser from 'cookie-parser'
import useRouter from './routes/user.route.js'
import captainRouter from './routes/captain.route.js'
import mapsRouter from './routes/maps.route.js'
import rideRoute from './routes/ride.route.js'
import { initializeSocket } from './socket.js' 

dotenv.config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(urlencoded({extended:true})) 
app.use("/api/user",  useRouter)
app.use("/api/captain", captainRouter) 
app.use("/api/maps", mapsRouter)
app.use("/api/ride", rideRoute)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(port, () => {
  dbcon();
  console.log(`Server is running on http://localhost:${port}`);
});

initializeSocket(server);