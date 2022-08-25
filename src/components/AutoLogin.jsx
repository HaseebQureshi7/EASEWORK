import axios from "axios"

const login_url = 'https://easework.herokuapp.com/api/login'

export const AutoLogin = (navigation) => {
    if (localStorage.getItem('user')) {
        const logged_user = JSON.parse(localStorage.getItem('user'))
        axios.post(login_url, { username: logged_user.username, password: logged_user.password }).then(res => {navigation('/dashboard', { state: {resData : res.data } });}).catch(res => console.log('Corrupt User Data', res))
    }
    else {
        navigation('/')
    }
}