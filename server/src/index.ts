import 'module-alias/register';
import express from 'express';
import router from './routes/route';

var cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome to the story app');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use('/stories', router);