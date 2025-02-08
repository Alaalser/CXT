import { Router } from "express";
import { getNotes, getNoteById, createNote } from "../controllers/notesController";
import { Note } from "../types";

const router = Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);

export default router;
