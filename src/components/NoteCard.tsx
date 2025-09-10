import { Note } from '@/hooks/useNotes';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export default function NoteCard({ note, onClick, onDelete }: NoteCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getPreview = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="note-card group" onClick={onClick}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-display text-lg text-card-foreground truncate flex-1">
          {note.title}
        </h3>
        <button
          onClick={onDelete}
          className="btn-danger opacity-0 group-hover:opacity-100 ml-2 text-xs"
          aria-label="Delete note"
        >
          Delete
        </button>
      </div>
      
      {note.content && (
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
          {getPreview(note.content)}
        </p>
      )}
      
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Created {formatDate(note.createdAt)}</span>
        {note.updatedAt.getTime() !== note.createdAt.getTime() && (
          <span>Edited {formatDate(note.updatedAt)}</span>
        )}
      </div>
    </div>
  );
}