const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.listen(3000, () => {console.log(`Server running at http://localhost:3000`);});
