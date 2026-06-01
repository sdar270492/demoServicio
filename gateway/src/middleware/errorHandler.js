const errorHandler = (err, req, res, next) => {
  console.error(`[Gateway Error] ${err.message}`);
  res.status(500).json({ error: 'Internal gateway error', detail: err.message });
};

module.exports = errorHandler;
