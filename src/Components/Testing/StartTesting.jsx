import React from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from '../UI/NextButton/NextButton';
import s from './StartTesting.module.css';

const StartTesting = () => {
  const navigate = useNavigate();

  return (
    <div className={s.page}>
      <div className={s.content}>
        <h2 className={`${s.title} headline-2m`}>Пройдите тестирование</h2>
        <p className={`${s.description} body-large`}>
          Ответь на несколько лёгких вопросов — и мы подберём для тебя собеседников, которые тебе по душе.
        </p>

        <div className={s.image_container}>
          <img src="/icons/testimg.jpg" alt="Test illustration" className={s.image} />
        </div>
      </div>

      <div className={s.actions}>
        <NextButton 
          text="Пройти тестирование" 
          isFixed={false} 
          onClick={() => navigate('/quiz')} 
        />
        <NextButton 
          text="Пройду позже" 
          variant="outline" 
          isFixed={false} 
          onClick={() => navigate('/main')} 
        />
      </div>
    </div>
  );
};

export default StartTesting;