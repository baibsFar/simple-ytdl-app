import express from 'express'
import ytdl from 'ytdl-core'
import { argv } from 'process'

const app = express()
const port = argv[3] || 8000
const host = argv[2] || '127.0.0.1'

app.set('view engine', 'ejs')

// ROUTES

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/download', async (req, res) => {
  const info = await ytdl.getInfo(req.query.url)
  console.log(await ytdl.getBasicInfo(req.query.url))
  res.render(
    'download',
    { 
      formats: info.formats.sort((a, b) => a.mimeType < b.mimeType),
      videoTitle: info.videoDetails.title,
    }
  )
})

app.listen(
  port,
  host,
  () => console.log(`http://${host}:${port}`)
)