// 1. PACKAGES
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// 2. CONFIG
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3004;

// 3. __dirname tanımlama (ESM kullanıyorsak)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 4. EJS ayarları
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 5. MIDDLEWARE
app.use(express.static('public'));

// 6. ROUTES

// Anasayfa route
app.get('/', async (req, res) => {
  try {
    // IP alma
// const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
const ip = "134.201.250.155"; // örnek IP (Los Angeles)
    // IPSTACK API çağrısı
    const apiKey = process.env.IPSTACK_KEY;
    const url = `http://api.ipstack.com/${ip}?access_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log('IP DATA:', data);

    // index.ejs render
    res.render('index', { ipData: data });

  } catch (err) {
    console.error(err);
    res.status(500).send('Bir hata oluştu');
  }
});

// 7. SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});