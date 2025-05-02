export const getCSRFTokenFromCookies = () => {
    const cookie = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');

    return cookie ? cookie.pop() : '';
};
