import config from './config';
import TokenService from './token-service';

// export const newUser = (username, password, addUser) => (
//     fetch(`${config.API_ENDPOINT}/users`, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             username: username,
//             password: password
//         })
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             addUser(data)
//         })
//         .catch(error => console.log(error))
// );

const AuthApiService = {
    postLogin({ username, password }) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },


    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },


    postVideo(videoId, videoTitle) {
        return fetch(`${config.API_ENDPOINT}/playlists`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                videoid: videoId,
                videotitle: videoTitle
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },


    deleteVideo(videoId) {
        return fetch(`${config.API_ENDPOINT}/playlists/${videoId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }
}

export default AuthApiService