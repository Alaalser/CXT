"use client"

import Image from "next/image";
import React from "react";
import axios from "axios";
import NoteCard from "@/components/NoteCard";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/notes");
        console.log(data);
        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, []);

  const addNote = async () => {
    try {
      await axios.post("http://localhost:4000/notes", { title, content });
      setNotes([...notes, { title, content, id: Math.random().toString() }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />

          {/* Notes Section */}
          <div className="w-full max-w-3xl mx-auto">
            <ul className="space-y-4">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <li key={note.id}>
                    <NoteCard title={note.title} content={note.content} />
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500">No notes available</li>
              )}
            </ul>
            <button
              onClick={() => setShowModal(!showModal)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {showModal ? "Close" : "Add Note"}
            </button>
            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
                <div className="bg-white p-4 rounded shadow-md min-w-[300px] relative">
                  <button
                    className="absolute top-2 right-2"
                    onClick={() => setShowModal(false)}
                  >
                    ✕
                  </button>
                  <form onSubmit={(e) => { e.preventDefault(); addNote(); setShowModal(false); }}>
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full mb-2 border p-1 text-black"
                    />
                    <textarea
                      placeholder="Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="block w-full mb-2 border p-1 text-black"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
