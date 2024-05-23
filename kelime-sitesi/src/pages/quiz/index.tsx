import { useEffect, useState } from 'react';
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'; // Firestore için bu modülleri kullanın
import MenuBar from "@/components/customMenuBar/customMenuBar";
import { auth } from '../../firebase'; 
import { useAuthState } from 'react-firebase-hooks/auth'; 


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
  knownDate:string;
};

const QuizPage: React.FC = () => {
  const [showedWords, setShowedWords] = useState<Word[]>([]);
  const [howMuch, setHowMuch] = useState<number>(0);
  const [responses, setResponses] = useState<{ [key: string]: string | null }>({});
  const [isCorrect, setIsCorrect] = useState<{ [key: string]: boolean | null }>({});
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showWordCountModal, setShowWordCountModal] = useState<boolean>(true);
  const [showQuizEndedMessage, setShowQuizEndedMessage] = useState<boolean>(false);
  const [knownWords, setKnownWords] = useState<{ [key: string]: { count: number; lastKnownDate: Date } }>({});

  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const email = user?.email || localStorage.getItem('userEmail');
      if (email) {
        const wordCollectionRef = collection(db, 'words');
        const querySnapshot = await getDocs(wordCollectionRef);
        const words: Word[] = [];
        const knownWordsData: { [key: string]: { count: number; lastKnownDate: Date } } = {};

        const today = new Date();

        querySnapshot.forEach((doc) => {
          const wordData = doc.data() as Word;
          if (wordData.userEmail === email) {
            const shownDate = new Date(wordData.theShownYear, wordData.theShownMonth - 1, wordData.theShownDay);
            if (!(shownDate < today) || (knownWordsData[doc.id] && knownWordsData[doc.id].count > 0 && shownDate < today)) {
              return;
            }
            words.push({ ...wordData, id: doc.id });
            knownWordsData[doc.id] = { count: wordData.theKnownCount, lastKnownDate: shownDate };
          }
        });

        setShowedWords(words);
        setKnownWords(knownWordsData);
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleInputChange = async (wordId: string, userResponse: string) => {
    setResponses({ ...responses, [wordId]: userResponse });

    const word = showedWords.find((word) => word.id === wordId);
    if (!word) {
      console.error(`Word with id ${wordId} not found.`);
      return;
    }

    if (!word.turkishMeaning) {
      console.error(`Turkish meaning not found for word with id ${wordId}.`);
      return;
    }

    const isAnswerCorrect = word.turkishMeaning.toLowerCase().trim() === userResponse.toLowerCase().trim();
    setIsCorrect({ ...isCorrect, [wordId]: isAnswerCorrect });

    if (isAnswerCorrect) {
      await check(word);
      setCorrectCount(prevCount => prevCount + 1);
    }
  };

  const calculateNextReviewDate = (knownDate: Date, knownCount: number) => {
    const nextReviewDate = new Date(knownDate);
    switch (knownCount) {
      case 0:
      case 1:
        nextReviewDate.setDate(nextReviewDate.getDate() + 1);
        break;
      case 2:
        nextReviewDate.setDate(nextReviewDate.getDate() + 7);
        break;
      case 3:
        nextReviewDate.setMonth(nextReviewDate.getMonth() + 1);
        break;
      case 4:
        nextReviewDate.setMonth(nextReviewDate.getMonth() + 3);
        break;
      case 5:
        nextReviewDate.setFullYear(nextReviewDate.getFullYear() + 1);
        break;
      case 6:
        nextReviewDate.setFullYear(0);
        break;
    }
    return nextReviewDate;
  };

  const check = async (word: Word) => {
    const knownWord = knownWords[word.id];
    const updatedKnownCount = knownWord ? knownWord.count + 1 : 1;
    const formattedKnownDate = new Date().toISOString();
    const nextReviewDate = calculateNextReviewDate(formattedKnownDate ? new Date(formattedKnownDate) : new Date(), updatedKnownCount);

    const wordDocRef = doc(db, 'words', word.id);
    await updateDoc(wordDocRef, {
      theKnownCount: updatedKnownCount,
      knownDate: formattedKnownDate, 
      theShownDay: nextReviewDate.getDate(),
      theShownMonth: nextReviewDate.getMonth() + 1,
      theShownYear: nextReviewDate.getFullYear(),
    });

    const updatedKnownWords = { ...knownWords };
    updatedKnownWords[word.id] = { count: updatedKnownCount, lastKnownDate: nextReviewDate };
    setKnownWords(updatedKnownWords);
  };

  const handleEndQuiz = async () => {
    await updateUserQuizData();
    setShowModal(true);
    setShowQuizEndedMessage(true);
    setShowWordCountModal(false);
  };

  const calculateIncorrectCount = () => {
    return howMuch - correctCount;
  };

  const updateUserQuizData = async () => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    const incorrectCount = calculateIncorrectCount();

    await updateDoc(userDocRef, {
      totalQuestions: howMuch,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <MenuBar />
      <div className="container" style={{ marginLeft: '200px', padding: '20px', width: 'calc(100% - 200px)' }}>
        {!showQuizEndedMessage && showWordCountModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Kaç kelime gösterilsin?</h2>
              <input
                type="number"
                value={howMuch}
                onChange={(e) => setHowMuch(parseInt(e.target.value))}
              />
              <button onClick={() => setShowWordCountModal(false)}>Başla</button>
            </div>
          </div>
        )}
        {!showQuizEndedMessage && !showWordCountModal && (
          <> 
            <div className="quiz-settings-container">
              <div className="quiz-settings">
                <div className="word-count-container">
                  <label htmlFor="wordCount">Kelime Sayısı :</label>
                  <input
                    type="number"
                    id="wordCount"
                    value={howMuch}
                    onChange={(e) => setHowMuch(parseInt(e.target.value))}
                  />
                </div>
                <div className="end-quiz-button">
                  <button onClick={handleEndQuiz}>Quizi Sonlandır</button>
                </div>
              </div>
            </div>
            <div className="quiz-container">
              {showedWords.slice(0, howMuch).map((word, index) => (
                <div className="quiz-item" key={index} style={{ backgroundColor: '#1e90ff', color: '#fff' }}>
                  <div className="image-container">
                    <div className="image-area">
                      <img src={word.imageURL} alt="Resim" style={{ maxWidth: '100%', maxHeight: '100px', display: 'block', margin: '0 auto' }} />
                    </div>
                  </div>
                  <div className="text-container">
                    <div className="word-info">
                      <p className="example-sentence">{word.exampleSentence}</p>
                      <p className="english-word">{word.englishWord}</p>
                    </div>
                    <input
                      type="text"
                      placeholder="Türkçe çeviriyi girin"
                      value={responses[word.id] || ''}
                      onChange={(e) => handleInputChange(word.id, e.target.value)}
                      style={{
                        borderColor: isCorrect[word.id] !== undefined
                          ? isCorrect[word.id]
                            ? 'green'
                            : 'red'
                          : 'initial'
                      }}
                    />
                    <div className="icon-container">
                      {isCorrect[word.id] !== undefined && (
                        isCorrect[word.id] ?
                          <span className="icon correct">✔️</span> :
                          <span className="icon incorrect">❌</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {showQuizEndedMessage && (
          <div className="quiz-ended-message">
            <p>Quiziniz sonlandırıldı. Lütfen gitmek istediğiniz sayfayı menübardan seçiniz.</p>
          </div>
        )}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Quiz Sonuçları</h2>
              <p>Toplam Kelime Sayısı: {howMuch}</p>
              <p>Doğru Sayısı: {correctCount}</p>
              <p>Yanlış Sayısı: {calculateIncorrectCount()}</p>
              <button onClick={handleModalClose}>Kapat</button>
            </div>
          </div>
        )}
        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100vh;
            background-color: #00008b;
          }
          .quiz-settings {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          .quiz-settings-container {
            border: 2px solid #ccc;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            background-color: #1e90ff;
            color: white;
          }
          .quiz-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            width: 90%;
            max-width: 1200px;
          }
          .quiz-item {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 20px;
          }
          .image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
          }
          .image-area {
            max-width: 100px;
            max-height: 100px;
            overflow: hidden;
          }
          .text-container {
            text-align: center;
            position: relative;
          }
          .word-info {
            margin-bottom: 10px;
          }
          .english-word {
            font-weight: bold;
          }
          input {
            margin-top: 10px;
            padding: 5px;
            width: 200px;
          }
          .icon-container {
            position: absolute;
            right: -30px;
            top: 10px;
            font-size: 24px;
          }
          .icon.correct {
            color: green;
          }
          .icon.incorrect {
            color: red;
          }
          .quiz-ended-message {
            margin-top: 20px;
            font-size: 18px;
            color: red;
          }
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.5);
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }
          .modal-content h2 {
            margin-bottom: 20px;
          }
          .modal-content p {
            margin-bottom: 10px;
          }
          .modal-content button {
            padding: 10px 20px;
            background-color: #00008b;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .end-quiz-button {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .end-quiz-button button {
            background-color: #00008b;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  );
};

export default QuizPage;