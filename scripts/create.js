async function addStyleList() {
    const stylesForm = document.getElementById("style");
    const response = await getStyleList();
    if (response.ok) {
        const styles = await response.json();
        for (const { id, name } of styles) {
            let option = document.createElement("option");
            option.value = id;
            option.innerText = name;
            stylesForm.appendChild(option);
        }
    }
}

addStyleList();

const selectProducts = new Set();
async function addProduct() {
    const productId = document.getElementById("product-input").value;
    if (!productId | selectProducts.has(productId)) {
        return;
    }
    selectProducts.add(productId);
    const productList = document.getElementById("product-list");
    const response = await handleAddProduct(productId);
    if (response.ok) {
        const product = await response.json();
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
    } else {
        const error = await response.json();
        alert(error.detail);
    }
}

async function createArticle() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const style = document.getElementById("style").value;
    const image = document.getElementById("image").files[0];

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("style", style);
    formData.append("image", image);
    Array.from(selectProducts).forEach((item) => {
        formData.append("products", item);
    });

    const response = await postArticle(formData);

    if (response.ok) {
        window.location.href = "/index.html";
    } else {
        const error = await response.json();
        console.log(error);
        alert(error.detail);
    }
}
