import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { createProduct } from "../services/ProductService";
import EditForm from "../components/EditForm";

export async function action({ request }: ActionFunctionArgs){
    const data =  Object.fromEntries(await request.formData())
    let error = ''

    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios'
        
    } if(error.length){
        return error
    }

    await createProduct(data)
    return redirect('/')
}

export default function NewProductst() {
    const error = useActionData() as string

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold text-slate-800">
          Registrar Productos
        </h2>

        <Link
          to="/"
          className="rounded-lg bg-indigo-600 text-white  font-bold p-3 hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage> }
      <Form className="mt-10" method="POST">
          <EditForm/>
       
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
