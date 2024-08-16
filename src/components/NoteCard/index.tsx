import { FilePenLine, Trash2 } from 'lucide-react';
import React from 'react';

interface NoteCardProps {
  note: {
    id: string;
    content: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <p className="text-gray-800 mb-4">{note.content}</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onEdit}
        >
          <FilePenLine className="text-purple"/>
        </button>
        <button
          onClick={onDelete}
        >
          <Trash2 className="text-red"/>
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
