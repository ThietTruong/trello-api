import express from "express";
const app = express();
const hostname = "127.0.0.1";
const port = process.env.PORT || 8017;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
