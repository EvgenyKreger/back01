import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
const app = express()


app.use(cors())
app.use(bodyParser.json())

const port = 5000

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    if(req.body.title){
        videos.push(newVideo)
        res.status(201).send(newVideo)
    }
    else{
        res.status(400).send({errorsMessages:['field (новое название) is required']})
    }
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        res.status(200).send(video)
   }
})

app.put('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
   if (video && req.body.title !== '') {
        video.title = req.body.title
        res.send(204)
    }
    else if (req.body.title === '') {
        res.status(400).send({errorsMessages:['field (новое название) is required']})
    }
   else{
       res.status(404).send({errorsMessages:['videoId is not found']})
   }

})


app.delete('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    videos = videos.filter(v => v.id !== id)
    if (video){
        res.send(204)
    }
    else{
        res.status(404).send({errorsMessages:['videoId is not found']})
    }

})



//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})