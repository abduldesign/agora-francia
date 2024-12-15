/**
 * @description Gets cookie
 * @param cookieIdentifier
 * @returns {string}
 */
const getCookie = (cookieIdentifier: string) => {
    let name = cookieIdentifier + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

/**
 * @description sets cookie
 * @param cookieIdentifier
 * @param cookieValue
 * @param lifeInHours
 */
const setCookie = (cookieIdentifier: string, cookieValue: string, lifeInHours: number)  => {
    const d = new Date();
    d.setTime(d.getTime() + (lifeInHours * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cookieIdentifier + "=" + cookieValue + ";" + expires + ";path=/";
}

/**
 * @description set access token.
 * @param val
 */
export const setAccessToken = (val: any) => {
    return setCookie("jwt", val, 10)
}

/**
 * @description get access token
 * @returns {string}
 */
export const getAccessToken = () => {
    return getCookie("jwt")
}

/**
 * @description deletes access token
 */
export const deleteAccessToken = () => {
    return setCookie("jwt", "", -10)
}