'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardContent() {
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');

  const addNote = async () => {
    // TODO: Implement API call to save note
    console.log('Adding note:', note);
    setNote('');
  };

  const addBookmark = async () => {
    // TODO: Implement API call to save bookmark
    console.log('Adding bookmark:', url);
    setUrl('');
  };

  return (
    <div>
      <div>
        <h2>Add Note</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter your note here"
        />
        <button onClick={addNote}>Save Note</button>
      </div>
      <div>
        <h2>Add Bookmark</h2>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL here"
        />
        <button onClick={addBookmark}>Save Bookmark</button>
      </div>
      <Link href="/chatbot">Go to Chatbot</Link>
    </div>
  );
}