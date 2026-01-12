import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../../../Context/RegistrationContext'
import Title from '../../UI/Title/Title';
import NextButton from '../../UI/NextButton/NextButton';
import { quizQuestions } from './QuestionData';
import s from './QuizPage.module.css';

const QuizPage = () => {
  const navigate = useNavigate();
  const { formData, updateQuizAnswer } = useRegistration(); // Достаем нужные функции
  const [currentStep, setCurrentStep] = useState(0);

  const question = quizQuestions[currentStep];
  const totalSteps = quizQuestions.length;

  // Берем значение текущего вопроса из контекста
// Используем опциональную цепочку ?. и проверку на существование formData
const selectedOption = formData?.quizAnswers?.[question?.id] || null;
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      // Больше не нужно сбрасывать локальный стейт, 
      // так как на следующем шаге selectedOption сам станет null из контекста
    } else {
      console.log('Данные готовы к отправке:', formData);
      navigate('/succses'); 
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={s.page}>
      <div className={s.header}>
        <Title 
          text={`${currentStep + 1} из ${totalSteps}`} 
          showBack={true} 
          onBack={handleBack} 
        />
      </div>

      <div className={s.content}>
        <h2 className={`${s.question_text} headline-2m`}>{question.question}</h2>
        
        <div className={s.options_list}>
          {question.options.map((option, index) => (
            <label 
              key={index} 
              className={`${s.option_item} ${selectedOption === option ? s.selected : ''}`}
            >
              <input
                type="radio"
                name={`quiz-option-${question.id}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => updateQuizAnswer(question.id, option)} // Пишем сразу в контекст
                className={s.hidden_radio}
              />
              <span className={s.checkbox_custom}></span>
              <p className="body-medium">{option}</p>
            </label>
          ))}
        </div>
      </div>

      <div className={s.actions}>
        <NextButton 
          text="Далее" 
          disabled={!selectedOption} 
          isFixed={false} 
          onClick={handleNext} 
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

export default QuizPage;