import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../UI/Title/Title';
import NextButton from '../../UI/NextButton/NextButton';
import { quizQuestions } from './QuestionData';
import s from './QuizPage.module.css';

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const question = quizQuestions[currentStep];
  const totalSteps = quizQuestions.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null); // Сброс выбора для нового вопроса
    } else {
      navigate('/main'); // Финал теста
    }
  };

  return (
    <div className={s.page}>
      <div className={s.header}>
        <Title 
          text={`${currentStep + 1} из ${totalSteps}`} 
          showBack={true} 
          onBack={() => currentStep > 0 ? setCurrentStep(prev => prev - 1) : navigate(-1)} 
        />
      </div>

      <div className={s.content}>
        <h2 className={`${s.question_text} headline-2m`}>{question.question}</h2>
        
        <div className={s.options_list}>
          {question.options.map((option, index) => (
            <label key={index} className={`${s.option_item} ${selectedOption === option ? s.selected : ''}`}>
              <input
                type="radio"
                name="quiz-option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
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