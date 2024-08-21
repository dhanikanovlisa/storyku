// src/index.ts
import express from 'express';

var cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors())

app.get('/api/tes', async (req, res) => {
    res.json({ message: 'Hello World 3' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
