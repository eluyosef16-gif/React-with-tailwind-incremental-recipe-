
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#faf9f6]/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-4 sm:px-8 md:flex-row">
        {/* Logo */}
        <a
  href="/"
  className="flex items-center gap-3 no-underline"
>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-800 text-2xl text-white shadow-sm">
            <span aria-hidden="true">H</span>
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-stone-900">
              Hiruy
              <span className="text-green-800"> Recipes</span>
            </h1>

            <p className="text-xs tracking-wide text-stone-500">
              GOOD FOOD, GOOD MOMENTS
            </p>
          </div>
        </a>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Navbar />
        </nav>

        {/* Call to Action */}
        <a
          href="#recipes"
          className="hidden rounded-full bg-green-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 lg:inline-flex"
        >
          Explore Recipes →
        </a>
      </div>
    </header>
  );
}

export default Header;
