import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {useGetObserverTestsQuery} from '@app/api/common/testApiSlice';

import {ROUTING_FUNCTIONS} from '@routes/RouterConfig';

import css from './TestResultUser.module.scss';

interface TestResultUserProps {
	user_id: number;
	label?: string;
}

const DEFAULT_SHOW_COUNT_TEST = 3;

const TestResultUser: FC<TestResultUserProps> = ({user_id, label}) => {
	const {data: tests} = useGetObserverTestsQuery({user_id: user_id, offset: 0, limit: 1000000});

	const isTestsNotEmpty = tests && tests.results.length > 0;
	const isRedirectOnPageWithAllTests = tests && tests.results.length > DEFAULT_SHOW_COUNT_TEST;

	return (
		<div>
			<h3 className={css.title}>{label}</h3>
			{isTestsNotEmpty && (
				<ol className={css.list}>
					{tests?.results.slice(0, 5).map((item) => {
						const statusTest: string = item.is_passed ? 'Пройден' : 'Не пройден';

						return (
							<li key={item.id}>
								<div className={css.testInfo}>
									<div>
										<p className={css.testTitle}>{item.title}</p>
										<Link
											to={ROUTING_FUNCTIONS.editTest(item.id)}
											className={css.link}
										>
											Перейти к тесту
										</Link>
									</div>

									<div className={css.status}>
										<p
											className={
												item.is_passed ? css.testPassed : css.testNoPassed
											}
										>
											{statusTest}
										</p>
										{item.is_passed && (
											<Link
												to={ROUTING_FUNCTIONS.resultTest(item.id)}
												state={{userId: user_id}}
												className={css.link}
											>
												Результаты теста
											</Link>
										)}
									</div>
								</div>
							</li>
						);
					})}
				</ol>
			)}
			{isRedirectOnPageWithAllTests && (
				<Link to={ROUTING_FUNCTIONS.appointedTests(user_id)} className={css.link}>
					Перейти к просмотру всех назначенных тестов
				</Link>
			)}
			{!isTestsNotEmpty && <p className={css.empty}>Тесты не назначены</p>}
		</div>
	);
};

export default TestResultUser;
