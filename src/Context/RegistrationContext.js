import { createContext, useState, useContext, useEffect } from 'react';

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('registration_data');
    return savedData ? JSON.parse(savedData) : {
      name: '',
      birthDate: '',
      gender: '',
      height: 150,
      education: '',
      activity: '',
      smoking: '',
      alcohol: '',
      about: '',
      quizAnswers: {} // Инициализируем объект для ответов теста
    };
  });

  useEffect(() => {
    localStorage.setItem('registration_data', JSON.stringify(formData));
  }, [formData]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Специальный метод для тестов, чтобы обновлять только конкретный вопрос
  const updateQuizAnswer = (questionId, answer) => {
    setFormData(prev => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [questionId]: answer
      }
    }));
  };

  const clearData = () => {
    localStorage.removeItem('registration_data');
    setFormData({
      name: '',
      birthDate: '',
      gender: '',
      height: 150,
      education: '',
      activity: '',
      smoking: '',
      alcohol: '',
      about: '',
      quizAnswers: {}
    });
  };

  return (
    <RegistrationContext.Provider value={{ formData, updateField, updateQuizAnswer, clearData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);