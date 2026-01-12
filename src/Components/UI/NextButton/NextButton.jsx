import s from './NextButton.module.css'

const NextButton = ({ onClick, text = 'Далее', disabled = false, variant = 'primary', isFixed = true }) => {
  // Собираем классы: основной + стиль (фиолетовый/прозрачный) + позиционирование
  const buttonClass = `${s.next_button} ${s[variant]}`;
  const containerClass = `${s.button_container} ${isFixed ? s.fixed : s.static}`;

  return (
    <div className={containerClass}>
      <button 
        className={buttonClass} 
        onClick={onClick}
        disabled={disabled}
      >
        <span className="body-medium">{text}</span>
      </button>
    </div>
  )
}

export default NextButton