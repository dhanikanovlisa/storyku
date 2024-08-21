import 'module-alias/register';
import express from 'express';
import storyRouter from './routes/StoryRoute';

var cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('WElcome to the story app');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use('/stories', storyRouter);