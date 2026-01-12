import React from 'react'
import { useNavigate } from 'react-router-dom'
import NextButton from '../UI/NextButton/NextButton'
import s from './SuccsesTesting.module.css'

const SuccsesTesting = () => {
	const navigate = useNavigate()

	return (
		<div className={s.page}>
			<div className={s.content}>
				<div className={s.image_container}>
					<img
						src='/icons/testimg.jpg'
						alt='Test illustration'
						className={s.image}
					/>
					<h2 className={`${s.title} headline-2m`}>
						Вы успешно прошли тестирование!
					</h2>
					<p className={`${s.description} body-large`}>
						Теперь найти идеального собеседника станет ещё проще
					</p>
				</div>
			</div>
			<NextButton
				text='Смотреть результаты'
				onClick={() => navigate('/summary')}
			/>
		</div>
	)
}

export default SuccsesTesting
