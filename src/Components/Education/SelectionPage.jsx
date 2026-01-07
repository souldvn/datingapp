import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../../Context/RegistrationContext';
import Title from '../UI/Title/Title';
import s from './SelectionPage.module.css'; 

const SelectionPage = ({ title, field, options }) => {
  const navigate = useNavigate();
  const { formData, updateField } = useRegistration();

  const handleSelect = (option) => {
    updateField(field, option); // Записываем в нужное поле (education, smoking и т.д.)
    setTimeout(() => navigate(-1), 200);
  };

  return (
    <div className={s.SelectionPage}>
      <Title text={title} onBack={() => navigate(-1)} />
      <div className={s.options_group}>
        {options.map((option, index) => (
          <label key={index} className={s.reg_inputs_item}>
            <input
              type='radio'
              name={field}
              value={option}
              checked={formData[field] === option}
              onChange={() => handleSelect(option)}
              className={s.radio_input}
            />
            <span className={s.radio_custom}></span>
            <p className='body-large'>{option}</p>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SelectionPage;