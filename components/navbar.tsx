import CartComponent from "@/components/cart";

export default function Navbar() {
  return (
    <header className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <img
              src="/icon.png"
              alt="Fizzify"
              className="w-8 h-8 rounded-md"
              width={30}
              height={30}
            />
            <h1 className="text-xl font-bold text-gray-900">Fizzify</h1>
          </a>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-900 font-medium">
                Home
              </a>
              <a
                href="/masterhead"
                className="text-gray-500 hover:text-gray-900"
              >
                Masterhead
              </a>
            </nav>
            <CartComponent />
          </div>
        </div>
      </div>
    </header>
  );
}
