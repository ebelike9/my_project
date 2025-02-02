import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import userRoute from './routes/userRoute.js';

const app = express();
let server = null;
app.use(cors());
app.use(express.json());

app.use('/', userRoute);

server= app.listen(8080, () => {
  console.log('server running at http://localhost:5000');
});

 const io = new Server( server,{ cors: { origin: ['http://localhost:5173']} } );



io.on('connection', (socket) => {
  console.log('A user connected');
 
});


app.get('/', (req, res) => {
  res.send('Hello World');
}); 


//