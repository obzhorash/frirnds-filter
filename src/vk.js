import { resolve } from "url";
import { rejects } from "assert";

VK.init({
    apiId: 6671180
});
function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2)
    });
}
function callAPI(method, params) {
    params.v = '5.76'
    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    })
}
auth()
    .then(() => {
        return callAPI('friends.get', { fields: 'photo_50' });
    })
    .then(frends => {
        const html = renderFriendsTemplateFnfrends(fields.items);
        const res = document.querySelector('.frends__all');
        res.innerHTML = html;
    });