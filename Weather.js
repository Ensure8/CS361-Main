const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    
});

app.listen(3002, () => {console.log(`Server running at http://localhost:3002`);});
