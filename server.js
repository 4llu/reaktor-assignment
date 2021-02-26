const path = require('path');
const express = require('express');

const buildPath = path.join(__dirname, '/build');

const app = express();
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

let port = process.env.PORT;
if (port == null || port == '') {
    port = 4000;
}
app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
