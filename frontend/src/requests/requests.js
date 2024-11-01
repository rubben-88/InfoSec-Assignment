import { getItsmeName } from "../itsme/itsme"

const BACKEND_BASE_URL = 'https://127.0.0.1:8000'

export function try_login(
    token,
    callback,
    onError
) {
    const url = `${BACKEND_BASE_URL}/try-login/${encodeURIComponent(token)}`
    const http = new XMLHttpRequest()
    http.open("POST", url)
    http.send()
    
    http.onreadystatechange = function() {
        // readyState 4 means the request is done
        if (this.readyState === 4) {
            if (this.status === 200) {
                callback()
            } else {
                onError()
            }
        }
    }
}

export function has_voted(
    token,
    callback,
    onError
) {
    const url = `${BACKEND_BASE_URL}/has-voted/${encodeURIComponent(token)}`
    const http = new XMLHttpRequest()
    http.open("GET", url)
    http.send()
    
    http.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                const result = (http.responseText === "true")
                callback(result)
            } else {
                onError()
            }
        }
    }
}

export function vote(
    candidate_name,
    token,
    callback,
    onError
) {
    const url = `${BACKEND_BASE_URL}/vote/${encodeURIComponent(candidate_name)}/${encodeURIComponent(token)}`
    const http = new XMLHttpRequest()
    http.open("POST", url)
    http.send()

    http.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                const result = (http.responseText === "true")
                callback(result)
            } else {
                onError()
            }
        }
    }
}

export function candidate_names(
    callback,
    onError
) {
    const url = `${BACKEND_BASE_URL}/candidates`
    const http = new XMLHttpRequest()
    http.open("GET", url)
    http.send()

    http.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                const result = JSON.parse(http.responseText)
                callback(result)
            } else {
                onError()
            }
        }
    }
}