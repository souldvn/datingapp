import { createContext, useState, useContext, useEffect } from 'react';

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  // 1. Инициализируем состояние функцией, которая проверяет localStorage
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
      alcohol: ''
    };
  });

  // 2. Используем useEffect, чтобы сохранять данные при любом изменении formData
  useEffect(() => {
    localStorage.setItem('registration_data', JSON.stringify(formData));
  }, [formData]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Метод для очистки данных (например, после завершения регистрации)
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
      alcohol: ''
    });
  };

  return (
    <RegistrationContext.Provider value={{ formData, updateField, clearData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);