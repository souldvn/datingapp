import s from './SelectItemReg.module.css'

const SelectItemReg = ({ label, value, onClick}) => {
  return (
    <div className={s.wrapper} onClick={onClick}>
      <div className={s.content}>
        <span className={s.label}>{label}</span>
        <span className={s.value}>{value || 'Выбрать'}</span>
      </div>
      <img 
        src='/icons/Next.svg'
        className={s.arrow} 
        alt="arrow" 
      />
    </div>
  )
}

export default SelectItemReg