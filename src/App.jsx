import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data.recipes))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Delicious Recipes</h1>
      </header>

      <main className="recipe-container">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} className="recipe-img" />
            <h2>{recipe.name}</h2>
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p>
            <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Calories/Serving:</strong> {recipe.caloriesPerServing}</p>
            <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
            <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>

            <button className="accordion-toggle" onClick={() => toggleAccordion(recipe.id)}>
              {openAccordion === recipe.id ? 'Hide Details' : 'View Ingredients & Instructions'}
            </button>

            {openAccordion === recipe.id && (
              <div className="accordion">
                <div>
                  <strong>Ingredients:</strong>
                  <ul>
                    {recipe.ingredients.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Instructions:</strong>
                  <ol>
                    {recipe.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Recipe App | Built with React + Vite</p>
      </footer>
    </div>
  );
}

export default App;
