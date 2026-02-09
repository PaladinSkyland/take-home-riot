import app from './app.js';

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;

app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
    console.log('Secret: ', SECRET);
  })
  .on('error', error => {
    // gracefully handle error
    throw new Error(error.message);
  });
