const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'gateway' }));

app.use('/api', routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
