// index.js

import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3004;

// __dirname tanımı
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS ayarları
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Anasayfa route
app.get('/', (req, res) => {
  res.render('index', { ipData: null });
});

// IP POST route
app.post('/get-ip-data', async (req, res) => {
  try {
    const { ip } = req.body;

    const apiKey = process.env.IPSTACK_KEY;
    const url = `http://api.ipstack.com/${ip}?access_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});