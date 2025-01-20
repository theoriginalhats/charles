const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:page', (req, res, next) => {
    const pagePath = path.join(__dirname, 'public', `${req.params.page}.html`);
    res.sendFile(pagePath, (err) => {
        if (err) next();
    });
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
