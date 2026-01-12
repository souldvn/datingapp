import React, { useEffect, useRef } from 'react'; // Добавили хуки
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../../Context/RegistrationContext';
import Title from '../UI/Title/Title';
import NextButton from '../UI/NextButton/NextButton';
import s from './AboutYou.module.css';

const AboutYou = () => {
  const navigate = useNavigate();
  const { formData, updateField } = useRegistration();
  const textareaRef = useRef(null); // Реф для textarea

  const maxLength = 200;
  const currentLength = formData.about?.length || 0;
  const isTooLong = currentLength > maxLength;

  // Автоматическая высота при вводе
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Сбрасываем высоту
      textarea.style.height = `${textarea.scrollHeight}px`; // Устанавливаем высоту по контенту
    }
  }, [formData.about]); // Срабатывает при каждом изменении текста

  const handleChange = (e) => {
    updateField('about', e.target.value);
  };

  const isFormValid = currentLength >= 10 && !isTooLong;

  return (
    <div className={s.container}>
      <Title 
        text="О себе" 
        showBack={true} 
        onBack={() => navigate(-1)} 
      />
      
      <div className={s.input_wrapper}>
        <textarea
          ref={textareaRef} // Привязываем реф
          className={`${s.custom_textarea} ${isTooLong ? s.error_text : ''}`}
          placeholder="Расскажите немного о себе"
          value={formData.about || ''}
          onChange={handleChange}
          rows="1" 
        />
        <div className={`${s.underline} ${isTooLong ? s.underline_error : ''}`}></div>
        
        {/* Показываем подсказку об ошибке как на макете */}
        {isTooLong && (
          <p className={s.error_message}>
            Максимальное количество символов в описании профиля 200 единиц
          </p>
        )}

        <div className={`${s.counter} ${isTooLong ? s.error_text : ''}`}>
          {currentLength} / {maxLength}
        </div>
      </div>

      <div className={s.button_footer}>
        <NextButton 
          text="Далее" 
          disabled={!isFormValid}
          onClick={() => navigate('/hobbies')} 
        />
      </div>
    </div>
  );
};

export default AboutYou;