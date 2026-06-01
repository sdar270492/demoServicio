require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.API_KEY || 'demo-secret-key',
  SERVICES: {
    users: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  },
};
