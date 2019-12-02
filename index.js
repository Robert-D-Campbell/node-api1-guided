const express = require("express");

const db = require("./data/hubs-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send({ api: "up and running!" });
});

server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log("error on GET /hubs", err);
      res
        .status(500)
        .json({ errorMessage: "error getting list of hubs from database" });
    });
});

server.post("/hubs", (req, res) => {
  const hubData = req.body;

  db.add(hubData)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      console.log("error on POST /hubs", err);
      res.status(500).json({ errorMessage: "error adding the hub" });
    });
});

server.delete("/hubs/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(removed => {
      if (removed) {
        res
          .status(200)
          .json({ successMessage: "the hub was removed successfully" });
      } else {
        res.status(404).json({
          errorMessage: "the hub with the specified id was not found"
        });
      }
    })
    .catch(err => {
      console.log("error on DELETE /hubs/:id", err);
      res.status(500).json({ errorMessage: "error removing the hub" });
    });
});

const port = 4000;
server.listen(port, () => console.log("API is listening on port", port));
