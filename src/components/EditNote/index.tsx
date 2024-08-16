import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  initialValue: string;
}

const EditModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, initialValue }) => {
  const [value, setValue] = React.useState(initialValue);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div 
        className="bg-white rounded-lg p-5 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Edit Note</h2>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border rounded p-3 w-full mb-2 h-24 focus:outline-none focus:border-purple resize-none"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-3 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-purple text-white px-3 py-2 rounded hover:bg-[#BEADFF]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
