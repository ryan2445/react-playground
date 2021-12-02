import './App.css'
import { useState } from 'react'
import { Button, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'

function NotesList() {
    var [notes, setNotes] = useState([])
    var [editing, setEditing] = useState(false)
    var [tempNote, setTempNote] = useState('')

    function keyPressed(key) {
        if (key.keyCode === 13) {
            setNotes([...notes, tempNote])
            setEditing(false)
            setTempNote('')
        }
    }

    function textFieldChanged(event) {
        setTempNote(event.target.value)
    }

    function clearTempNote() {
        setTempNote('')
        setEditing(false)
    }

    function removeItem(index) {
        if (notes.length === 1) return setNotes([])

        var temp = notes.splice(index, 1)

        console.log(temp)
    }

    return (
        <div>
            <div className="listItems">
                <hr style={{ border: '1px solid grey' }}></hr>
                {notes.map((note, i) => (
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
                                    onClick={() => removeItem(i)}
                                >
                                    <CloseIcon fontSize="small"></CloseIcon>
                                </IconButton>
                            </div>
                        </div>
                        <hr style={{ border: '1px solid grey' }}></hr>
                    </div>
                ))}
            </div>
            {editing && (
                <div
                    className="textField"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '10px',
                        margin: 'auto'
                    }}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        autoFocus
                        fullWidth
                        onKeyUp={keyPressed}
                        onChange={textFieldChanged}
                    />
                    <div style={{ alignSelf: 'center', paddingLeft: '5px' }}>
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
                    style={{
                        borderRadius: '50px',
                        minWidth: '38px',
                        paddingLeft: '0px',
                        paddingRight: '0px'
                    }}
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
