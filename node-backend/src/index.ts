import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import notesRouter from "./routes/notes";

const app = express();
const PORT: number = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/notes", notesRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
