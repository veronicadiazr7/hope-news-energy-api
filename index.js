const express = require("express");
const app = express();
const fs = require("fs");

app.get("/getSources", (req, res) => {
  fs.readFile(__dirname + "/" + "sources.json", "utf8", (err, data) => {
    // console.log(data);
    res.send(data);
  });
});

let server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Server is listening at http://%s:%s", host, port);
});

let addSource = {
  Source12: {
    id: 12,
    name: "SolarAid",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/SolarAid_Logo.png/1200px-SolarAid_Logo.png",
    url: "https://solaraid.org",
    type: "Organization",
  },
};

app.get("/", (req, res) => {
  fs.readFile("index.html", (err, data) => {
    res.write(data);
    res.end();
  });
});
app.post("/addSource", (req, res) => {
  fs.readFile(__dirname + "/" + "sources.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    data["Source12"] = addSource["Source12"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

app.get("/:id", (req, res) => {
  fs.readFile(__dirname + "/" + "sources.json", "utf8", (err, data) => {
    var sources = JSON.parse(data);
    var source = sources["source" + req.params.id];
    console.log(source);
    res.end(JSON.stringify(source));
  });
});

let id = 3;
app.delete("/deleteSource/", (req, res) => {
  fs.readFile(__dirname + "/" + "sources.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    delete data["source" + 3];

    console.log(data);
    res.end(JSON.stringify(data));
  });
});
