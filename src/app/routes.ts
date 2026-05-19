import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { OrderFormPage } from "./pages/OrderFormPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "productos", Component: ProductsPage },
      { path: "productos/:id", Component: ProductDetailPage },
      { path: "carrito", Component: CartPage },
      { path: "pedido", Component: OrderFormPage },
      { path: "confirmacion", Component: ConfirmationPage },
    ],
  },
]);
