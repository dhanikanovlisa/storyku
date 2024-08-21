import 'module-alias/register';
import express from 'express';
import api from './api'

var cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors())

app.get('/', (_, res) => {
  res.send('Welcome to the story app');
});

app.use('/api/v1/stories', api);

export default app;