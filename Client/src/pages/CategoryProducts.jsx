// src/pages/CategoryProducts.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CategoryProducts() {
  const { id } = useParams(); // categoryId from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`http://localhost:5000/api/products/category/${id}`);
        const data = await res.json();
        if (data.status) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [id]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="category-products">
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
