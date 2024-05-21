import { useEffect, useState } from 'react';
import { db } from "../../firestore";
import styles from "./page.module.css";
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

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
  userEmail: string;
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

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      if (email) {
        const wordCollectionRef = collection(db, 'words');
        const querySnapshot = await getDocs(wordCollectionRef);
        console.log(querySnapshot);
        const words: Word[] = [];
        querySnapshot.forEach((doc) => {
          
          const wordData = doc.data() as Word;
          console.log(wordData);
          if (wordData.userEmail === email) {
            words.push({ ...wordData, id: doc.id });
          }
        });
        setShowedWords(words);
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

  const check = async (word: Word) => {
    let updatedShownDay = word.theShownDay || 0;
    let updatedShownMonth = word.theShownMonth || 0;
    let updatedShownYear = word.theShownYear || 0;
    let updatedKnownCount = word.theKnownCount + 1;

    switch (word.theKnownCount) {
      case 0:
      case 1:
        updatedShownDay++;
        break;
      case 2:
        updatedShownDay += 7;
        break;
      case 3:
        updatedShownMonth++;
        break;
      case 4:
        updatedShownMonth += 3;
        break;
      case 5:
        updatedShownYear++;
        break;
      case 6:
        updatedShownYear = 0;
        break;
    }

    const wordDocRef = doc(db, 'words', word.id);
    await updateDoc(wordDocRef, {
      theKnownCount: updatedKnownCount,
      theShownDay: updatedShownDay,
      theShownMonth: updatedShownMonth,
      theShownYear: updatedShownYear,
    });
  };

  const handleEndQuiz = () => {
    setShowModal(true);
    setShowQuizEndedMessage(true);
    setShowWordCountModal(false);
  };

  const calculateIncorrectCount = () => {
    return howMuch - correctCount;
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
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
              <div className="quiz-item" key={index}>
                <div className="image-container">
                  <div className="image-area">
                    <img src={word.imageURL} alt="Resim" style={{maxWidth:100}}/>
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
            <h2> Quiz Sonuçları
            </h2>
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
        }
        .quiz-settings {
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          width: 90%;
          max-width: 1200px;
        }
        .quiz-settings-container {
          border: 2px solid #ccc;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
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
          margin-bottom: 20px;
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
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default QuizPage;