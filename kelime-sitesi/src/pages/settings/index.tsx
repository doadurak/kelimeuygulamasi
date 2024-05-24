import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'; 
import { auth, db } from "../../firebase";
import { useState, useEffect } from 'react';
import MenuBar from "@/components/customMenuBar/customMenuBar";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { collection, getDocs, query, where } from 'firebase/firestore'; 


Chart.register(ArcElement, Tooltip, Legend);


type Word = {
  id: string;
  englishWord: string;
  englishDescription: string;
  turkishMeaning: string;
  turkishTranslation: string;
  theKnownCount: number;
  theShownDay: number;
  theShownMonth: number;
  theShownYear: number;
  imageURL: string;
  exampleSentence: string;
  exampleSentence2: string;
  userEmail: string;
  knownDate: string;
  wordSubject: string;
};

type UserData = {
  firstName: string;
  lastName: string;
  birthdate: string;
  gender: string;
  email: string;
  
};

const Settings = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userExists, setUserExists] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [nounCount, setNounCount] = useState<number>(0);
  const [adjectiveCount, setAdjectiveCount] = useState<number>(0);
  const [verbCount, setVerbCount] = useState<number>(0);
  const [addedWord, setAddedWord] = useState<Word[]>([]);

  const userQuery = user ? query(collection(db, 'users'), where('email', '==', user.email)) : null;
  const [userDataSnapshot, userLoading, userError] = useCollection(userQuery);

  useEffect(() => {
    if (!user || !userDataSnapshot) return;

    if (userDataSnapshot.empty) {
      setUserExists(false);
      return;
    }

    const userDataArray = userDataSnapshot.docs.map(doc => doc.data() as UserData);
    setUserData(userDataArray[0]);
  }, [user, userDataSnapshot]);

  useEffect(() => {
    const fetchWords = async () => {
      if (user) {
        const wordsQuery = query(collection(db, 'words'), where('userEmail', '==', user.email));
        const wordsSnapshot = await getDocs(wordsQuery);
        const wordsArray = wordsSnapshot.docs.map(doc => doc.data() as Word);
        setAddedWord(wordsArray);
      }
    };
    
    fetchWords();
  }, [user]);

  useEffect(() => {
    if (addedWord.length > 0) {
      let noun = 0;
      let adjective = 0;
      let verb = 0;

      addedWord.forEach(word => {
        switch (word.wordSubject) {
          case 'noun':
            noun += word.theKnownCount;
            break;
          case 'adjective':
            adjective += word.theKnownCount;
            break;
          case 'verb':
            verb += word.theKnownCount;
            break;
          default:
            break;
        }
      });

      setNounCount(noun);
      setAdjectiveCount(adjective);
      setVerbCount(verb);
    }
  }, [addedWord]);

  const data = {
    labels: ['İsim', 'Sıfat', 'Fiil'],
    datasets: [
      {
        label: 'Doğru Bilinen Kelimeler',
        data: [nounCount, adjectiveCount, verbCount],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
        hoverBackgroundColor: ['#66bb6a', '#e57373', '#64b5f6'],
      },
    ],
  };

  const handlePrint = () => {
    window.print();
  };


  if (loading || userLoading) return <div>Loading...</div>;
  if (error || userError) return <div>Error: {error ? error.message : userError?.message}</div>;

  if (!user) {
    return <div>Oturum açmanız gerekmektedir.</div>;
  }

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#00008b' }}>
      <MenuBar />
      <div style={{ 
        margin: '20px', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '5px', 
        background: '#1e90ff', 
        marginLeft: '100px', 
        color: '#fff', 
        textAlign: 'center' }}>
        <h2>Kullanıcı Bilgileri</h2>
        {!userExists ? (
          <div>Kullanıcı verisi bulunamadı.</div>
        ) : userData ? (
          <>
            <p><strong>Ad:</strong> {userData.firstName}</p>
            <p><strong>Soyad:</strong> {userData.lastName}</p>
            <p><strong>Doğum Tarihi:</strong> {userData.birthdate}</p>
            <p><strong>Cinsiyet:</strong> {userData.gender}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <h2>Doğru Bilinen Kelimeler Analizi</h2>
            <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
              <Pie data={data} />
            </div>
            <div style={{ marginTop: '20px' }}>
              <p><strong>Doğru Bilinen İsim Sayısı:</strong> {nounCount}</p>
              <p><strong>Doğru Bilinen Sıfat Sayısı:</strong> {adjectiveCount}</p>
              <p><strong>Doğru Bilinen Fiil Sayısı:</strong> {verbCount}</p>
            </div>
            <button onClick={handlePrint} 
               style={{ 
                marginTop: '10x', 
                padding: '5px 5px', 
                fontSize: '16px', 
                cursor: 'pointer', 
                backgroundColor:'#00008b', 
                color: '#fff' 
                }}>Raporu Yazdır</button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Settings;