import express from 'express';
import router from './routes/chocolates.js';
import path from 'path';
import { json, urlencoded } from 'express';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json());
app.use(urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    res.render('index');
});

app.use('/api', router);

app.listen(port, () => console.log(`app active on ${port}`));
