import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth } from "../../firebase";
import { collection, query, where, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from "../../firestore";
import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import MenuBar from "@/components/customMenuBar/customMenuBar";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Settings = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userExists, setUserExists] = useState(true);
  const [userData, setUserData] = useState<DocumentData | null>(null);

  const [userDataSnapshot, userLoading, userError] = useCollection(
    user ? query(collection(db, 'users'), where('email', '==', user.email)) : null
  );

  useEffect(() => {
    if (!user || !userDataSnapshot) return;

    if (userDataSnapshot.empty) {
      setUserExists(false);
      return;
    }

    const userDataArray = userDataSnapshot.docs.map(doc => doc.data() as DocumentData);
    setUserData(userDataArray[0]);
  }, [user, userDataSnapshot]);

  if (loading || userLoading) return <div>Loading...</div>;
  if (error || userError) return <div>Error: {error ? error.message : userError?.message}</div>;

  if (!user) {
    return <div>Oturum açmanız gerekmektedir.</div>;
  }

  const correctAnswers = userData?.correctAnswers || 0;
  const incorrectAnswers = userData?.incorrectAnswers || 0;
  const totalQuestions = correctAnswers + incorrectAnswers;
  const correctPercentage = totalQuestions ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : 0;
  const incorrectPercentage = totalQuestions ? ((incorrectAnswers / totalQuestions) * 100).toFixed(2) : 0;

  const data = {
    labels: ['Doğru', 'Yanlış'],
    datasets: [
      {
        label: 'Quiz Sonuçları',
        data: [correctAnswers, incorrectAnswers],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#e57373'],
      },
    ],
  };

  const handleEndQuiz = async (newCorrectCount:number, newIncorrectCount:number, newTotalQuestions:number) => {
    if (user && user.email) {
      try {
        const userRef = doc(db, 'users', user.email);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const updatedCorrectAnswers = (userData.correctAnswers || 0) + newCorrectCount;
          const updatedIncorrectAnswers = (userData.incorrectAnswers || 0) + newIncorrectCount;
          const updatedTotalQuestions = (userData.totalQuestions || 0) + newTotalQuestions;

          await updateDoc(userRef, {
            correctAnswers: updatedCorrectAnswers,
            incorrectAnswers: updatedIncorrectAnswers,
            totalQuestions: updatedTotalQuestions,
          });

          setUserData({
            ...userData,
            correctAnswers: updatedCorrectAnswers,
            incorrectAnswers: updatedIncorrectAnswers,
            totalQuestions: updatedTotalQuestions,
          });
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#00008b' }}>
      <MenuBar />
      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', background: '#1e90ff', marginLeft: '100px', color: '#fff', textAlign: 'center' }}>
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
            <h2>Quiz Analizi</h2>
            <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
              <Pie data={data} />
            </div>
            <div style={{ marginTop: '20px' }}>
              <p><strong>Toplam Soru Sayısı:</strong> {totalQuestions}</p>
              <p><strong>Doğru Oranı:</strong> {correctPercentage}%</p>
              <p><strong>Yanlış Oranı:</strong> {incorrectPercentage}%</p>
            </div>
            <button onClick={() => handleEndQuiz(5, 2, 7)}>Quizi Sonlandır</button> {/* Burada örnek bir quiz sonlandırma işlemi */}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Settings;