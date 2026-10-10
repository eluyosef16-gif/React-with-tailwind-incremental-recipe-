function RecipeCard({
  id,
  title,
  image,
  description,
  isUserAdded,
  onDelete,
  onEdit,
  isFavorite,
  onToggleFavorite,
}) {
  const recipeId = String(id ?? title);

  return (
    <article className="group overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={() => onToggleFavorite(recipeId)}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          title={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow-md transition hover:scale-110 ${
            isFavorite ? "text-red-600" : "text-stone-500"
          }`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-green-800">
          {isFavorite ? "♥ Your Favorites" : "From Our Kitchen"}
        </p>

        <h3 className="text-xl font-bold leading-snug text-stone-900 transition group-hover:text-green-800">
          {title}
        </h3>

        <p className="mt-3 min-h-20 text-sm leading-7 text-stone-600">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={`/recipe/${encodeURIComponent(recipeId)}`}
            className="font-semibold text-green-800 transition hover:text-green-950"
          >
            View Recipe →
          </a>

          {isUserAdded && (
            <>
              <button
                type="button"
                onClick={() => onEdit(recipeId)}
                className="rounded-full border border-green-200 px-4 py-2 text-sm font-semibold text-green-800 transition hover:bg-green-50"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(recipeId)}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
