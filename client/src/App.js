import './App.css';
import React, { useState } from 'react'

function NotesList() {
    const [notes, setNotes] = useState(1)

    return (
        <div className="Notes-list">
            <ul className="collection">
            
            <li className="collection-item">test</li>
            </ul>
        </div>
    )
}

function App() {
  return (
    <div className="App">
        <header className="App-header">
            Ryan's React Playground!
            <div className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>button</div>
            <NotesList />
        </header>
    </div>
  );
}

export default App;
