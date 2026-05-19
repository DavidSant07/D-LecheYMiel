import { Outlet, Link, useLocation } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

export function RootLayout() {
  const { cart } = useCart();
  const location = useLocation();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/productos', label: 'Productos' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#6D524A]/10 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
  <motion.img
    whileHover={{ scale: 1.05 }}
    src="https://file.garden/aJyh9202yxmfpWlA/dLCHEYMEL/logo.png"
    alt="Leche y Miel"
    className="h-12 w-auto object-contain"
  />
</Link>

            <div className="flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#E4835D]'
                      : 'text-[#6D524A] hover:text-[#E4835D]'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E4835D]"
                    />
                  )}
                </Link>
              ))}

              <Link to="/carrito" className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <ShoppingCart className="h-6 w-6 text-[#6D524A] hover:text-[#E4835D] transition-colors" />
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-[#E4835D] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <Outlet />

      <footer className="bg-[#301438] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#E4835D] mb-4">Leche y Miel</h3>
              <p className="text-sm opacity-90">
                Endulzamos con amor, innovando con tradición
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contacto</h4>
              <p className="text-sm opacity-90">Teléfono: +51 999 999 999</p>
              <p className="text-sm opacity-90">Email: info@lecheymiel.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Enlaces</h4>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-sm opacity-90 hover:text-[#E4835D] transition-colors">
                  Inicio
                </Link>
                <Link to="/productos" className="text-sm opacity-90 hover:text-[#E4835D] transition-colors">
                  Productos
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm opacity-75">
            © 2026 Leche y Miel. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
