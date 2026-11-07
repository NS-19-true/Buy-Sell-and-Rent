// Central configuration. Override any value with an environment variable.
const num = (v, d) => (Number.isFinite(parseInt(v, 10)) ? parseInt(v, 10) : d);

module.exports = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: num(process.env.PORT, 3000),                 // REST API + live updates
  // The WeChat mini program is not a browser, so it does not use CORS. Set this only if a
  // browser client (comma-separated origins, or '*') also talks to this server.
  CORS_ORIGIN: process.env.CORS_ORIGIN || '',
  POLL_HOLD_MS: num(process.env.POLL_HOLD_MS, 25000), // how long /api/poll waits for news (keep < client timeout)
  DATA_FILE: process.env.DATA_FILE || require('path').join(__dirname, '..', 'data', 'db.json'),

  CATEGORIES: ['Transport', 'Appliances', 'Electronics', 'Books', 'Furniture'],
  CONDITIONS: ['Like new', 'Good', 'Fair']
};
