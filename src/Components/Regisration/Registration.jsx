import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../../Context/RegistrationContext'; // Путь к вашему контексту
import NextButton from '../UI/NextButton/NextButton';
import Title from '../UI/Title/Title';
import s from './Registration.module.css';

const Registration = () => {
  const navigate = useNavigate();
  // Подключаем контекст
  const { formData, updateField } = useRegistration();

  // Достаем значения из контекста для удобства использования в JSX
  const { name, birthDate, gender, height } = formData;

  const handleNext = () => {
    // Теперь нам не нужно вручную писать в localStorage, 
    // контекст сделает это сам при обновлении полей
    navigate('/step-2');
  };

  const minHeight = 120;
  const maxHeight = 240;

  // Логика валидации (используем данные из formData)
  const isFormValid = 
    name.trim().length > 0 && 
    birthDate.length === 10 && 
    gender !== '';

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
    if (value.length <= 10) {
      updateField('name', value); // Обновляем в контексте
    }
  };

  const handleBirthDateChange = e => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 8) v = v.slice(0, 8);

    let day = v.slice(0, 2);
    let month = v.slice(2, 4);
    let year = v.slice(4, 8);

    if (day.length === 2) {
      if (Number(day) < 1) day = '01';
      if (Number(day) > 31) day = '31';
    }
    if (month.length === 2) {
      if (Number(month) < 1) month = '01';
      if (Number(month) > 12) month = '12';
    }
    if (year.length === 4) {
      if (Number(year) < 1900) year = '1900';
      if (Number(year) > 2025) year = '2025';
    }

    let formatted = '';
    if (day) formatted = day;
    if (month) formatted += '.' + month;
    if (year) formatted += '.' + year;
    
    updateField('birthDate', formatted); // Обновляем в контексте
  };

  const progress = ((height - minHeight) / (maxHeight - minHeight)) * 100;

  return (
    <div className={s.registration}>
      <Title text='Основная информация' showBack={false} />
      
      <div className={s.reg_main}>
        <input
          type='text'
          placeholder='Имя'
          className='body-medium'
          value={name}
          onChange={handleNameChange}
        />
        <input
          type='text'
          placeholder='Дата рождения'
          className='body-medium'
          value={birthDate}
          onChange={handleBirthDateChange}
        />
      </div>

      <div className={s.reg_choose}>
        <div className={`${s.reg_choose_wrapper} selection`}>
          <p className={`${s.reg_title} body-medium`}>Пол</p>
          <div className={s.reg_inputs}>
            <label className={s.reg_inputs_item}>
              <input
                type='radio'
                name='gender'
                value='male'
                checked={gender === 'male'}
                onChange={(e) => updateField('gender', e.target.value)} // Обновляем в контексте
                className={s.radio_input}
              />
              <span className={s.radio_custom}></span>
              <p className='body-medium'>Мужчина</p>
            </label>

            <label className={s.reg_inputs_item}>
              <input
                type='radio'
                name='gender'
                value='female'
                checked={gender === 'female'}
                onChange={(e) => updateField('gender', e.target.value)} // Обновляем в контексте
                className={s.radio_input}
              />
              <span className={s.radio_custom}></span>
              <p className='body-medium'>Женщина</p>
            </label>
          </div>
        </div>
      </div>

      <div className={s.reg_height}>
        <div className={`${s.reg_height_wrapper} selection`}>
          <div className={s.height_values}>
            <p className={`${s.reg_title} body-medium`}>Рост</p>
            <p className='body-medium'>{height}</p>
          </div>
          <input
            type='range'
            min={minHeight}
            max={maxHeight}
            value={height}
            onChange={e => updateField('height', Number(e.target.value))} // Обновляем в контексте
            className={s.range}
            style={{ '--value-percent': `${progress}%` }}
          />
        </div>
      </div>

      <NextButton disabled={!isFormValid} onClick={handleNext} />
    </div>
  );
};

export default Registration;