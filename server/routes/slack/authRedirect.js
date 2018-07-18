const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const router = express.Router();

router.get('/', (req, res) => res.send(req.body));

module.exports = router;
