import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Product, { loader as productsLoader, action as updateAvailabilityAction} from './views/Products'
import NewProductst, { action as NewProduct} from './views/NewProducts'
import EditProduct, { loader as productEditLoader, action as editProductAction} from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'

export const router= createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Product/>,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevos',
                element: <NewProductst/>,
                action: NewProduct

            },
            {
                path: 'product/:id/editar', // ROA patterns
                element: <EditProduct/>,
                loader: productEditLoader,
                action: editProductAction
            },
            {
                path: 'product/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
])