import { config } from 'dotenv';
import http from 'http';
import app from './app';

config();

const PORT = process.env.SERVER_PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
