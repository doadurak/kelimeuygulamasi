import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from 'next/router';
import { db } from "../../firestore";
import { auth } from '../../firebase';

const AddWordForm = () => {
  const [englishWord, setEnglishWord] = useState('');
  const [turkishMeaning, setTurkishMeaning] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [pronunciationURL, setPronunciationURL] = useState('');
  const [uploadedImageURL, setUploadedImageURL] = useState('');

  const ref = collection(db, "words");
  const router = useRouter();

  const handleAddWord = async () => {
    console.log('Kelime başarıyla eklendi:', {
      englishWord,
      turkishMeaning,
      exampleSentence,
      imageURL,
      pronunciationURL,
      uploadedImageURL
    });

    try {
      const user = auth.currentUser;
      if (user !==null) {
      await addDoc(ref, {
        englishWord: englishWord,
        turkishMeaning: turkishMeaning,
        exampleSentence: exampleSentence,
        imageURL: imageURL,
        pronunciationURL: pronunciationURL,
        uploadedImageURL: uploadedImageURL,
        userEmail: user.email
      });

     
      setEnglishWord('');
      setTurkishMeaning('');
      setExampleSentence('');
      setImageURL('');
      setPronunciationURL('');
      setUploadedImageURL(''); 
    }else {
      console.error('Oturum açmış bir kullanıcı bulunamadı.');
    }
  }catch (error) {
      console.error('Kelime ekleme hatası:', error);
    }
  };
  

  const handleLogout = () => {
    router.push('/login'); 
  };

  const handleQuiz = () => {
    router.push('/quiz'); 
  };

  const handleAddWordPage = () => {
    router.push('/add-word'); 
  };

  const handleSettings = () => {
    router.push('/settings'); 
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#00008b', display: 'flex' }}>
      <div style={{
        width: '200px',
        backgroundColor: '#1e90ff',
        padding: '20px',
        position: 'fixed',
        left: '0',
        top: '0',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
        <h1 style={{ color: '#fff', marginBottom: '20px', textAlign: 'left' }}>Kelime Sitesi</h1>
        <ul style={{
          listStyle: 'none',
          padding: '0',
          width: '100%',
          textAlign: 'left',
        }}>
          <li style={{ marginBottom: '20px', width: '100%' }}>
            <div style={{ border: '2px solid #00008b', padding: '6px', borderRadius: '8px', width: '100%' }}>
              <a href="#" onClick={handleQuiz} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <img src="/sinav.png" alt="Quiz" style={{ width: '20px', marginRight: '10px' }} />
                Quiz
              </a>
            </div>
          </li>
          <li style={{ marginBottom: '20px', width: '100%' }}>
            <div style={{ border: '2px solid #00008b', padding: '6px', borderRadius: '8px', width: '100%' }}>
              <a href="#" onClick={handleAddWordPage} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <img src="/ekleme.png" alt="Add Word" style={{ width: '20px', marginRight: '10px' }} />
                Kelime Ekleme
              </a>
            </div>
          </li>
          <li style={{ marginBottom: '20px', width: '100%' }}>
            <div style={{ border: '2px solid #00008b', padding: '6px', borderRadius: '8px', width: '100%' }}>
              <a href="#" onClick={handleSettings} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <img src="/ayarlar.png" alt="Settings" style={{ width: '20px', marginRight: '10px' }} />
                Ayarlar
              </a>
            </div>
          </li>
        </ul>
        <div style={{ width: '100%', textAlign: 'left', marginTop: '420px' }}>
          <div style={{ border: '2px solid #00008b', padding: '6px', borderRadius: '8px', width: '100%' }}>
            <a href="#" onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <img src="/cikis.png" alt="Logout" style={{ width: '20px', marginRight: '10px' }} />
              Çıkış
            </a>
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flex: '1',
        marginLeft: '200px',
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

// import React, { useState } from 'react';
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../../firestore";

// const AddWordForm = () => {
//   const [englishWord, setEnglishWord] = useState('');
//   const [turkishMeaning, setTurkishMeaning] = useState('');
//   const [exampleSentence, setExampleSentence] = useState('');
//   const [imageURL, setImageURL] = useState('');
//   const [pronunciationURL, setPronunciationURL] = useState('');

//   const ref = collection(db, "words");

//   const handleAddWord = async () => {
//     console.log('Kelime başarıyla eklendi:', {
//       englishWord,
//       turkishMeaning,
//       exampleSentence,
//       imageURL,
//       pronunciationURL
//     });

//     try {
//       await addDoc(ref, {
//         englishWord: englishWord,
//         turkishMeaning: turkishMeaning,
//         exampleSentence: exampleSentence,
//         imageURL: imageURL,
//         pronunciationURL: pronunciationURL
//       });
     
//       setEnglishWord('');
//       setTurkishMeaning('');
//       setExampleSentence('');
//       setImageURL('');
//       setPronunciationURL('');
//     } catch (error) {
//       console.error('Kelime ekleme hatası:', error);
//     }
//   };

//   return (
//     <div style={{
//       backgroundColor: '#00008b',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',
//     }}> 
//       <div style={{
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         maxWidth: '400px',
//         margin: '0 auto',
//         padding: '20px',
//         border: '1px solid #ccc',
//         borderRadius: '8px',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#1e90ff' 
//       }}>
//         <h2 style={{ textAlign: 'center', color: '#fff' }}>Kelime Ekleme Formu</h2>
//         <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '10px' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//             <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>İngilizce Kelime:</label>
//             <input
//               type="text"
//               value={englishWord}
//               onChange={(e) => setEnglishWord(e.target.value)}
//               style={{ flex: '1' }}
//             />
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//             <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Türkçe Anlamı:</label>
//             <input
//               type="text"
//               value={turkishMeaning}
//               onChange={(e) => setTurkishMeaning(e.target.value)}
//               style={{ flex: '1' }}
//             />
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//             <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Örnek Cümle (İngilizce):</label>
//             <input
//               type="text"
//               value={exampleSentence}
//               onChange={(e) => setExampleSentence(e.target.value)}
//               style={{ flex: '1' }}
//             />
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//             <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Resim URL:</label>
//             <input
//               type="text"
//               value={imageURL}
//               onChange={(e) => setImageURL(e.target.value)}
//               style={{ flex: '1' }}
//             />
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//             <label style={{ color: '#fff', marginRight: '10px', flex: '0 0 40%' }}>Sesli Okunuş URL:</label>
//             <input
//               type="text"
//               value={pronunciationURL}
//               onChange={(e) => setPronunciationURL(e.target.value)}
//               style={{ flex: '1' }}
//             />
//           </div>
//         </div>
//         <button 
//           style={{ width: '100%', marginBottom: '10px', backgroundColor: '#00008b', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px' }} 
//           onClick={handleAddWord}
//         >
//           Kelimeyi Ekle
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddWordForm;
