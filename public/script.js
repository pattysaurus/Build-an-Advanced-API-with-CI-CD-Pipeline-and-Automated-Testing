const apiUrl = 'http://localhost:3000/notes';

document.addEventListener('DOMContentLoaded', () => {
    fetchNotes();
});

// Fetch all notes
async function fetchNotes() {
    showLoading();
    try {
        const response = await fetch(`${apiUrl}?userId=1`);
        const notes = await response.json();
        const notesContainer = document.getElementById('notes-container');
        notesContainer.innerHTML = '';

        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button onclick="openUpdateModal('${note._id}', '${note.title}', '${note.content}')">Edit</button>
                <button onclick="deleteNote('${note._id}')">Delete</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    } catch (error) {
        alert('Failed to fetch notes');
    } finally {
        hideLoading();
    }
}

// Add new note
async function addNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    showLoading();

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, userId: 1 })
    });

    if (response.ok) {
        fetchNotes();  // Refresh the notes list
    } else {
        alert('Failed to add note');
    }

    hideLoading();
}

// Open update modal with the existing note's data
function openUpdateModal(id, title, content) {
    document.getElementById('updateTitle').value = title;
    document.getElementById('updateContent').value = content;
    document.getElementById('updateModal').style.display = 'block';
    window.currentNoteId = id;  // Store the note ID to update it later
}

// Close update modal
function closeUpdateModal() {
    document.getElementById('updateModal').style.display = 'none';
}

// Update note
async function updateNote() {
    const title = document.getElementById('updateTitle').value;
    const content = document.getElementById('updateContent').value;

    showLoading();

    const response = await fetch(`${apiUrl}/${window.currentNoteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    });

    if (response.ok) {
        fetchNotes();  // Refresh the notes list
        closeUpdateModal();
    } else {
        alert('Failed to update note');
    }

    hideLoading();
}

// Delete note
async function deleteNote(id) {
    showLoading();

    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchNotes();  // Refresh the notes list
    } else {
        alert('Failed to delete note');
    }

    hideLoading();
}

// Show loading indicator
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Hide loading indicator
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}
