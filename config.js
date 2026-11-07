// Central configuration. Override any value with an environment variable.
const num = (v, d) => (Number.isFinite(parseInt(v, 10)) ? parseInt(v, 10) : d);

module.exports = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: num(process.env.PORT, 3000),                 // the single app: UI + API + live events
  // The UI is served from the same origin as the API, so CORS is off by default.
  // Only set this if you host the UI somewhere else (comma-separated origins, or '*').
  CORS_ORIGIN: process.env.CORS_ORIGIN || '',
  DATA_FILE: process.env.DATA_FILE || require('path').join(__dirname, 'data', 'db.json'),

  CATEGORIES: ['Transport', 'Appliances', 'Electronics', 'Books', 'Furniture'],
  CONDITIONS: ['Like new', 'Good', 'Fair']
};
