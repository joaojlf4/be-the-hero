import Express from 'express';
import cors from 'cors';
import routes from './routes';
import morgan from 'morgan';

const app = Express();

app.use(cors());
app.use(morgan(':method :url :status:response-time'))
app.use(Express.json());
app.use(routes);

export default app;