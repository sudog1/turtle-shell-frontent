let userId;

window.onload = async () => {
    const urlParms = new URLSearchParams(window.location.search);
    userId = urlParms.get("user_id");
    await loadUserInfo();
};

async function loadUserInfo() {
    const response = await getUserInfo(userId);
    const data = await response.json();
    if (!response.ok) {
        return;
    }
    const email = document.getElementById("email");
    const nickname = document.getElementById("nickname");
    const following = document.getElementById("following");
    const followers = document.getElementById("followers");

    email.textContent = data.email;
    nickname.textContent = data.nickname;
    following.textContent = data.following_count;
    followers.textContent = data.followers_count;

    console.log(data.styles);


    const styleContent = document.getElementById("styles");

    data.styles.forEach(styleObj => {
        const userStyle = document.createElement("div");
        userStyle.textContent = styleObj.name;
        styleContent.appendChild(userStyle);
    });
}
