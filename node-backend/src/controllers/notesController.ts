import { Request, Response } from "express";
import { Note } from "../types";

const notes: Note[] = [];

export const getNotes = (req: Request, res: Response) => {
    res.json(notes);
};

export const getNoteById = (req: Request, res: Response) => {
    const id = req.params.id;
    const note = notes[parseInt(id)];
    if (!note) {
        res.status(404).json({ message: "Note not found" });
        return;
    }
    res.json(note);
};

export const createNote = (req: Request, res: Response) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ message: "Invalid note" });
        return;
    }

    const newNote: Note = { title, content };
    notes.push(newNote);
    res.status(201).json(newNote);
};
