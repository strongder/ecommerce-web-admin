import Home from "../pages/Home/Home";
import AccountDetail from "../pages/Account/AccountDetail";
import AccountView from "../pages/Account/AccountView";
import ProductDetail from "../pages/Product/ProductDetail";
import ProductUpdate from "../pages/Product/ProductUpdate";
import ProductView from "../pages/Product/ProductView";
import CategoryView from "../pages/Category/CategoryView";
import OrderView from "../pages/Order/OrderView";
import OrderDetail from "../pages/Order/OrderDetail";
import PaymentView from "../pages/Payment/PaymentView";


const privateRoutes = [
    {path: '/', page: Home},
    {path: '/products', page: ProductView},
    {path: '/products/:id', page: ProductDetail},
    {path: '/products/update/:id', page: ProductUpdate},
    {path: '/accounts', page: AccountView},
    {path: '/accounts/:id', page: AccountDetail},
    {path: '/categories', page: CategoryView},
    {path: '/orders', page: OrderView},
    {path: '/orders/:id', page: OrderDetail},
    {path: '/payments', page: PaymentView},
    

]

export default privateRoutes;