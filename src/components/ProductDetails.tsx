import { deleteProduct } from "../services/ProductService"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { useNavigate, Form, type ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"

type ProductDetailsProps = {
    product: Product
}
export async function action({ params }: ActionFunctionArgs){

    if(params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect ('/')
    }
   
}

export default function ProductDetails( {product}: ProductDetailsProps) {
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

  return (
     <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method="POST">
                <button type='submit' name='id' value={product.id} className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer`}>
                    {isAvailable ? 'Disponible' : 'No Disponible'}
                </button>
            </fetcher.Form>
            
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className= 'flex gap-2 items-center'>
                <button onClick ={() => navigate(`product/${product.id}/editar`) } className= 'bg-indigo-600 text-white p-2 w-full  font-bold uppercase text-xs text-center rounded-lg'>Editar</button>
                <Form className="w-full" method="post" action={`product/${product.id}/eliminar`} onSubmit={(e) => {if(!confirm('Eliminar?')){ e.preventDefault() } }}>
                        <input
                            type="submit"
                            value='Eliminar'
                            className= 'bg-red-600 text-white p-2 w-full  font-bold uppercase text-xs text-center cursor-pointer rounded-lg'
                        />
                </Form>
            </div>
        </td>
    </tr> 
  )
}
