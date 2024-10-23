
import { useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';

import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
//import './hooksExercise.tsx';
//import ToggleTheme, { ClickCounter } from "./hooksExercise"; // M add export ClickCounter and file path
//import { themes } from './themeContext';
import { ThemeContext, themes } from "./ThemeContext";
//import LightSwitch from "./hooksExercise";
//import { useState, useEffect } from 'react';
import { useState } from 'react';
import ToggleTheme from "./hooksExercise";


export const StickyNotes = () => {
    // your code from App.tsx




    const [favorites, setFavorites] = useState<Note[]>([]);
    //update for create function
    const [notes, setNotes] = useState(dummyNotesList);
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
    };
    const [createNote, setCreateNote] = useState(initialNote);
    //const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
    };

    const removeNote = (note : Note) => {
        setNotes(notes.filter(noteTk => noteTk.id !== note.id));
    };

    return (

    <ThemeContext.Provider value={currentTheme}>

    <div className='app-container'>

    <form className="note-form" onSubmit={createNoteHandler}>
    <div>
    <input
    placeholder="Note Title"
    onChange={(event) =>
    setCreateNote({ ...createNote, title: event.target.value })}
    required>
    </input>
    </div>

    <div>
    <textarea
placeholder="Note Content"
onChange={(event) =>
setCreateNote({ ...createNote, content: event.target.value })}
required>
</textarea>
</div>

<div>

<select
onChange={(event) =>
setCreateNote({ ...createNote, label: event.target.value as Label })}
required>
<option value={Label.personal}>Personal</option>
<option value={Label.study}>Study</option>
<option value={Label.work}>Work</option>
<option value={Label.other}>Other</option>
</select>
</div>

<div><button type="submit">Create Note</button></div>

<div>
<h1>List of favorites:</h1>
{favorites.map((note) => (
<div key={note.id}>{note.title}</div>
))}
</div>

</form>

<div className="notes-grid">
{notes.map((note) => (
<div
key={note.id}

className="note-item"

style={{
background: currentTheme.background,
color: currentTheme.foreground,
}}>
<div className="notes-header">
<button onClick={() => {
if (favorites.includes(note)) {
const newFavorites = [...favorites];
newFavorites.splice(newFavorites.indexOf(note), 1);
setFavorites(newFavorites);
} else {
setFavorites([...favorites, note]);
}
}}>
{favorites.includes(note) ? (
<div>🧡</div>
) : (
<div style={{
color: currentTheme.foreground,
}}>
🤍
</div>
)}</button>

<button className="removeButton" onClick={() => removeNote(note)}>x</button>
</div>

<h2 contentEditable="true"> {note.title} </h2>
<p contentEditable="true"> {note.content } </p>
<select
value={note.label}

onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
const newLabel = event.target.value as Label;
const editNotes = notes.map(n => {
if (n.id == note.id) {
return {...n, label : newLabel};
}
else {
return n;
}
});
setNotes(editNotes);
}}
>
<option value={Label.personal}>Personal</option>
<option value={Label.study}>Study</option>
<option value={Label.work}>Work</option>
<option value={Label.other}>Other</option>
</select>

</div>
))}
</div>

<ToggleTheme setCurrentTheme={setCurrentTheme} />

</div>
</ThemeContext.Provider>

);

//export default App;
    
}