import express, {Request, Response} from 'express'

const app = express()
const port = 5000

app.get('/', (req: Request, res: Response) => {
    res.send('Start')
})

app.listen(port, () => {
    console.log(`Payment form backend app listening on port ${port}`)
})