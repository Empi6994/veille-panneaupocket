const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing URL");

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(targetUrl);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Erreur proxy:", error);
    res.status(500).send("Erreur lors du proxy.");
  }
});

app.listen(port, () => {
  console.log(`✅ Serveur proxy en écoute sur http://localhost:${port}`);
});
