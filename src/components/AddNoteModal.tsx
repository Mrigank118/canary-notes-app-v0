import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Note } from '@/hooks/useNotes';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  editingNote?: Note | null;
}

export default function AddNoteModal({ isOpen, onClose, onSave, editingNote }: AddNoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote, isOpen]);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave(title, content);
      setTitle('');
      setContent('');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-card-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-card-border">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-display text-card-foreground">
              {editingNote ? 'Edit Note' : 'New Note'}
            </h2>
            <button
              onClick={onClose}
              className="btn-ghost p-2 rounded-full"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <input
            ref={titleInputRef}
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-xl font-display bg-transparent border-none outline-none placeholder-muted-foreground text-card-foreground"
          />
          
          <textarea
            placeholder="Start writing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={12}
            className="w-full bg-transparent border-none outline-none resize-none placeholder-muted-foreground text-card-foreground leading-relaxed"
          />
        </div>
        
        <div className="p-6 border-t border-card-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-ghost"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
          >
            {editingNote ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}