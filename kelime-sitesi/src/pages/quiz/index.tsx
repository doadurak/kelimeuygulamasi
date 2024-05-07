import React from 'react';


type WordData = {
    [wordId: string]: { 
      correctCount: number; 
      lastCorrectDate: string; 
    }; 
  };
  const wordData: WordData = {
    '8': { correctCount: 6, lastCorrectDate: '2023-12-15' },
    '12': { correctCount: 6, lastCorrectDate: '2023-12-15' },
  };

const allWords = ['8', '12', '13', '33', '54', '55', '86', '87', '19', '10', '2', '5', '6', '78', '45', '14', '56', '57', '80', '81'];

const calculateWordsForExam = (): string[] => {
  const date = new Date();
  const dayOfWeek = date.getDay(); 
  const timeFrames = [1, 7, 30, 90, 180, 365];
  const selectedWords: string[] = [];

  const knownWords = Object.keys(wordData).filter(wordId => {
    const { correctCount, lastCorrectDate } = wordData[wordId];
    const timePassed = (date.getTime() - new Date(lastCorrectDate).getTime()) / (1000 * 60 * 60 * 24);
    return correctCount >= 6 && timePassed >= timeFrames[dayOfWeek];
  });

  while (selectedWords.length < 10) {
    const randomIndex = Math.floor(Math.random() * allWords.length);
    const randomWord = allWords[randomIndex];
    if (!knownWords.includes(randomWord) && !selectedWords.includes(randomWord)) {
      selectedWords.push(randomWord);
    }
  }

  return selectedWords;
};

const QuizModule: React.FC = () => {
  const [selectedWords, setSelectedWords] = React.useState<string[]>([]);

  React.useEffect(() => {
    const wordsForExam = calculateWordsForExam();
    setSelectedWords(wordsForExam);
  }, []);

  return (
    <div>
      <h1>Quiz Module</h1>
      <ul>
        {selectedWords.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizModule;