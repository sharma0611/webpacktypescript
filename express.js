const express = require('express')
const path = require('path')
const app = express()
const defaultPort = 3000
const sourceDir = 'dist'
const staticDir = 'dist/public'
const portNumber = process.env.PORT ? process.env.PORT : defaultPort

// serve static folder
// app.use('/public', express.static(staticDir))
app.use(express.static(sourceDir))

// route all requests to index.html
app.get('*', function (req, res) {
  res.sendFile('index.html', {
    root: sourceDir,
  })
})

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`)
  console.log(`Serving content from /${sourceDir}/`)
})
