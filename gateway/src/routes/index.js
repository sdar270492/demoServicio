const { Router } = require('express');
const axios = require('axios');
const { SERVICES } = require('../config');
const auth = require('../middleware/auth');

const router = Router();

const proxyRequest = async (req, res, next, targetUrl) => {
  try {
    const config = {
      method: req.method,
      url: targetUrl,
      headers: { 'content-type': 'application/json' },
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      config.data = req.body;
    }

    const response = await axios(config);
    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    next(err);
  }
};

// ── Users ──────────────────────────────────────────────────────────────────
router.get('/users', auth, (req, res, next) =>
  proxyRequest(req, res, next, `${SERVICES.users}/users`)
);

router.post('/users', auth, (req, res, next) =>
  proxyRequest(req, res, next, `${SERVICES.users}/users`)
);

router.get('/users/:id', auth, (req, res, next) =>
  proxyRequest(req, res, next, `${SERVICES.users}/users/${req.params.id}`)
);

router.put('/users/:id', auth, (req, res, next) =>
  proxyRequest(req, res, next, `${SERVICES.users}/users/${req.params.id}`)
);

router.delete('/users/:id', auth, (req, res, next) =>
  proxyRequest(req, res, next, `${SERVICES.users}/users/${req.params.id}`)
);

module.exports = router;
