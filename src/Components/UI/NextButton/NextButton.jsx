import s from './NextButton.module.css'

const NextButton = ({ onClick, text = 'Далее', disabled = false }) => {
  return (
    <div className={s.button_container}>
      <button 
        className={s.next_button} 
        onClick={onClick}
        disabled={disabled}
      >
        <span className="body-medium">{text}</span>
      </button>
    </div>
  )
}

export default NextButton