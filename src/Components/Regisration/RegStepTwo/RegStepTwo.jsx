import { useNavigate } from 'react-router-dom'
import NextButton from '../../UI/NextButton/NextButton'
import SelectItemReg from '../../UI/SelectItemReg/SelectItemReg'
import Title from '../../UI/Title/Title'
import s from './RegStepTwo.module.css'
import { useRegistration } from '../../../Context/RegistrationContext'

const RegStepTwo = () => {
	const navigate = useNavigate()
	// Достаем и данные, и функцию обновления, чтобы управлять всеми полями через контекст
	const { formData, updateField } = useRegistration()

	// 1. Оставляем только ОДНО объявление. Проверяем данные из formData.
	const isFormValid = !!(
		formData.education &&
		formData.activity &&
		formData.smoking &&
		formData.alcohol
	)



	const handleOpenMenu = type => {
		console.log('Открываем меню для:', type)
		// Здесь позже добавишь navigate на соответствующие страницы, как с образованием
	}

	return (
		<div className={s.registration}>
			<Title
				text='Образование и деятельность'
				showBack={true}
				onBack={() => navigate(-1)}
			/>

			<div className={s.select_group}>
				<SelectItemReg
					label='Образование'
					value={formData.education}
					onClick={() => navigate('/education')}
				/>
				<SelectItemReg
					label='Сфера деятельности'
					value={formData.activity}
					onClick={() => navigate('/activity')}
				/>
				<SelectItemReg
					label='Курение'
					value={formData.smoking}
					onClick={() => navigate('/smoking')}
				/>
				<SelectItemReg
					label='Алкоголь'
					value={formData.alcohol}
					onClick={() => navigate('/alcohol')}
				/>
			</div>

			<NextButton
				disabled={!isFormValid}
				text='Далее'
				onClick={() => navigate('/hobbies')}
			/>
		</div>
	)
}

export default RegStepTwo
