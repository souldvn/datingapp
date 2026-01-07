import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Registration from './Components/Regisration/Registration'
import Start from './Components/Start'
import RegStepTwo from './Components/Regisration/RegStepTwo/RegStepTwo'
import './App.css'
import SelectionPage from './Components/Education/SelectionPage'
import { RegistrationProvider } from './Context/RegistrationContext'
import Hobbies from './Components/Regisration/Hobbies/Hobbies'



function App() {
	return (
		<RegistrationProvider>
			<BrowserRouter>
				<div className='App'>
          
					<Routes>

						<Route
							path='/'
							element={<Start />}
						/>
						<Route
							path='/step-1'
							element={<Registration />}
						/>
						<Route
							path='/step-2'
							element={<RegStepTwo />}
						/>

            <Route path='/hobbies' element={<Hobbies />} />

						<Route
							path='*'
							element={<Navigate to='/' />}
						/>
						<Route
							path='/education'
							element={
								<SelectionPage
									title='Образование'
									field='education'
									options={[
										'Средняя школа',
										'Колледж',
										'Бакалавриат',
										'Магистратура', 'Аспирантура/Докторантура', 'Самообразование', 'Курсы/Сертификаты'
									]}
								/>
							}
						/>

						<Route
							path='/activity'
							element={
								<SelectionPage
									title='Сфера деятельности'
									field='activity'
									options={[
										'Юриспруденция',
										'Административный персонал',
										'Архитектура и дизайн',
										'Банки, инвестиции, лизинг',
										'Бухгалтерия и учёт',
										'Забота о здоровье животных',
										'Вооружённые силы',
										'Государственная служба',
										'Гостиничное дело',
										'Добыча сырья',
										'Органы власти и правопорядка',
										'Издательское дело',
										'Индустрия развлечений',
										'Консультирование',
										'Образование',
										'Здравоохранение',
										'Наука',
										'Культура',
										'Торговля',
										'IT',
										'Свой бизнес',
										'Транспорт',
										'Производство',
										'Маркетинг и PR',
										'Религиозные организации',
										'Сельское хозяйство',
										'Спорт',
										'Средства массовой информации',
										'Страхование',
										'Недвижимость',
										'Судебная власть',
										'HR, управление персоналом',
										'Студент',
										'Неработающий',
										'Другое'
									]}
								/>
							}
						/>

						<Route
							path='/smoking'
							element={
								<SelectionPage
									title='Курение'
									field='smoking'
									options={['Курю', 'Иногда', 'Не курю']}
								/>
							}
						/>

						<Route
							path='/alcohol'
							element={
								<SelectionPage
									title='Алкоголь'
									field='alcohol'
									options={[
										'Пью',
										'Иногда',
										'Не пью'
									]}
								/>
							}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</RegistrationProvider>
	)
}

export default App
