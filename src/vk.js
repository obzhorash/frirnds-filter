import { resolve } from "url";
import { rejects } from "assert";
import renderFriendsTemplateFn from "../friends-content.hbs";
VK.init({
    apiId: 6671180
});
function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error("Не удалось авторизоваться"));
            }
        }, 2);
    });
}
function callAPI(method, params) {
    params.v = "5.76";
    return new Promise((resolve, reject) => {
        VK.api(method, params, data => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    });
}
auth()
    .then(() => {
        return callAPI("friends.get", { fields: "photo_50" });
    })
    .then(frends => {
        const html = renderFriendsTemplateFn(frends);
        const res = document.querySelector(".frends__list-left");

        res.innerHTML = html;
    })
    .then(() => {
        const frendsId = JSON.parse(localStorage.frendsId);
        const frend = document.querySelectorAll(".frend");
        const frendsListRight = document.querySelector(".frends__list-right");
        frendsId.forEach(id => {
            frend.forEach(item => {
                if (item.getAttribute("data-id") === id) {
                    let cross = item.querySelector(".cross");

                    cross.classList.remove("cross-add");
                    cross.classList.add("cross-remove");
                    frendsListRight.appendChild(item);
                }
            });
        });
    });
