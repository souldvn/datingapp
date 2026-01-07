import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем хук навигации
import s from './Start.module.css';

const Start = () => {
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Через 2 секунды запускаем анимацию исчезновения (fadeOut)
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // 2. Через 2.5 секунды физически переходим на другой URL
    const navTimer = setTimeout(() => {
      navigate('/step-1');
    }, 2500);

    // Очистка таймеров, если пользователь закроет вкладку раньше времени
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`${s.start} ${isFading ? s.fadeOut : ''}`}>
      <div className={s.logo_wrapper}>
        <h1 className={s.logo_text}>Dating AI</h1>
        <div className={s.loader}></div>
      </div>
    </div>
  );
};

export default Start;