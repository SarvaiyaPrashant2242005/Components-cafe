// src/components/CategoryCard.jsx
import { useNavigate } from "react-router-dom";

function CategoryCard({ id, title, image }) {
  const navigate = useNavigate();

  return (
    <div 
      className="category-card"
      onClick={() => navigate(`/category/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}

export default CategoryCard;
