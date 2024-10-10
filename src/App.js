import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const ToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const addOrUpdateNote = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      if (editIndex !== null) {
        const updatedNotes = notes.map((note, index) =>
          index === editIndex ? noteText : note
        );
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        setNotes([...notes, noteText]);
      }
      setNoteText('');
    }
  };

  const editNote = (index) => {
    setNoteText(notes[index]);
    setEditIndex(index);
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <div className={`App ${theme}`}>
      <div className="theme-toggle">
        <input
          type="checkbox"
          id="themeToggle"
          checked={theme === 'dark'}
          onChange={ToggleTheme}
        />
        <label htmlFor="themeToggle">
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </label>
      </div>

      <h1>Notes</h1>

      <form className="note-input" onSubmit={addOrUpdateNote}>
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter your note here"
          aria-label="Note input"
        />
        <button type="submit">
          {editIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      <ul className="notes-list">
        {notes.map((note, index) => (
          <li key={index} className="note">
            <p>{note}</p>
            <div className="note-actions">
              <button onClick={() => editNote(index)} aria-label={`Edit note ${index + 1}`}>
                Edit
              </button>
              <button onClick={() => deleteNote(index)} aria-label={`Delete note ${index + 1}`}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
