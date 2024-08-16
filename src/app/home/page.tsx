"use client";
import React, { useState, useEffect } from 'react';
import NoteCard from '@/components/NoteCard'
import EditModal from '@/components/EditNote';
import Image from 'next/image';
import EmptyImg from "../../../public/images/emptynote.png";
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { db } from "../../../firebase";
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  getDocs, 
  deleteDoc } from "@firebase/firestore";

const Home: React.FC = () => {
  const [notes, setNotes] = useState<{ id: string; content: string }[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number | null>(null);
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isDeletingNote, setIsDeletingNote] = useState(false);

  const handleEdit = (index: number) => {
    setCurrentNoteIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveNote = async (value: string) => {
    if (currentNoteIndex !== null) {
      setIsSavingNote(true);
      try {
        const noteDoc = doc(db, 'notes', notes[currentNoteIndex].id);
        await updateDoc(noteDoc, {
          content: value,
        });
  
        const updatedNotes = [...notes];
        updatedNotes[currentNoteIndex].content = value;
        setNotes(updatedNotes);
      } catch (e) {
        console.error('Error updating document: ', e);
      } finally {
        setIsSavingNote(false);
      }
    }
  };

  const handleDelete = async (index: number) => {
    setIsDeletingNote(true);
    try {
      const noteDoc = doc(db, 'notes', notes[index].id);
      await deleteDoc(noteDoc);
  
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
    } catch (e) {
      console.error('Error deleting document: ', e);
    } finally {
      setIsDeletingNote(false);
    }
  };

  const fetchNotes = async () => {
    setIsFetchingNotes(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'notes'));
      const notesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        content: doc.data().content,
      }));
      setNotes(notesList);
    } catch (e) {
      console.error('Error fetching documents: ', e);
    } finally {
      setIsFetchingNotes(false);
    }
  };
  
  
  useEffect(() => {
    fetchNotes();
  }, []);
  
  const handleAddNote = async () => {
    if (newNote.trim()) {
      setIsAddingNote(true);
      try {
        const docRef = await addDoc(collection(db, 'notes'), {
          content: newNote,
          createdAt: new Date(),
        });
        setNotes([...notes, { id: docRef.id, content: newNote }]);
        setNewNote('');
      } catch (e) {
        console.error('Error adding document: ', e);
      } finally {
        setIsAddingNote(false);
      }
    }
  };  

  return (
    <>
      <header className='px-4 h-[50px] w-full flex justify-between items-center bg-[#fafafa] shadow-sm'>
        <Link href="/home">
          <h1 className='cursor-pointer text-xl'>Note<span className='text-purple'>App</span></h1>
        </Link>

        <Link href="/">
          <LogOut />
        </Link>
      </header>
      <div className="my-6 w-full flex flex-col justify-center items-center p-2">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your note"
          className="border rounded p-3 w-full sm:max-w-[400px] mb-2 h-24 focus:outline-none focus:border-purple resize-none"
        />
        <div className='flex items-center justify-center'>
          <button
            onClick={handleAddNote}
            disabled={isAddingNote}
            className="bg-purple text-white px-3 py-2 rounded hover:bg-[#BEADFF]"
          >
            {isAddingNote ? 'Adding...' : 'Create New Note'}
          </button>
        </div>
      </div>

      <div>
        {notes.length > 0 ? (
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
            {notes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </div>
        ) : (
          <div className='w-full h-[400px] flex flex-col items-center justify-center'>
            <Image 
              src={EmptyImg}
              alt="empty-note"
              width="300"
              className=""
            />
            <h2 className='text-center text-purple font-semibold text-lg'>Create and edit notes in real time with no dime </h2>
            <p className='text-center mt-2'>No notes yet</p>
          </div>
        )}
      </div>
      {currentNoteIndex !== null && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNote}
          initialValue={notes[currentNoteIndex].content}
        />
      )}
    </>
  );
};

export default Home;