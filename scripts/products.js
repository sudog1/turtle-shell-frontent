window.onload = async () => {
    await loadProducts();
};

async function loadProducts() {
    const response = await getProductList();
    const productList = document.getElementById("product-list");
    if (response.ok) {
        const products = await response.json();
        products.forEach((product) => {
            const productCard = `
                <div class="col">
                    <a href="https://www.musinsa.com/app/goods/${product.id}" target="_blank" style="text-decoration: none;">
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
                    </a>
                </div>`;
            productList.insertAdjacentHTML("beforeend", productCard);
        });
    }
}
