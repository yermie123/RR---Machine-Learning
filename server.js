import express from "express";
import { createRequire } from "module";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

const app = express();
const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./dist")));

app.listen(10000, () => {
  console.log("Server is running on port 3000");
});
