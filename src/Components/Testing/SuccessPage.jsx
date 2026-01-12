import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration} from '../../Context/RegistrationContext'
import NextButton from '../UI/NextButton/NextButton';
import s from './SuccessPage.module.css';


const getPoints = (answer) => {
  switch (answer) {
    case "Да": return 4;
    case "Скорее да, чем нет": return 3;
    case "Скорее нет, чем да": return 2;
    case "Нет": return 1;
    default: return 0;
  }
};

const SuccessPage = () => {
  const navigate = useNavigate();
  const { formData } = useRegistration();
  const [expandedIds, setExpandedIds] = useState([]);

  // Функция расчета процентов
  const calculateResults = useMemo(() => {
    const answers = formData?.quizAnswers || {};
    
    const getScore = (categoryIds) => {
      const currentPoints = categoryIds.reduce((sum, id) => {
        return sum + getPoints(answers[id]);
      }, 0);
      const maxPoints = categoryIds.length * 4;
      return maxPoints === 0 ? 0 : Math.round((currentPoints / maxPoints) * 100);
    };

    return {
      emotional: getScore([1]),
      willpower: getScore([2, 6, 8]),
      care: getScore([1, 3, 4, 7]),
      harmony: getScore([4]),
      honesty: getScore([5]),
      reliability: getScore([6]),
      dedication: getScore([3, 7]),
      social: getScore([2, 8]),
    };
  }, [formData.quizAnswers]);

  const toggleAccordion = (id) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  // Объединяем расчетные данные с описаниями
  const results = [
    { id: 1, label: 'Эмоциональный отклик', value: `${calculateResults.emotional}%`, description: 'Ваша способность быстро считывать и бессознательно подстраиваться под эмоциональное состояние окружающих' },
    { id: 2, label: 'Сила воли', value: `${calculateResults.willpower}%`, description: 'Внутренняя готовность брать управление в свои руки, принимать решения и быть двигателем процессов в коллективе' },
    { id: 3, label: 'Забота о других', value: `${calculateResults.care}%`, description: 'Сфокусированность на психологическом комфорте и благополучии людей вокруг. Желание создавать безопасную и приятную атмосферу' },
    { id: 4, label: 'Стремление к гармонии', value: `${calculateResults.harmony}%`, description: 'Глубокое неприятие конфронтации. Готовность жертвовать собственными интересами ради сохранения мира и спокойствия в отношениях' },
    { id: 5, label: 'Прямота', value: `${calculateResults.honesty}%`, description: 'Уверенность в выражении своих мыслей. Отсутствие страха делиться сложными, спорными или неочевидными идеями' },
    { id: 6, label: 'Надёжность', value: `${calculateResults.reliability}%`, description: 'Осознанная готовность брать на себя обязательства за других и доводить дело до конца, даже если это требует личных ресурсов' },
    { id: 7, label: 'Самоотдача', value: `${calculateResults.dedication}%`, description: 'Потребность чувствовать свою ценность через помощь и поддержку окружающих. Мотивация быть полезным и нужным' },
    { id: 8, label: 'Социальная активность', value: `${calculateResults.social}%`, description: 'Отсутствие барьеров для того, чтобы сделать первый шаг в общении, познакомиться или начать новое дело' },
  ];

  return (
    <div className={s.page}>
      <div className={s.content}>
        <h1 className={`${s.title} headline-2m`}>Результаты</h1>
        <div className={s.results_list}>
          {results.map((item) => {
            const isExpanded = expandedIds.includes(item.id);
            return (
              <div key={item.id} className={s.result_item} onClick={() => toggleAccordion(item.id)}>
                <div className={s.item_main}>
                  <span className="body-large">{item.label}</span>
                  <div className={s.item_right}>
                    <span className="body-large">{item.value}</span>
                    <svg className={`${s.arrow} ${isExpanded ? s.arrow_up : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className={`${s.description_container} ${isExpanded ? s.show : ''}`}>
                  <p className={`${s.description_text} body-large`}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={s.actions}>
        <NextButton text="Перейти к знакомствам" isFixed={true} onClick={() => navigate('/main')} />
      </div>
    </div>
  );
};

export default SuccessPage;