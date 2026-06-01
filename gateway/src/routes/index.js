const { Router } = require('express');
const { SERVICES } = require('../config');
const auth = require('../middleware/auth');

const router = Router();

const proxyRequest = async (req, res, next, targetUrl) => {
  try {
    const init = {
      method: req.method,
      headers: { 'content-type': 'application/json' },
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      init.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, init);

    if (response.status === 204) {
      return res.status(204).send();
    }

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
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
