let productId;

window.onload = async function () {
    const urlParms = new URLSearchParams(window.location.search);
    productId = urlParms.get("product_id");
    await renderProductDetail();
};

async function renderProductDetail() {
    const response = await getProductDetail(productId);
    const brandLogo = document.getElementById("brand-logo");
    const brandName = document.getElementById("brand-name");
    const productImage = document.getElementById("product-image");
    const SKU = document.getElementById("SKU");
    const productName = document.getElementById("product-name");
    const price = document.getElementById("price");
    const productLink = document.getElementById("product-link");
    if (response.ok) {
        const data = await response.json();
        brandLogo.src = data.brand.image;
        brandName.textContent = data.brand.name;
        SKU.textContent = data.SKU;
        productName.textContent = data.name;
        price.textContent = data.price;
        productImage.src = data.image;
        productLink.href = `https://www.musinsa.com/app/goods/${data.id}`;
    }
}
