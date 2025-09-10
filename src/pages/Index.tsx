import { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { useNotes } from '@/hooks/useNotes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NoteCard from '@/components/NoteCard';
import AddNoteModal from '@/components/AddNoteModal';
import type { Note } from '@/hooks/useNotes';

const Index = () => {
  const { notes, addNote, updateNote, deleteNote, searchNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const filteredNotes = searchNotes(searchQuery);

  const handleAddNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (title: string, content: string) => {
    if (editingNote) {
      updateNote(editingNote.id, title, content);
    } else {
      addNote(title, content);
    }
  };

  const handleDeleteNote = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                  <FileText className="w-12 h-12 text-muted-foreground" strokeWidth={1} />
                </div>
              </div>
              <h2 className="text-2xl font-display text-card-foreground mb-2">
                {searchQuery ? 'No notes found' : 'No notes yet'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? 'Try a different search term or create a new note.'
                  : 'Create your first note to get started.'
                }
              </p>
              {!searchQuery && (
                <button
                  onClick={handleAddNote}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors font-medium"
                >
                  Create Note
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onClick={() => handleEditNote(note)}
                  onDelete={(e) => handleDeleteNote(e, note.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Floating Action Button */}
      <button
        onClick={handleAddNote}
        className="fab"
        aria-label="Add new note"
      >
        <Plus className="w-6 h-6" strokeWidth={2} />
      </button>

      {/* Add/Edit Note Modal */}
      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />
    </div>
  );
};

export default Index;