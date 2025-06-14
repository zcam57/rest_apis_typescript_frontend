import type { Product } from "../types"

type ProductFormProps = {
    product?: Product
}

export default function EditForm({product}: ProductFormProps) {
  return (
    <>
    <div className="mb-4">
          <label className="text-slate-800 font-bold" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
            defaultValue = {product?.name}
          />
        </div>
        <div className="mb-4">
          <label className="text-slate-800 font-bold" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
            defaultValue = {product?.price}
          />
        </div>
    
    </>
  )
}
