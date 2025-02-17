const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public'));


// Basic route for testing
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//setting up mongo db connection

const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/notesDB", {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Database connection error:", err);
});

//setting up mongo db  schema for connection

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create the Note model
const Note = mongoose.model("Note", noteSchema);


//code for adding new note
app.post("/notes", async (req, res) => {
    const { title, content, userId } = req.body;
    try {
        const note = new Note({ title, content, userId });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send({ error: "Failed to create note" });
    }
});

//retrieving all notes by the user

app.get("/notes", async (req, res) => {
    const { userId } = req.query;
    try {
        const notes = await Note.find({ userId });
        res.status(200).send(notes);
    } catch (error) {
        res.status(400).send({ error: "Failed to retrieve notes" });
    }
});


//get notes by a particular id
app.get("/notes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if (!note) return res.status(404).send({ error: "Note not found" });
        res.status(200).send(note);
    } catch (error) {
        res.status(400).send({ error: "Failed to retrieve note" });
    }
});

//updation of an existing note
app.put("/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const note = await Note.findByIdAndUpdate(
            id,
            { title, content, updatedAt: Date.now() },
            { new: true }
        );
        if (!note) return res.status(404).send({ error: "Note not found" });
        res.status(200).send(note);
    } catch (error) {
        res.status(400).send({ error: "Failed to update note" });
    }
});


//delation of notes
app.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findByIdAndDelete(id);
        if (!note) return res.status(404).send({ error: "Note not found" });
        res.status(200).send({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(400).send({ error: "Failed to delete note" });
    }
});
