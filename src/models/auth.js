import { apiUrl } from "../config";

const auth = {
    login: async function login(user) {
        await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
          }).then(response => response.json())
          .then(res => {
            sessionStorage.setItem("token", res.data.token);
            window.location.reload();
          });
    },
    register: async function register(user) {
        await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
          });
    }
}

export default auth;