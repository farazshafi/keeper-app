import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function Main() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem('notes', JSON.stringify(updatedNotes))
      return updatedNotes
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter((noteItem, index) => index !== id);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  }

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default Main;