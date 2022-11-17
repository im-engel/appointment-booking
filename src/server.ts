import express, { Request, Response } from "express";
import { promises as fs } from 'fs';

const app = express();
const port = 9000;

app.set('json spaces', 2);

app.get("/appointments", async (_: Request, res: Response) => {
  const data = await fs.readFile('data.json');
  res.json(JSON.parse(data.toString()));
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});