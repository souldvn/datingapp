import React from 'react'
import Title from '../../UI/Title/Title'
import { useNavigate } from 'react-router-dom'
import { useRegistration } from '../../../Context/RegistrationContext'
import s from './Hobbies.module.css'
import NextButton from '../../UI/NextButton/NextButton'

const Hobbies = () => {
  const navigate = useNavigate()
  const { formData, updateField } = useRegistration()
  
  // Список всех хобби (плоским массивом)
  const allHobbies = [
    'Караоке', 'Медитация', 'Мода', 'Готовка', 'Поэзия', 'Астрология',
    'Прогулки', 'Мемы', 'Фотография', 'Вино', 'Рисование', 'Животные',
    'Игры', 'Фитнес', 'Сериалы', 'Книги', 'Танцы', 'Гастрономия',
    'Кино', 'Музыка', 'Кофе', 'Йога', 'Путешествия'
  ]

  const toggleHobby = (hobby) => {
    const currentHobbies = formData.hobbies || []
    if (currentHobbies.includes(hobby)) {
      // Убираем, если уже есть
      updateField('hobbies', currentHobbies.filter(h => h !== hobby))
    } else {
      // Добавляем, если нет
      updateField('hobbies', [...currentHobbies, hobby])
    }
  }

  const isFormValid = formData.hobbies?.length >= 3

  return (
    <div className={s.container}>
      <Title
        text='Увлечения'
        showBack={true}
        onBack={() => navigate(-1)}
      />
      <p className={s.subtitle}>Выберите минимум три хобби</p>
      
      <div className={s.hobbies_grid}>
        {allHobbies.map((hobby) => (
          <div 
            key={hobby}
            onClick={() => toggleHobby(hobby)}
            className={`${s.item_option} ${formData.hobbies?.includes(hobby) ? s.active : ''}`}
          >
            {hobby}
          </div>
        ))}
      </div>

      <div className={s.button_wrapper}>
        <NextButton
          disabled={!isFormValid}
          text='Далее'
          onClick={() => navigate('/next-step')} // Замени на нужный путь
        />
      </div>
    </div>
  )
}

export default Hobbies