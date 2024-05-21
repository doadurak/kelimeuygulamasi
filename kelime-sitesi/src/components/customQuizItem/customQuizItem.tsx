import React from "react";
import { Word } from "@/types";
import styles from "./page.module.css";

interface QuizItemProps {
  word: Word;
}

const QuizItem: React.FC<QuizItemProps> = ({ word }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formInput = e.currentTarget.children[2] as HTMLInputElement;
    const formWrong = e.currentTarget.children[3] as HTMLParagraphElement;
    const formButton = e.currentTarget.children[4] as HTMLButtonElement;

    if (formInput.value.length > 0) {
      formInput.disabled = true;
      formButton.disabled = true;
      if (word.turkishMeaning.toLowerCase().trim() === formInput.value.toLowerCase().trim()) {
        formInput.style.color = "green";
        // Kelime doğruysa burada finishedWords dizisine eklemek gerekir
      } else {
        formInput.style.color = "crimson";
        // Kelime yanlışsa gerekli işlemler yapılabilir
      }
    } else {
      formWrong.style.display = "block";
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formQuiz}>
      <div className={styles.imageArea}>
        <img src={word.imageURL} alt={word.englishWord} />
      </div>
      <p className={styles.quizWord}>{word.englishWord}</p>
      <input
        type="text"
        className={styles.submitInput}
        placeholder="Cevabınızı giriniz"
      />
      <p className={styles.wrongQuiz}>Lütfen bir kelime giriniz.</p>
      <button type="submit" className={styles.submitQuiz}>
        Gönder
      </button>
    </form>
  );
};

export default QuizItem;