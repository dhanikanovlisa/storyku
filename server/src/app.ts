import 'module-alias/register';
import express from 'express';
import router from './routes/route';

var cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors())

app.get('/', (_, res) => {
  res.send('Welcome to the story app');
});

app.use('/stories', router);

export default app;