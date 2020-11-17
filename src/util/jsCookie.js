import JSCookie from 'js-cookie'

const Token = 'OilCardToken'
const Id = 'OilCardId'
const User = 'OilCardUser'

// token
const setToken = (value) => {
    JSCookie.set(Token, value)
}

const getToken = () => {
    return JSCookie.get(Token) || ''
}

const removeToken = () => {
    JSCookie.remove(Token)
}

// id
const setId = (value) => {
    JSCookie.set(Id, value)
}

const getId = () => {
    return JSCookie.get(Id) || ''
}

const removeId = () => {
    JSCookie.remove(Id)
}

// user
const setUser = (value) => {
    JSCookie.set(User, value)
}

const getUser = () => {
    return JSCookie.getJSON(User) || ''
}

const removeUser = () => {
    JSCookie.remove(User)
}

export { setToken, getToken, removeToken, setId, getId, removeId, setUser, getUser, removeUser }
