import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

import format from "date-fns/format";
import compareAsc from "date-fns/compareAsc";
import compareDesc from "date-fns/compareDesc";

let data: any;

fs.readFile(
  path.resolve(__dirname, "./data.json"),
  "utf-8",
  (err, jsonString) => {
    data = JSON.parse(jsonString);
  }
);

const PORT = 4000;
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "*",
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

interface ILocation {
  name: string;
}

app.get("/equines/:query", async (req, res) => {
  // const equines = data;
  const query = req.params.query;
  const { from, to } = req.query;

  const fromDate = new Date(from.toString());
  const toDate = new Date(to.toString());

  const equines = data.equines
    .filter(({ ueln }) => ueln === query)
    .filter(({ date_from, date_to }) => {
      const eqDateFrom = new Date(date_from);
      const eqDateTo = new Date(date_to);

      const isAfterStart = compareAsc(eqDateFrom, fromDate);
      const isBeforeEnd = compareDesc(eqDateTo, toDate);

      return isAfterStart >= 0 && isBeforeEnd >= 0;
    })
    .map((equine: any) => ({ ...equine, id: uuidv4() }));

  console.log(equines);

  // if (locationSearch?.length > 1) {
  try {
    res.json(equines);
  } catch (err) {
    res.status(500).json({ error: "oh noes something went wrong" });
  }
  // }

  res.end();
});

app.listen(PORT, () => console.log(`Server Listening on Port ${PORT}`));
