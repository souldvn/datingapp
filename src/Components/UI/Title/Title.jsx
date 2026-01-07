import s from './Title.module.css'

const Title = ({ text, showBack = true, onBack }) => {
  return (
    <div className={s.title}>
      {showBack && (
        <img
          src='icons/Back.svg' // Убедись, что путь правильный (/icons/Back.svg)
          alt='back'
          onClick={onBack} 
          style={{ cursor: 'pointer' }}
        />
      )}
      <p className='headline-2'>{text}</p>
    </div>
  )
}

export default Title