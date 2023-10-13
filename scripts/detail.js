let articleId;

// 작성된 댓글 불러오기
async function loadComment(articleId) {
    const response = await getComments(articleId);

    const commentList = document.getElementById("comment-list");
    commentList.innerHTML = "";
    console.log(response);
    response.forEach((comment) => {
        commentList.innerHTML += `
        <li class="media d-flex mb-3">
        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MDZfMjkz%2FMDAxNjg4NjQ1NDI2NjUy.TUnATcUsNDW7_JfQMDzBknWYmF5MsMDxRsLy4fOFExog.rpvibUkWyAZhQTb4z_BZ02SomllmBWeFT-Z8oiwX44og.JPEG.dldksk3566%2Foutput_1769810810.jpg&type=a340" class="mr-3" alt="프로필이미지" width="50" height="50">
        <div class="media-body">
            <h5 class="mt-0 mb-1">${comment.author.nickname}</h5>
            ${comment.content}
            좋아요 ${comment.likes_count}
        </div>
        </li>`;
    });
}

// 댓글 등록하기
async function submitComment() {
    const commentElement = document.getElementById("new-comment");
    const newComment = commentElement.value;
    const comment = await postComment(articleId, newComment);
    commentElement.value = "";

    const commentList = document.getElementById("comment-list");
    commentList.innerHTML += `
        <li class="media d-flex mb-3">
        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MDZfMjkz%2FMDAxNjg4NjQ1NDI2NjUy.TUnATcUsNDW7_JfQMDzBknWYmF5MsMDxRsLy4fOFExog.rpvibUkWyAZhQTb4z_BZ02SomllmBWeFT-Z8oiwX44og.JPEG.dldksk3566%2Foutput_1769810810.jpg&type=a340" class="mr-3" alt="프로필이미지" width="50" height="50">
        <div class="media-body">
            <h5 class="mt-0 mb-1">${comment.author.nickname}</h5>
            ${comment.content}
        </div>
        </li>`;
}

window.onload = async function () {
    const urlParms = new URLSearchParams(window.location.search);
    articleId = urlParms.get("article_id");
    await loadArticles();
    await loadComment(articleId);
};

async function loadArticles() {
    const data = await getArticle(articleId);
    const articleTitle = document.getElementById("article-title");
    const articleAuthor = document.getElementById("article-author");
    const articleImage = document.getElementById("article-image");
    const articleContent = document.getElementById("article-content");
    const likesBtn = document.getElementById("likes");
    const likesCnt = likesBtn.querySelector("span");
    const commentsCnt = document.getElementById("comments-count");
    const productList = document.getElementById("product-list");
    articleTitle.innerText = data.title;
    articleAuthor.innerText = data.author.nickname;
    articleAuthor.setAttribute("href", `mypage.html?user_id=${data.author.id}`);
    articleContent.innerText = data.content;
    likesCnt.innerText = data.likes_count;
    commentsCnt.innerText = data.comments_count;
    const newImage = document.createElement("img");

    const isOwner = data.is_owner;

    const updateButton = document.getElementById("article-update");
    const deleteButton = document.getElementById("article-delete");

    if (isOwner) {
        updateButton.style.display = "block";
        deleteButton.style.display = "block";
    } else {
        updateButton.style.display = "none";
        deleteButton.style.display = "none";
    }

    if (data.image) {
        newImage.setAttribute("src", `${backend_base_url}${data.image}`);
    } else {
        newImage.setAttribute(
            "src",
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MjdfMTE1%2FMDAxNjg1MTk1MjQ0MjAz.iIaJDy9Yp3NiRG9PHd4uI_za1f1HKO7J5o6Q3wATqzcg.l8Pem3MI699fPi3SGH2l7e_rgr8tjthQbCFGuPX6Ig4g.JPEG.loveyoujuwon7354%2FIMG_3273.jpg&type=a340"
        );
    }
    newImage.setAttribute("class", "img-fluid");
    console.log(data);
    articleImage.appendChild(newImage);
    data.products.forEach((product) => {
        const productCard = `
        <div class="col">
            <div class="card text-center">
                <div class="card-header">
                    <div>${product.brand}</div>
                    <div>${product.SKU}</div>
                </div>
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <p class="card-text">${product.name}</p>
                </div>
            </div>
        </div>`;
        productList.insertAdjacentHTML("beforeend", productCard);
    });
}

async function likesArticle() {
    const likesBtn = document.getElementById("likes");
    const likesCnt = likesBtn.querySelector("span");
    const response = await postLikesArticle(articleId);
    if (response.ok) {
        const data = await response.json();
        likesCnt.innerText = data.likes_count;
    } else {
        const error = await response.json();
        alert(error.detail);
    }
}

// 글 삭제하기
async function handleDeleteArticle() {
    const response = await deleteArticle(articleId);
    if (response.ok) {
        window.location.href = "/index.html";
    }
}
