const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

const publicPath = path.resolve(__dirname, 'build');

app.use(express.static(publicPath));

app.get('*', (_, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server Started');
});
