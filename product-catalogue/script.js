const products = [
    { name: 'Product 1', price: '$10', image: 'https://via.placeholder.com/50' },
    { name: 'Product 2', price: '$20', image: 'https://via.placeholder.com/50' },
    { name: 'Product 3', price: '$30', image: 'https://via.placeholder.com/50' },
    { name: 'Product 4', price: '$40', image: 'https://via.placeholder.com/50' },
    { name: 'Product 5', price: '$50', image: 'https://via.placeholder.com/50' },
    { name: 'Product 6', price: '$60', image: 'https://via.placeholder.com/50' },
    { name: 'Product 7', price: '$70', image: 'https://via.placeholder.com/50' },
    { name: 'Product 8', price: '$80', image: 'https://via.placeholder.com/50' },
    { name: 'Product 9', price: '$90', image: 'https://via.placeholder.com/50' },
    { name: 'Product 10', price: '$100', image: 'https://via.placeholder.com/50' },
    { name: 'Product 11', price: '$110', image: 'https://via.placeholder.com/50' },
    { name: 'Product 12', price: '$120', image: 'https://via.placeholder.com/50' },
    { name: 'Product 13', price: '$130', image: 'https://via.placeholder.com/50' },
    { name: 'Product 14', price: '$140', image: 'https://via.placeholder.com/50' },
    { name: 'Product 15', price: '$150', image: 'https://via.placeholder.com/50' },
  ];
  
  let currentPage = 1;
  const productsPerPage = 5;
  
  function displayProducts() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';
  
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = currentPage * productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
  
    currentProducts.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${product.image}" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
      `;
      tableBody.appendChild(row);
    });
  
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage * productsPerPage >= products.length;
  }
  
  function changePage(direction) {
    currentPage += direction;
    displayProducts();
  }
  
  window.onload = displayProducts;
  