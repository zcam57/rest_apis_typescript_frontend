import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom"
import { getProduct, updatedProductAvailability } from "../services/ProductService"
import type { Product } from "../types"
import ProductDetails from "../components/ProductDetails"
import { keyof } from "valibot"

export async function loader(){
   const products = await getProduct()
   return products
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    await updatedProductAvailability(+data.id)
    return {}
}

export default function Product() {
    const products = useLoaderData() as Product[]
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-bold text-slate-800" >Productos</h2>

                <Link to='productos/nuevos' className="rounded-lg bg-indigo-600 text-white  font-bold p-3 hover:bg-indigo-500">
                    Agregar Producto
                </Link>
            
            </div>
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => ( 
                            <ProductDetails
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}