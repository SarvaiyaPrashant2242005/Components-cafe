// src/pages/Home.jsx
import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import "./Home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://components-cafe.onrender.com/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page">
      <h1>Categories</h1>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="categories">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <CategoryCard
                key={cat._id || cat.id}
                id={cat._id || cat.id}   // ✅ Pass id to CategoryCard
                title={cat.title || cat.name}
                image={cat.image}
              />
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
