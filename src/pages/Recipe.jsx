import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

function Recipe() {
  const { id } = useParams();

  let savedRecipes = [];

  try {
    savedRecipes = JSON.parse(
      localStorage.getItem("hiruy-recipes") || "[]"
    );
  } catch {
    savedRecipes = [];
  }

  const recipes = [
    ...defaultRecipes,
    ...(Array.isArray(savedRecipes) ? savedRecipes : []),
  ];

  const recipe = recipes.find(
    (item) =>
      String(item.id ?? item.title) === decodeURIComponent(id || "")
  );

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Header />

      <main className="px-5 py-12 sm:px-8 sm:py-16">
        {recipe ? (
          <article className="mx-auto max-w-4xl">
            <Link
              to="/"
              className="inline-flex rounded-full px-4 py-2 font-semibold text-green-800 transition hover:bg-green-100"
            >
              ← Back to Recipes
            </Link>

            <img
              src={recipe.image}
              alt={recipe.title}
              className="mt-6 h-72 w-full rounded-3xl object-cover shadow-md sm:h-[450px]"
            />

            <div className="mt-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-800">
                From Our Kitchen
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                {recipe.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600 sm:text-lg">
                {recipe.description}
              </p>
            </div>

            <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-stone-900">
                Ingredients
              </h2>

              <ul className="mt-6 space-y-4">
                {(recipe.ingredients || []).map(
                  (ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-stone-700"
                    >
                      <span className="text-green-700">✓</span>
                      <span>{ingredient}</span>
                    </li>
                  )
                )}
              </ul>

              {(!recipe.ingredients ||
                recipe.ingredients.length === 0) && (
                <p className="mt-4 text-stone-500">
                  Ingredients have not been added yet.
                </p>
              )}
            </section>

            <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-stone-900">
                Cooking Instructions
              </h2>

              <ol className="mt-6 space-y-6">
                {(recipe.instructions || []).map(
                  (instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-800 text-sm font-bold text-white">
                        {index + 1}
                      </span>

                      <p className="pt-1 leading-7 text-stone-700">
                        {instruction}
                      </p>
                    </li>
                  )
                )}
              </ol>

              {(!recipe.instructions ||
                recipe.instructions.length === 0) && (
                <p className="mt-4 text-stone-500">
                  Cooking instructions have not been added yet.
                </p>
              )}
            </section>

            <div className="mt-10 text-center">
              <Link
                to="/"
                className="inline-flex rounded-full bg-green-800 px-7 py-3.5 font-semibold text-white transition hover:bg-green-900"
              >
                Explore More Recipes →
              </Link>
            </div>
          </article>
        ) : (
          <div className="py-16 text-center">
            <h1 className="text-3xl font-bold text-stone-900">
              Recipe Not Found
            </h1>

            <p className="mt-4 text-stone-600">
              Sorry, we couldn't find that recipe.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-900"
            >
              Back to Recipes
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Recipe;
