import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from 'next/router';
import { db, auth } from "../../firebase";
import MenuBar from "@/components/customMenuBar/customMenuBar";

const AddWordForm = () => {
  const [englishWord, setEnglishWord] = useState('');
  const [turkishMeaning, setTurkishMeaning] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  const [exampleSentence2, setExampleSentence2] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [pronunciationURL, setPronunciationURL] = useState('');
  const [wordSubject, setWordSubject] = useState('noun'); // Default olarak isim seçeneğini varsayalım

  const ref = collection(db, "words");
  const router = useRouter();

  const handleAddWord = async () => {
    try {
      const user = auth.currentUser;
      if (user !== null) {
        await addDoc(ref, {
          englishWord: englishWord,
          turkishMeaning: turkishMeaning,
          exampleSentence: exampleSentence,
          exampleSentence2: exampleSentence2,
          imageURL: imageURL,
          pronunciationURL: pronunciationURL,
          wordSubject: wordSubject,
          userEmail: user.email,
          theKnownCount: 0,
          theShownDay: 0,
          theShownMonth: 0,
          theShownYear: 0,
        });

        setEnglishWord('');
        setTurkishMeaning('');
        setExampleSentence('');
        setExampleSentence2('');
        setImageURL('');
        setPronunciationURL('');
        setWordSubject('noun'); // Default olarak isim seçeneğini sıfırla
      } else {
        console.error('Oturum açmış bir kullanıcı bulunamadı.');
      }
    } catch (error) {
      console.error('Kelime ekleme hatası:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#00008b', display: 'flex' }}>
      <MenuBar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flex: '1',
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e90ff'
        }}>
          <h2 style={{ textAlign: 'center', color: '#fff' }}>Kelime Ekleme Formu</h2>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>İngilizce Kelime:</label>
              <input
                type="text"
                value={englishWord}
                onChange={(e) => setEnglishWord(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Türkçe Anlamı:</label>
              <input
                type="text"
                value={turkishMeaning}
                onChange={(e) => setTurkishMeaning(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Örnek Cümle (İngilizce):</label>
              <input
                type="text"
                value={exampleSentence}
                onChange={(e) => setExampleSentence(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Örnek Cümle2 (İngilizce):</label>
              <input
                type="text"
                value={exampleSentence2}
                onChange={(e) => setExampleSentence2(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Resim URL:</label>
              <input
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Sesli Okunuş URL:</label>
              <input
                type="text"
                value={pronunciationURL}
                onChange={(e) => setPronunciationURL(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Kelime Türü:</label>
              <select
                value={wordSubject}
                onChange={(e) => setWordSubject(e.target.value)}
                style={{ flex: '1' }}
              >
                <option value="noun">İsim</option>
                <option value="adjective">Sıfat</option>
                <option value="pronoun">Zamir</option>
              </select>
            </div>
            {/* Diğer input alanları burada... */}
          </div>
          <button 
            style={{ width: '100%', marginBottom: '10px', backgroundColor: '#00008b', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px' }} 
            onClick={handleAddWord}
          >
            Kelimeyi Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWordForm;










/*import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from 'next/router';
import { db,auth } from "../../firebase";
import MenuBar from "@/components/customMenuBar/customMenuBar";

const AddWordForm = () => {
  const [englishWord, setEnglishWord] = useState('');
  const [turkishMeaning, setTurkishMeaning] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  const [exampleSentence2, setExampleSentence2] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [pronunciationURL, setPronunciationURL] = useState('');
  const [uploadedImageURL, setUploadedImageURL] = useState('');
  const [wordSubject, setWordSubject] = useState(''); // Yeni alan

  const ref = collection(db, "words");
  const router = useRouter();

  const handleAddWord = async () => {
    console.log('Kelime başarıyla eklendi:', {
      englishWord,
      turkishMeaning,
      exampleSentence,
      exampleSentence2,
      imageURL,
      pronunciationURL,
      uploadedImageURL,
      wordSubject // Yeni alanın loglanması
    });

    try {
      const user = auth.currentUser;
      if (user !== null) {
        await addDoc(ref, {
          englishWord: englishWord,
          turkishMeaning: turkishMeaning,
          exampleSentence: exampleSentence,
          exampleSentence2: exampleSentence2,
          imageURL: imageURL,
          pronunciationURL: pronunciationURL,
          uploadedImageURL: uploadedImageURL,
          wordSubject: wordSubject, // Yeni alanın Firestore'a eklenmesi
          userEmail: user.email,
          theKnownCount: 0, // Başlangıç değeri
          theShownDay: 0, // Başlangıç değeri
          theShownMonth: 0, // Başlangıç değeri
          theShownYear: 0, // Başlangıç değeri
        });

        setEnglishWord('');
        setTurkishMeaning('');
        setExampleSentence('');
        setExampleSentence2('');
        setImageURL('');
        setPronunciationURL('');
        setUploadedImageURL('');
        setWordSubject(''); // Yeni alanın sıfırlanması
      } else {
        console.error('Oturum açmış bir kullanıcı bulunamadı.');
      }
    } catch (error) {
      console.error('Kelime ekleme hatası:', error);
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#00008b', display: 'flex' }}>
      <MenuBar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flex: '1',
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e90ff'
        }}>
          <h2 style={{ textAlign: 'center', color: '#fff' }}>Kelime Ekleme Formu</h2>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>İngilizce Kelime:</label>
              <input
                type="text"
                value={englishWord}
                onChange={(e) => setEnglishWord(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Türkçe Anlamı:</label>
              <input
                type="text"
                value={turkishMeaning}
                onChange={(e) => setTurkishMeaning(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Örnek Cümle (İngilizce):</label>
              <input
                type="text"
                value={exampleSentence}
                onChange={(e) => setExampleSentence(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Örnek Cümle2 (İngilizce):</label>
              <input
                type="text"
                value={exampleSentence2}
                onChange={(e) => setExampleSentence2(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Konu:</label>
              <input
                type="text"
                value={wordSubject}
                onChange={(e) => setWordSubject(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Resim URL:</label>
              <input
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Sesli Okunuş URL:</label>
              <input
                type="text"
                value={pronunciationURL}
                onChange={(e) => setPronunciationURL(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
          </div>
          <button 
            style={{ width: '100%', marginBottom: '10px', backgroundColor: '#00008b', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px' }} 
            onClick={handleAddWord}
          >
            Kelimeyi Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWordForm;

*/