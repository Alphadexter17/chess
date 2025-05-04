fetch('/api/products')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('productList');

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';

      card.innerHTML = `
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">₹${product.price}</p>
          </div>
        </div>
      `;

      productList.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching product data:', error));
