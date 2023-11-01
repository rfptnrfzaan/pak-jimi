/** @format */

import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

app.listen(5000, () => console.log("Server Up and Running..."));
