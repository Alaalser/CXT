
import { useState } from 'react';

interface Note {
  title: string;
  content: string;
}

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  const removeNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return {
    notes,
    addNote,
    removeNote,
  };
};

export default useNotes;