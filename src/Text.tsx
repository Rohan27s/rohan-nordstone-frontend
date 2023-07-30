import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase'; // Import the firestore instance from your existing firebase.ts file
import './Text.css';

type Props = {};

const Text: React.FC<Props> = () => {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');

  // Reference to the Firestore collection
  const textCollectionRef = collection(firestore, 'texts');

  // Function to save the text to Firestore
  const saveText = async () => {
    try {
      await addDoc(textCollectionRef, {
        text: text,
      });
      setText('');
    } catch (error) {
      console.error('Error saving text:', error);
    }
  };

  // Function to fetch and listen for changes in the text collection
  useEffect(() => {
    const unsubscribe = onSnapshot(textCollectionRef, (snapshot) => {
      const texts: string[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        texts.push(data.text);
      });
      setSavedText(texts.join('\n'));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="text-container">
      <h2>Write Text</h2>
      <textarea
        className="text-input"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="send-button" onClick={saveText}>
        Send
      </button>
      <h3>Saved Text</h3>
      <pre className="saved-text">{savedText}</pre>
    </div>
  );
};

export default Text;
