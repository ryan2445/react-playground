import './App.css'
import { useState, useEffect } from 'react'
import { Button, IconButton, TextField, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'

function NotesList() {
    var [notes, setNotes] = useState([])
    var [editing, setEditing] = useState(false)
    var [tempNote, setTempNote] = useState('')
    var [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(
            'https://9hdsbfgql2.execute-api.us-west-2.amazonaws.com/Prod/notes',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                setNotes(data.notes)
                setLoading(false)
            })
    }, [])

    function keyPressed(key) {
        if (key.keyCode === 13) {
            var temp = [...notes, tempNote]
            setNotes(temp)
            setEditing(false)
            setTempNote('')
            saveNotes(temp)
        }
    }

    function textFieldChanged(event) {
        setTempNote(event.target.value)
    }

    function clearTempNote() {
        setTempNote('')
        setEditing(false)
    }

    function removeItem(toRemove) {
        var temp = []
        if (notes.length !== 1) temp = notes.filter(note => note !== toRemove)
        setNotes(temp)
        saveNotes(temp)
    }

    function saveNotes(notes) {
        fetch(
            'https://9hdsbfgql2.execute-api.us-west-2.amazonaws.com/Prod/notes',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ notes: notes })
            }
        )
    }

    return (
        <div>
            <div className="listItems">
                <hr style={{ border: '1px solid grey' }}></hr>
                {loading ? (
                    <CircularProgress />
                ) : (
                    notes.map((note, i) => (
                        <div key={i}>
                            <div className="listItem">
                                <div>{note}</div>
                                <div
                                    style={{
                                        alignSelf: 'center',
                                        paddingLeft: '5px'
                                    }}
                                >
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => removeItem(note)}
                                    >
                                        <CloseIcon fontSize="small"></CloseIcon>
                                    </IconButton>
                                </div>
                            </div>
                            <hr style={{ border: '1px solid grey' }}></hr>
                        </div>
                    ))
                )}
            </div>
            {editing && (
                <div
                    className="textField"
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        autoFocus
                        fullWidth
                        onKeyUp={keyPressed}
                        onChange={textFieldChanged}
                    />
                    <div className="deleteButton">
                        <IconButton
                            color="error"
                            size="small"
                            onClick={() => clearTempNote()}
                        >
                            <CloseIcon fontSize="small"></CloseIcon>
                        </IconButton>
                    </div>
                </div>
            )}
            <div style={{ paddingTop: '15px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditing(true)}
                    disabled={editing}
                >
                    <AddIcon></AddIcon>
                </Button>
            </div>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ paddingBottom: '15px' }}>Notes List</div>
                <NotesList />
            </header>
        </div>
    )
}

export default App
