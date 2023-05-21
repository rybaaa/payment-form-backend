import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import {validationRouter} from "./routes/validation-route";

const app = express()
const port = 5000
const parserMiddleware = bodyParser({});


app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true,
    })
);
app.use(parserMiddleware);
app.use('/validation', validationRouter);

app.listen(port, () => {
    console.log(`Payment form backend app listening on port ${port}`)
})