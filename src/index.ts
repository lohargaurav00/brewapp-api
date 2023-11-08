import express, { Response, Request } from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectToDb from './db';

//@Routes import
import addBook from './routes/add-book';


const port = process.env.PORT || 5000;
const app = express();

connectToDb();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Book API');
});

app.use('/api/add-book', addBook);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});

