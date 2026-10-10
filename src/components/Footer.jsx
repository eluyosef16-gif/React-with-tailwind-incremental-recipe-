
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  function handleBackToTop(event) {
    event.preventDefault();

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <footer className="border-t border-stone-200 bg-stone-950 px-5 py-12 text-center text-white sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <a
          href="/"
          className="text-2xl font-bold tracking-tight text-white transition hover:text-green-300"
        >
          Hiruy <span className="text-green-400">Recipes</span>
        </a>

        <p className="mt-3 max-w-md text-sm leading-7 text-stone-400">
          Discover delicious recipes, explore new flavors, and
          bring the joy of cooking into your home.
        </p>

        <div className="my-7 h-px w-20 bg-green-700" />

        <a
          href="#top"
          onClick={handleBackToTop}
          className="rounded-full border border-stone-700 px-5 py-2.5 text-sm font-medium text-stone-200 transition hover:border-green-400 hover:bg-green-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Back to Top ↑
        </a>

        <p className="mt-8 text-xs text-stone-500">
          © 2026 Hiruy Recipe Platform. All rights reserved.
        </p>

        <p className="mt-2 text-xs text-stone-500">
          Made with care for food lovers.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
