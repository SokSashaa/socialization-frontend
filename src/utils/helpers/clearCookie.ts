export const clearAllCookies = () => {
	// Получаем все куки
	const cookies = document.cookie.split(';');
	console.log('2321');
	// Перебираем все куки и удаляем их
	cookies.forEach((cookie) => {
		// Находим имя куки (всё до знака "=")
		const cookieName = cookie.trim().split('=')[0];

		// Удаляем куку, устанавливая срок действия в прошлое
		document.cookie = `${cookieName}=; Max-Age=-1; path=/;`;
	});
};
