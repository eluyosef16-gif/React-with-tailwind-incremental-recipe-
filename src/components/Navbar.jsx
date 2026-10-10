
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5">
      <Link
        to="/"
        className="rounded-full px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-green-100 hover:text-green-900"
      >
        Home
      </Link>

      <Link
        to="/add-recipe"
        className="rounded-full px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-green-100 hover:text-green-900"
      >
        + Add a Recipe
      </Link>
    </div>
  );
}

export default Navbar;
