import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firestore";

const AddWordForm = () => {
  const [englishWord, setEnglishWord] = useState('');
  const [turkishMeaning, setTurkishMeaning] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [pronunciationURL, setPronunciationURL] = useState('');

  const ref = collection(db, "words");

  const handleAddWord = async () => {
    console.log('Kelime başarıyla eklendi:', {
      englishWord,
      turkishMeaning,
      exampleSentence,
      imageURL,
      pronunciationURL
    });

    try {
      await addDoc(ref, {
        englishWord: englishWord,
        turkishMeaning: turkishMeaning, // Türkçe kelimenin yazımı burada "turkhis" olarak yazılmış, "turkish" olmalı
        exampleSentence: exampleSentence,
        imageURL: imageURL,
        pronunciationURL: pronunciationURL
      });
      // Ekledikten sonra inputları temizle
      setEnglishWord('');
      setTurkishMeaning('');
      setExampleSentence('');
      setImageURL('');
      setPronunciationURL('');
    } catch (error) {
      console.error('Kelime ekleme hatası:', error);
    }
  };
  return (
    <div>
      <h2>Kelime Ekleme Formu</h2>
      <label>
        İngilizce Kelime:
        <input
          type="text"
          value={englishWord}
          onChange={(e) => setEnglishWord(e.target.value)}
        />
      </label>
      <br />
      <label>
        Türkçe Anlamı:
        <input
          type="text"
          value={turkishMeaning}
          onChange={(e) => setTurkishMeaning(e.target.value)}
        />
      </label>
      <br />
      <label>
        Örnek Cümle (İngilizce):
        <input
          type="text"
          value={exampleSentence}
          onChange={(e) => setExampleSentence(e.target.value)}
        />
      </label>
      <br />
      <label>
        Resim URL:
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </label>
      <br />
      <label>
        Sesli Okunuş URL:
        <input
          type="text"
          value={pronunciationURL}
          onChange={(e) => setPronunciationURL(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleAddWord}>Kelimeyi Ekle</button>
    </div>
  );
};

export default AddWordForm;



// import React, { useState } from 'react';

// const AddWordForm = () => {
//   const [englishWord, setEnglishWord] = useState('');
//   const [turkishMeaning, setTurkishMeaning] = useState('');
//   const [exampleSentence, setExampleSentence] = useState('');
//   const [imageURL, setImageURL] = useState('');
//   const [pronunciationURL, setPronunciationURL] = useState('');

//   const handleAddWord = () => {
//     console.log('Eklenen Kelime:', {
//       englishWord,
//       turkishMeaning,
//       exampleSentence,
//       imageURL,
//       pronunciationURL
//     });
//     setEnglishWord('');
//     setTurkishMeaning('');
//     setExampleSentence('');
//     setImageURL('');
//     setPronunciationURL('');
//   };

//   return (
//     <div>
//       <h2>Kelime Ekleme Formu</h2>
//       <label>
//         İngilizce Kelime:
//         <input
//           type="text"
//           value={englishWord}
//           onChange={(e) => setEnglishWord(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Türkçe Anlamı:
//         <input
//           type="text"
//           value={turkishMeaning}
//           onChange={(e) => setTurkishMeaning(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Örnek Cümle (İngilizce):
//         <input
//           type="text"
//           value={exampleSentence}
//           onChange={(e) => setExampleSentence(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Resim URL:
//         <input
//           type="text"
//           value={imageURL}
//           onChange={(e) => setImageURL(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Sesli Okunuş URL:
//         <input
//           type="text"
//           value={pronunciationURL}
//           onChange={(e) => setPronunciationURL(e.target.value)}
//         />
//       </label>
//       <br />
//       <button onClick={handleAddWord}>Kelimeyi Ekle</button>
//     </div>
//   );
// };

// export default AddWordForm;