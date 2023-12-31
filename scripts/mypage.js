let userId;

window.onload = async () => {
    const urlParms = new URLSearchParams(window.location.search);
    userId = urlParms.get("user_id");
    await loadUserInfo();
    await loadAuthorArticles();
};

async function handleFollow() {
    if (userId) {
        const response = await postFollow(userId);
        if (response.ok) {
            const data = await response.json();
            const followers = document.getElementById("followers");
            followers.textContent = data.followers_count;
        }
    } else {
        alert("다른 사람만 팔로우 가능합니다.");
    }
}

async function loadUserInfo() {
    const response = await getUserInfo(userId);
    const data = await response.json();
    if (!response.ok) {
        return;
    }
    userId = data.id;
    const email = document.getElementById("email");
    const nickname = document.getElementById("nickname");
    const following = document.getElementById("following");
    const followers = document.getElementById("followers");

    email.textContent = data.email;
    nickname.textContent = data.nickname;
    following.textContent = data.following_count;
    followers.textContent = data.followers_count;

    const styleContent = document.getElementById("styles");

    data.styles.forEach((styleObj) => {
        const userStyle = document.createElement("div");
        userStyle.textContent = styleObj.name;
        styleContent.appendChild(userStyle);
    });
}

async function loadAuthorArticles() {
    const articles = await getUserArticles(userId);

    const articleList = document.getElementById("article-list");

    articles.forEach((article) => {
        const newCol = document.createElement("div");
        newCol.setAttribute("class", "col");
        newCol.classList.add("text-center");
        newCol.setAttribute("onclick", `articleDetail(${article.id})`);

        const newCard = document.createElement("div");
        newCard.setAttribute("class", "card");
        newCard.classList.add("col");
        newCard.setAttribute("id", article.id);
        newCol.appendChild(newCard);

        const newCardHeader = document.createElement("div");
        newCardHeader.setAttribute("class", "card-header");
        newCard.appendChild(newCardHeader);

        const newCardtitle = document.createElement("h5");
        newCardtitle.setAttribute("class", "card-title");
        newCardtitle.innerText = article.title;
        newCardHeader.appendChild(newCardtitle);

        const articleImage = document.createElement("img");
        articleImage.setAttribute("class", "card-img-top");
        articleImage.classList.add();

        if (article.image) {
            articleImage.setAttribute(
                "src",
                `${backend_base_url}${article.image}`
            );
        } else {
            articleImage.setAttribute(
                "src",
                "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MjdfMTE1%2FMDAxNjg1MTk1MjQ0MjAz.iIaJDy9Yp3NiRG9PHd4uI_za1f1HKO7J5o6Q3wATqzcg.l8Pem3MI699fPi3SGH2l7e_rgr8tjthQbCFGuPX6Ig4g.JPEG.loveyoujuwon7354%2FIMG_3273.jpg&type=a340"
            );
        }

        newCard.appendChild(articleImage);

        const newCardbody = document.createElement("div");
        newCardbody.setAttribute("class", "card-body");
        newCard.appendChild(newCardbody);

        articleList.appendChild(newCol);
    });
}
