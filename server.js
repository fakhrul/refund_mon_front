const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

// Log environment variables for debugging
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`VUE_APP_URL: ${process.env.VUE_APP_URL}`);
// console.log(`VUE_APP_API_URL: ${process.env.VUE_APP_API_URL || window.config.API_URL}`);
// console.log(`VUE_APP_VERSION: ${process.env.VUE_APP_VERSION}`);

app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Admin is listening at http://localhost:${PORT}`);
    // console.log(`Server is running on port ${PORT}`);
});