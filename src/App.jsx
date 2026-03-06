import { useEffect, useState } from 'react';
import { Search, ChefHat, Clock, Flame, Utensils, Star, ChevronDown, ChevronUp } from 'lucide-react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordion, setOpenAccordion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching recipes:', err);
        setLoading(false);
      });
  }, []);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <header className="hero">
        <h1>Gourmet Recipes</h1>
        <p>Discover exquisite culinary delights from around the world. Elevate your home cooking experience.</p>
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search for recipes, cuisines, ingredients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Curating recipes...</p>
          </div>
        ) : (
          <div className="recipe-container">
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <div className="card-image-wrapper">
                  <img src={recipe.image} alt={recipe.name} className="recipe-img" />
                  <div className="card-gradient"></div>
                  <div className="rating-badge">
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
                
                <div className="card-content">
                  <h2 className="recipe-title">{recipe.name}</h2>
                  
                  <div className="recipe-meta">
                    <span className="meta-item"><Clock size={14} /> {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</span>
                    <span className="meta-item"><Flame size={14} /> {recipe.caloriesPerServing} cal</span>
                    <span className="meta-item"><ChefHat size={14} /> {recipe.difficulty}</span>
                  </div>

                  <div className="tags">
                    <span className="tag">{recipe.cuisine}</span>
                    {recipe.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="card-actions">
                    <button 
                      className={`accordion-toggle ${openAccordion === recipe.id ? 'active' : ''}`}
                      onClick={() => toggleAccordion(recipe.id)}
                    >
                      <Utensils size={16} />
                      {openAccordion === recipe.id ? 'Hide Recipe' : 'View Recipe'}
                      {openAccordion === recipe.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {openAccordion === recipe.id && (
                      <div className="accordion">
                        <div className="detail-section">
                          <h3 className="detail-title">Ingredients</h3>
                          <ul>
                            {recipe.ingredients.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="detail-section">
                          <h3 className="detail-title">Instructions</h3>
                          <ol>
                            {recipe.instructions.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Gourmet Dashboard | Enhanced with React, Vite & Lucide Icons</p>
      </footer>
    </div>
  );
}

export default App;
