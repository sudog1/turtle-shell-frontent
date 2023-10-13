async function loadAuthorArticles() {
    const articles = await getFeedArticles();

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

loadAuthorArticles();
