const express = require("express")
const path = require("path")
const port = 3000
const app = express()
const publicDir = path.join(__dirname, "public")
const errorsDir = path.join(__dirname, "errors")

// Serve static files from the "public" folder
app.use(express.static(publicDir))

// Remove .html extension from HTML files
app.use((req, res, next) => {
  if (req.path.endsWith(".html")) {
    const newPath = req.path.slice(0, -5)
    res.redirect(newPath)
  } else {
  }
})
// Catch-all route handler for 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(errorsDir, "404.html"))
})

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.statusCode === 403) {
    res.status(403).sendFile(path.join(errorsDir, "403.html"))
  } else {
    console.error(`An Error has occurred. ${err.stack}`)
    res.status(500).send("An Error has occurred. Please try again later.")
  }
})
// Start the server
app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`)
})
