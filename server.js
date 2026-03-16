const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname);
const DB_PATH = path.join(ROOT, 'compositions.json');

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/layoutexperiment/compositions', (req, res) => {
  res.sendFile(path.join(ROOT, 'layoutexperiment', 'compositions.html'));
});
app.get('/layoutexperiment/compositions/', (req, res) => {
  res.sendFile(path.join(ROOT, 'layoutexperiment', 'compositions.html'));
});
app.get('/layoutexperiment/play', (req, res) => {
  res.sendFile(path.join(ROOT, 'layoutexperiment', 'play.html'));
});
app.get('/layoutexperiment/play/', (req, res) => {
  res.sendFile(path.join(ROOT, 'layoutexperiment', 'play.html'));
});
app.get('/layoutexperiment/editor', (req, res) => {
  res.sendFile(path.join(ROOT, 'layoutexperiment', 'editor.html'));
});
app.get('/layoutexperiment/editor/', (req, res) => {
  res.sendFile(path.join(ROOT, 'layoutexperiment', 'editor.html'));
});
app.get('/layoutexperiment/ui-components', (req, res) => {
  res.sendFile(path.join(ROOT, 'layoutexperiment', 'ui-components.html'));
});
app.get('/layoutexperiment/ui-components/', (req, res) => {
  res.sendFile(path.join(ROOT, 'layoutexperiment', 'ui-components.html'));
});

function defaultState() {
  return { gridCells: [], content: [], intent: 'inform' };
}

function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    return [];
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// Seed 3 compositions if file is empty or missing
const initial = readDb();
if (initial.length === 0) {
  const now = Date.now();
  writeDb([
    { id: require('crypto').randomUUID(), name: 'Untitled', state: defaultState(), createdAt: now, updatedAt: now },
    { id: require('crypto').randomUUID(), name: 'Untitled 2', state: defaultState(), createdAt: now, updatedAt: now },
    { id: require('crypto').randomUUID(), name: 'Untitled 3', state: defaultState(), createdAt: now, updatedAt: now }
  ]);
  console.log('Seeded compositions.json with 3 compositions');
}

app.get('/api/compositions', (req, res) => {
  try {
    const data = readDb();
    console.log('[API] GET /api/compositions: readDb returned', data.length, 'items');
    const list = data
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .map(c => ({ id: c.id, name: c.name, createdAt: c.createdAt, updatedAt: c.updatedAt }));
    res.json(list);
    console.log('[API] GET /api/compositions: sending', list.length, 'items');
  } catch (e) {
    console.error('[API] GET /api/compositions error:', e.message);
    res.status(500).json({ error: String(e.message) });
  }
});

app.get('/api/compositions/:id', (req, res) => {
  try {
    const c = readDb().find(x => x.id === req.params.id);
    if (!c) return res.status(404).json({ error: 'Not found' });
    res.json(c);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.post('/api/compositions', (req, res) => {
  try {
    console.log('[API] POST /api/compositions: body', JSON.stringify(req.body).slice(0, 200));
    const id = req.body.id || require('crypto').randomUUID();
    const name = req.body.name || 'Untitled';
    const state = req.body.state != null ? req.body.state : defaultState();
    const now = Date.now();
    const data = readDb();
    if (data.some(c => c.id === id)) {
      console.log('[API] POST /api/compositions: id exists, 409');
      return res.status(409).json({ error: 'Id exists' });
    }
    data.push({ id, name, state, createdAt: now, updatedAt: now });
    writeDb(data);
    console.log('[API] POST /api/compositions: created', id, name);
    res.status(201).json({ id, name, createdAt: now, updatedAt: now });
  } catch (e) {
    console.error('[API] POST /api/compositions error:', e.message);
    res.status(500).json({ error: String(e.message) });
  }
});

app.put('/api/compositions/:id', (req, res) => {
  try {
    const id = req.params.id;
    const data = readDb();
    const i = data.findIndex(c => c.id === id);
    if (i === -1) return res.status(404).json({ error: 'Not found' });
    if (req.body.name != null) data[i].name = req.body.name;
    if (req.body.state != null) data[i].state = req.body.state;
    data[i].updatedAt = Date.now();
    writeDb(data);
    res.json({ id, name: data[i].name, updatedAt: data[i].updatedAt });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.delete('/api/compositions/:id', (req, res) => {
  try {
    const data = readDb().filter(c => c.id !== req.params.id);
    if (data.length === readDb().length) return res.status(404).json({ error: 'Not found' });
    writeDb(data);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.use(express.static(ROOT));

app.listen(PORT, () => {
  console.log('Server at http://localhost:' + PORT);
  console.log('Compositions stored in compositions.json');
});
