import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AddRecipe() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newRecipe = {
      id: Date.now().toString(),
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
      ingredients: ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: instructions
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const savedRecipes = JSON.parse(
        localStorage.getItem("hiruy-recipes") || "[]"
      );

      const recipes = Array.isArray(savedRecipes)
        ? savedRecipes
        : [];

      localStorage.setItem(
        "hiruy-recipes",
        JSON.stringify([...recipes, newRecipe])
      );

      setTitle("");
      setImage("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setMessage("Recipe added successfully!");

    } catch {
      setMessage("Could not save your recipe. Please try again.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-green-700 focus:ring-2 focus:ring-green-100";

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Header />

      <main className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-800">
              Share Your Creation
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Add a New Recipe
            </h1>

            <p className="mt-4 leading-7 text-stone-600">
              Share your favorite dish and inspire others to cook.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10"
          >
            {/* Recipe Name */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-stone-800"
              >
                Recipe Name
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Ethiopian Lentil Stew"
                className={inputClass}
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-stone-800"
              >
                Recipe Image URL
              </label>

              <input
                id="image"
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://example.com/food.jpg"
                className={inputClass}
                required
              />

              <p className="mt-2 text-xs text-stone-500">
                Enter a direct link to an image on the web.
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-stone-800"
              >
                Recipe Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the dish and its flavors..."
                rows={4}
                className={inputClass}
                required
              />
            </div>

            {/* Ingredients */}
            <div>
              <label
                htmlFor="ingredients"
                className="mb-2 block text-sm font-semibold text-stone-800"
              >
                Ingredients
              </label>

              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(event) => setIngredients(event.target.value)}
                placeholder={"2 carrots\n1 onion\n2 potatoes\nSalt to taste"}
                rows={6}
                className={inputClass}
                required
              />

              <p className="mt-2 text-xs text-stone-500">
                Write each ingredient on a separate line.
              </p>
            </div>

            {/* Instructions */}
            <div>
              <label
                htmlFor="instructions"
                className="mb-2 block text-sm font-semibold text-stone-800"
              >
                Cooking Instructions
              </label>

              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                placeholder={"Wash and prepare the vegetables.\nHeat oil in a pot.\nAdd ingredients and cook until ready."}
                rows={7}
                className={inputClass}
                required
              />

              <p className="mt-2 text-xs text-stone-500">
                Write each cooking step on a separate line.
              </p>
            </div>

            {/* Success or Error Message */}
            {message && (
              <p
                role="status"
                className={`rounded-xl p-4 text-sm font-medium ${
                  message.startsWith("Recipe added")
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-full bg-green-800 px-6 py-3.5 font-semibold text-white transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
            >
              Add Recipe
            </button>

            <Link
              to="/"
              className="block text-center text-sm font-medium text-stone-600 transition hover:text-green-800"
            >
              ← Back to Home
            </Link>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AddRecipe;
