const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);
const productDiv = document.querySelector("#product");
(async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await response.json();
    console.log(product);

    productDiv.innerHTML = `
<div class="max-w-4xl mx-auto p-8">
    <div class="bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700">

        <div class="flex flex-col lg:flex-row gap-10">

            <div class="lg:w-2/5">
                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                    class="w-full rounded-xl border border-slate-600"
                >
            </div>

            <div class="lg:w-3/5 flex flex-col">

                <h1 class="text-4xl font-bold text-white">
                    ${product.title}
                </h1>

                <p class="text-emerald-400 text-3xl font-bold mt-4">
                    $${product.price}
                </p>

                <p class="text-slate-300 leading-7 mt-6">
                    ${product.description}
                </p>

                <div class="mt-8">
                    <button
                        onclick="addToCart(${product.id})"
                        class="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>

            </div>

        </div>

    </div>
</div>
`;
  } catch {}
})();

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  const product = cart.find((item) => item.id === id);
  if (!product) {
    cart.push({ id: id, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    product.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
