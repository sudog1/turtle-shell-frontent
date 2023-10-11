// import { handleLogin } from "./api.js";

const form = document.querySelector("#login-form > form");
const button = form.querySelector("#button");
const username = form.querySelector("#username");
const password = form.querySelector("#password");
const errorMessage = form.querySelector("#error-message");

button.addEventListener("click", async (event) => {
    form.classList.add("was-validated");
    if (!form.checkValidity()) {
        return;
    }
    const userObject = {
        username: username.value,
        password: password.value,
    };
    const response = await handleLogin(userObject);
    if (response.ok) {
        const data = await response.json();
        const refreshToken = data.refresh;
        const accessToken = data.access;
        const expirationPeriod = JSON.parse(
            atob(accessToken.split(".")[1])
        ).exp;
        localStorage.setItem("access", accessToken);
        localStorage.setItem("exp", expirationPeriod);
        localStorage.setItem("refresh", refreshToken);

        window.location.href = "/index.html";
    } else {
        const errors = await response.json();
        for (const key in errors) {
            errorMessage.textContent = errors[key];
            errorMessage.classList.remove("collapse");
        }
    }
});
