export function clearAllCookies() {
	// Получаем все куки
	const cookies = document.cookie.split(';');

	// Перебираем все куки и удаляем их
	cookies.forEach((cookie) => {
		// Находим имя куки (всё до знака "=")
		const cookieName = cookie.trim().split('=')[0];

		// Удаляем куку, устанавливая срок действия в прошлое
		document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	});
}
