import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";

import format from "date-fns/format";
import compareAsc from "date-fns/compareAsc";
import compareDesc from "date-fns/compareDesc";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";

let data: any;

fs.readFile(
  path.resolve(__dirname, "./data.json"),
  "utf-8",
  (err, jsonString) => {
    console.log(jsonString);
    data = JSON.parse(jsonString);
  }
);

console.log(data);

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

  // {
  //   "ueln": "8260001",
  //   "date_from": "2019-01-01",
  //   "date_to": "2019-01-02",
  //   "location": {
  //     "city": "Cheltenham",
  //     "county": "Gloucestershire",
  //     "long": "-2.078253",
  //     "lat": "51.899387"
  //   }
  // },
  // Compare the two dates and return 1
  // if the first date is after the second,
  // -1 if the first date is before

  // desc
  // Compare the two dates and return -1 if the first date is after the second,
  //1 if the first date is before the second or 0 if dates are equal.

  const equines = data.equines.filter(({ date_from, date_to }) => {
    const isAfterStart = !!compareAsc(new Date(date_from), fromDate);
    const isBeforeEnd = !!compareDesc(new Date(date_to), toDate);

    return isAfterStart && isBeforeEnd;
  });

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
