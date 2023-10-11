const frontend_base_url = "http://127.0.0.1:5500";
const backend_base_url = "http://127.0.0.1:8000";

async function handleSignup(user_info) {
    const response = await fetch(`${backend_base_url}/accounts/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(user_info),
    });
    if (response.ok) {
        window.location.href = "/login.html";
    } else {
        const data = await response.json();
        return data;
    }
}

async function handleLogin(userObject) {
    const response = await fetch(`${backend_base_url}/accounts/token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(userObject),
    });
    return response;
}

function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("exp");
    window.location.href = "/index.html";
}

function isTokenExpired() {
    const exp = localStorage.getItem("exp");
    return Date.now() >= exp * 1000;
}

async function refreshAccessToken() {
    if (!isTokenExpired()) {
        return;
    }
    const refreshToken = localStorage.getItem("refresh");
    const response = await fetch(
        `${backend_base_url}/accounts/token/refresh/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                refresh: refreshToken,
            }),
        }
    );
    if (response.ok) {
        const data = await response.json();
        const accessToken = data.access;
        localStorage.setItem("access", accessToken);
        console.log("토큰 재발급!");
    }
}

refreshAccessToken();
