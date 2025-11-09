const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ ok: true, service: 'backend' }));

app.listen(4000, () => console.log('backend listening on 4000'));
