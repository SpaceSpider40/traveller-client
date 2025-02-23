export function setCooke(name: string, value: string, expireAtMs: number) {
    const date = new Date(expireAtMs);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export function getCookie(name: string): string | null {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return null;
}

export function removeCookie(name: string): void {
    document.cookie = name + "=";
}
