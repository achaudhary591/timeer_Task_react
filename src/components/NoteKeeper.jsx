import { useState } from 'react'

function NoteKeeper() {
  const [notes, setNotes] = useState([])
  const [noteText, setNoteText] = useState('')

  const addNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, {
        id: Date.now(),
        text: noteText,
        timestamp: new Date().toLocaleString()
      }])
      setNoteText('')
    }
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="section">
      <h2>📝 Quick Notes</h2>
      <div className="input-section">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write a quick note..."
          className="note-input"
          rows="3"
        />
        <button onClick={addNote} className="add-btn">Add Note</button>
      </div>

      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <div className="note-content">{note.text}</div>
            <div className="note-footer">
              <span className="note-timestamp">{note.timestamp}</span>
              <button 
                onClick={() => deleteNote(note.id)} 
                className="delete-btn"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="empty-state">No notes yet</p>
        )}
      </div>
    </div>
  )
}

export default NoteKeeper
