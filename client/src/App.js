import "./App.css";
import { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function NotesList() {
  var [notes, setNotes] = useState([]);
  var [editing, setEditing] = useState(false);
  var [tempNote, setTempNote] = useState("");

  function keyPressed(key) {
    if (key.keyCode == 13) {
      setNotes([...notes, tempNote]);
      setEditing(false);
    }
  }

  function textFieldChanged(event) {
    setTempNote(event.target.value);
  }

  function clearTempNote() {
    setTempNote("");
    setEditing(false);
  }

  return (
    <div>
      <div>
        <hr style={{ border: "1px solid grey" }}></hr>
        {notes.map((note, i) => (
          <div key={i}>
            <div>{note}</div>
            <hr style={{ border: "1px solid grey" }}></hr>
          </div>
        ))}
      </div>
      {editing && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "340px",
            paddingTop: "10px",
          }}
        >
          <TextField
            variant="outlined"
            autoFocus
            fullWidth
            onKeyUp={keyPressed}
            onChange={textFieldChanged}
          />
          <div style={{ alignSelf: "center", paddingLeft: "5px" }}>
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
      <div style={{ paddingTop: "15px" }}>
        <Button
          style={{
            borderRadius: "50px",
            minWidth: "38px",
            paddingLeft: "0px",
            paddingRight: "0px",
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
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ paddingBottom: "15px" }}>Notes List</div>
        <NotesList />
      </header>
    </div>
  );
}

export default App;
