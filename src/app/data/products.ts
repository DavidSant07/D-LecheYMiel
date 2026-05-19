import { Product } from '../context/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Crema Volteada',
    price: 18.00,
    category: 'Postres',
    image: 'https://file.garden/aJyh9202yxmfpWlA/dLCHEYMEL/crema%20volteada%201',
    description: 'Suave y deliciosa crema volteada artesanal con textura cremosa y sabor casero.',
    ingredients: ['Leche', 'Huevos', 'Azúcar', 'Vainilla'],
    allergens: {
      gluten: false,
      lactose: true,
      nuts: false,
    },
    flavors: ['Tradicional'],
    quantity: 'Porción individual',
    video: 'https://player.vimeo.com/video/example1',
  },
  {
    id: '2',
    name: 'Cuchareable Alfajor con Fresas',
    price: 16.00,
    category: 'Cuchareables',
    image: 'https://file.garden/aJyh9202yxmfpWlA/dLCHEYMEL/Alfajor%20con%20fresa%201',
    description: 'Postre cuchareable de alfajor acompañado de fresas frescas y crema.',
    ingredients: ['Galleta', 'Dulce de leche', 'Fresas', 'Crema'],
    allergens: {
      gluten: true,
      lactose: true,
      nuts: false,
    },
    flavors: ['Fresa'],
    quantity: 'Vaso individual',
    video: 'https://player.vimeo.com/video/example2',
  },
  {
    id: '3',
    name: 'Cuchareable Torta de Chocolate',
    price: 17.00,
    category: 'Cuchareables',
    image: 'https://file.garden/aJyh9202yxmfpWlA/dLCHEYMEL/Torta%20de%20chocolate%201',
    description: 'Delicioso postre cuchareable de torta de chocolate con topping especial.',
    ingredients: ['Chocolate', 'Harina', 'Crema', 'Azúcar'],
    allergens: {
      gluten: true,
      lactose: true,
      nuts: false,
    },
    flavors: ['Chocolate'],
    quantity: 'Vaso individual',
    video: 'https://player.vimeo.com/video/example3',
  },
  {
    id: '4',
    name: 'Cheesecake de Maracuyá',
    price: 18.00,
    category: 'Cheesecakes',
    image: 'https://file.garden/aJyh9202yxmfpWlA/dLCHEYMEL/Cheescake',
    description: 'Cheesecake cremoso con cobertura de maracuyá natural.',
    ingredients: ['Queso crema', 'Maracuyá', 'Galletas', 'Crema'],
    allergens: {
      gluten: true,
      lactose: true,
      nuts: false,
    },
    quantity: 'Porción individual',
    video: 'https://player.vimeo.com/video/example4',
  },
  {
    id: '5',
    name: 'Cheesecake de Frutos Rojos',
    price: 18.00,
    category: 'Cheesecakes',
    image: 'https://file.garden/aJyh9202yxmfpWlA/dLCHEYMEL/Frutossecos',
    description: 'Cheesecake artesanal acompañado de frutos rojos frescos.',
    ingredients: ['Queso crema', 'Frutos rojos', 'Galletas', 'Azúcar'],
    allergens: {
      gluten: true,
      lactose: true,
      nuts: false,
    },
    flavors: ['Frutos Rojos'],
    quantity: 'Porción individual',
  },
];

export const featuredProducts = products.slice(0, 4);

export const categories = ['Todas', 'Postres', 'Cuchareables', 'Cheesecakes'];