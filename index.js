const express = require('express')
const fetch = require('node-fetch');
const app = express()
const port = 3080
app.use(express.static(__dirname + "/divoom-interface/dist/"));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/divoom-interface/dist/index.html");
})

app.get('/pixels', async (req, res) => {
    const response = await fetch('http://192.168.0.4:3000/pixels')
    res.send(await response.json());
})


app.post('/pixel', async(req, res) => {
    const response = await fetch('http://192.168.0.4:3000/pixel', {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          "x": req.body.x,
          "y": req.body.y,
          "color": req.body.color
        })
    });
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})