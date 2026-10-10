import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import Footer from "./components/Footer";
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";

const defaultRecipes = [
  {
    id: "vegetable-soup",
    title: "Vegetable Soup",
    image: "/images/vegetable-soup.jpg",
    description:
      "A delicious and comforting vegetable soup made with fresh vegetables and a flavorful broth.",
    ingredients: [
      "2 carrots, chopped",
      "2 potatoes, diced",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "4 cups vegetable broth",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "1 tablespoon cooking oil",
    ],
    instructions: [
      "Wash and prepare all the vegetables.",
      "Heat oil in a pot and cook the onion and garlic until fragrant.",
      "Add the carrots, potatoes, and tomatoes.",
      "Pour in the vegetable broth and bring to a boil.",
      "Simmer for 20–25 minutes until the vegetables are tender.",
      "Season with salt and pepper, then serve warm.",
    ],
  },
  {
    id: "grilled-chicken",
    title: "Grilled Chicken Sandwich",
    image: "/images/grilled-chicken-sandwich.png",
    description:
      "A tasty grilled chicken sandwich made with tender chicken, fresh vegetables, and bread.",
    ingredients: [
      "2 chicken breasts",
      "2 sandwich rolls",
      "2 lettuce leaves",
      "1 tomato, sliced",
      "4 slices of cheese (optional)",
      "2 tablespoons mayonnaise",
      "1 tablespoon cooking oil",
      "Salt, pepper, and paprika to taste",
    ],
    instructions: [
      "Season the chicken with salt, pepper, and paprika.",
      "Heat a grill pan with oil over medium heat.",
      "Cook the chicken until its internal temperature reaches 74°C (165°F).",
      "Rest the chicken briefly, then slice it.",
      "Spread mayonnaise on the sandwich rolls.",
      "Add the lettuce, tomato, chicken, and cheese, then serve.",
    ],
  },
  {
    id: "doro-wat",
    title: "Doro Wat",
    image: "/images/doro-wat.jpg",
    description:
      "A traditional Ethiopian chicken stew prepared with spices, onions, and a rich sauce.",
    ingredients: [
      "1 kg chicken pieces",
      "4 large onions, finely chopped",
      "3 tablespoons berbere spice",
      "3 cloves garlic, minced",
      "1 tablespoon grated ginger",
      "3 tablespoons niter kibbeh or cooking oil",
      "2 cups water or chicken stock",
      "4 boiled eggs (optional)",
      "Salt to taste",
    ],
    instructions: [
      "Cook the onions over medium-low heat until soft and golden.",
      "Add the niter kibbeh or oil, garlic, and ginger.",
      "Add berbere spice and cook gently, adding a little water if needed.",
      "Add the chicken pieces and stir until coated.",
      "Add the remaining water or stock and simmer until the chicken is tender and fully cooked.",
      "Season with salt and add boiled eggs if desired.",
      "Serve hot with injera.",
    ],
  },
];

function Home() {
  const [showRecipes, setShowRecipes] = useState(true);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState(defaultRecipes);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    function loadRecipes() {
      try {
        const saved = JSON.parse(
          localStorage.getItem("hiruy-recipes") || "[]"
        );

        const savedFavorites = JSON.parse(
          localStorage.getItem("hiruy-favorites") || "[]"
        );

        setRecipes([
          ...defaultRecipes,
          ...(Array.isArray(saved) ? saved : []),
        ]);

        setFavorites(
          Array.isArray(savedFavorites)
            ? savedFavorites.map(String)
            : []
        );
      } catch {
        setRecipes(defaultRecipes);
        setFavorites([]);
      }
    }

    loadRecipes();
    window.addEventListener("focus", loadRecipes);

    return () => {
      window.removeEventListener("focus", loadRecipes);
    };
  }, []);

  function handleToggleFavorite(recipeId) {
    const id = String(recipeId);

    setFavorites((currentFavorites) => {
      const updatedFavorites = currentFavorites.includes(id)
        ? currentFavorites.filter((item) => item !== id)
        : [...currentFavorites, id];

      localStorage.setItem(
        "hiruy-favorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  }

  function handleDeleteRecipe(recipeId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmed) return;

    try {
      const saved = JSON.parse(
        localStorage.getItem("hiruy-recipes") || "[]"
      );

      const updatedSaved = (
        Array.isArray(saved) ? saved : []
      ).filter(
        (recipe) =>
          String(recipe.id ?? recipe.title) !==
          String(recipeId)
      );

      localStorage.setItem(
        "hiruy-recipes",
        JSON.stringify(updatedSaved)
      );

      setRecipes([...defaultRecipes, ...updatedSaved]);

      setFavorites((currentFavorites) => {
        const updatedFavorites = currentFavorites.filter(
          (id) => id !== String(recipeId)
        );

        localStorage.setItem(
          "hiruy-favorites",
          JSON.stringify(updatedFavorites)
        );

        return updatedFavorites;
      });
    } catch {
      window.alert("Could not delete this recipe. Please try again.");
    }
  }

  function handleEditRecipe(recipeId) {
    const recipe = recipes.find(
      (item) =>
        String(item.id ?? item.title) === String(recipeId)
    );

    if (!recipe) return;

    const newTitle = window.prompt(
      "Edit recipe name:",
      recipe.title
    );

    if (newTitle === null) return;

    if (!newTitle.trim()) {
      window.alert("Recipe name cannot be empty.");
      return;
    }

    const newImage = window.prompt(
      "Edit image URL:",
      recipe.image
    );

    if (newImage === null) return;

    if (!newImage.trim()) {
      window.alert("Image URL cannot be empty.");
      return;
    }

    const newDescription = window.prompt(
      "Edit description:",
      recipe.description
    );

    if (newDescription === null) return;

    if (!newDescription.trim()) {
      window.alert("Description cannot be empty.");
      return;
    }

    const newIngredients = window.prompt(
      "Edit ingredients (write each on a new line):",
      (recipe.ingredients || []).join("\n")
    );

    if (newIngredients === null) return;

    const newInstructions = window.prompt(
      "Edit cooking instructions (write each step on a new line):",
      (recipe.instructions || []).join("\n")
    );

    if (newInstructions === null) return;

    const updatedRecipe = {
      ...recipe,
      title: newTitle.trim(),
      image: newImage.trim(),
      description: newDescription.trim(),
      ingredients: newIngredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: newInstructions
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const saved = JSON.parse(
        localStorage.getItem("hiruy-recipes") || "[]"
      );

      const updatedSaved = (
        Array.isArray(saved) ? saved : []
      ).map((item) =>
        String(item.id ?? item.title) === String(recipeId)
          ? updatedRecipe
          : item
      );

      localStorage.setItem(
        "hiruy-recipes",
        JSON.stringify(updatedSaved)
      );

      setRecipes([...defaultRecipes, ...updatedSaved]);
      window.alert("Recipe updated successfully!");
    } catch {
      window.alert("Could not update the recipe. Please try again.");
    }
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFavorites =
      !showFavoritesOnly ||
      favorites.includes(String(recipe.id ?? recipe.title));

    return matchesSearch && matchesFavorites;
  });

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Header />

      <main>
        <section
          id="home"
          className="px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-5 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                Welcome to Hiruy Recipe Platform
              </p>

              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                Good food starts with{" "}
                <span className="text-green-700">
                  great recipes.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-stone-600 sm:text-lg">
                Discover delicious recipes, explore new flavors,
                and bring people together through the joy of
                cooking. Your next favorite meal starts here.
              </p>

              <a
                href="#recipes"
                className="mt-8 inline-flex rounded-full bg-green-800 px-7 py-3.5 font-semibold text-white transition hover:bg-green-900"
              >
                Explore Recipes →
              </a>
            </div>

            <div>
              <img
                src="/images/vegetable-soup.jpg"
                alt="Fresh homemade vegetable soup"
                className="h-72 w-full rounded-3xl object-cover shadow-xl sm:h-96 lg:h-[440px]"
              />
            </div>
          </div>
        </section>

        <section
          id="recipes"
          className="px-5 py-20 sm:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-green-800">
                  Our Collection
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                  Explore Our Recipes
                </h2>

                <p className="mt-3 max-w-xl leading-7 text-stone-600">
                  Find inspiration for your next homemade meal.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowRecipes(!showRecipes)}
                aria-expanded={showRecipes}
                className="self-start rounded-full border border-green-800 px-6 py-3 font-semibold text-green-900 transition hover:bg-green-800 hover:text-white"
              >
                {showRecipes ? "Hide Recipes" : "Show Recipes"}
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search recipes by name..."
                className="w-full rounded-full border border-stone-300 bg-white px-5 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowFavoritesOnly(!showFavoritesOnly)
                }
                aria-pressed={showFavoritesOnly}
                className={`shrink-0 rounded-full border px-5 py-3 font-semibold transition ${
                  showFavoritesOnly
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-red-200 bg-white text-red-700 hover:bg-red-50"
                }`}
              >
                {showFavoritesOnly
                  ? "♥ Showing Favorites"
                  : "♡ Show Favorites"}
              </button>
            </div>

            {showRecipes && (
              <>
                <p className="mt-6 text-sm text-stone-500">
                  {filteredRecipes.length} recipe
                  {filteredRecipes.length === 1 ? "" : "s"} found
                </p>

                {filteredRecipes.length > 0 ? (
                  <div className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredRecipes.map((recipe) => {
                      const recipeId = String(
                        recipe.id ?? recipe.title
                      );

                      const isUserAdded = !defaultRecipes.some(
                        (item) =>
                          String(item.id ?? item.title) === recipeId
                      );

                      return (
                        <RecipeCard
                          key={recipeId}
                          id={recipeId}
                          title={recipe.title}
                          image={recipe.image}
                          description={recipe.description}
                          isUserAdded={isUserAdded}
                          onDelete={handleDeleteRecipe}
                          onEdit={handleEditRecipe}
                          isFavorite={favorites.includes(recipeId)}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-8 rounded-2xl bg-white p-10 text-center">
                    <p className="text-lg font-semibold text-stone-800">
                      No recipes found.
                    </p>
                    <p className="mt-2 text-stone-500">
                      Try another search or change your favorites filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setShowFavoritesOnly(false);
                      }}
                      className="mt-5 rounded-full bg-green-800 px-5 py-3 font-semibold text-white hover:bg-green-900"
                    >
                      Show All Recipes
                    </button>
                  </div>
                )}
              </>
            )}

            {!showRecipes && (
              <p className="mt-10 rounded-2xl bg-white p-8 text-center text-stone-600">
                Your recipes are hidden. Select "Show Recipes"
                to explore the collection again.
              </p>
            )}
          </div>
        </section>

        <section className="mx-5 mb-16 rounded-3xl bg-green-900 px-6 py-14 text-center sm:mx-8 sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Bring something delicious to the table.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-100">
            Discover your next favorite homemade meal.
          </p>

          <a
            href="/add-recipe"
            className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 font-semibold text-green-900 transition hover:bg-green-50"
          >
            Share Your Recipe
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/recipe/:id" element={<Recipe />} />
    </Routes>
  );
}

export default App;
