/*
As we don't really use Itsme, we simulate the calls here.
*/

export function getItsmeToken(username) {
    return Array.from(username).map((c, i) => String.fromCharCode((c.charCodeAt(0) + i) % 128)).join("");
}

export function getItsmeName(token) {
    return Array.from(token).map((c, i) => String.fromCharCode((c.charCodeAt(0) - i) % 128)).join("");
}



