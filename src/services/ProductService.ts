import { DraftProductSchema, ProductsSchema, ProductSchema} from "../types"
import type { Product } from "../types"
import { pipe, transform, number, minValue, string, safeParse, parse} from "valibot"
import axios from "axios"
import { toBoolean } from "../utils"

type ProductData ={
    [k: string]: FormDataEntryValue
}

export async function createProduct(data: ProductData){
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            console.log(result.output)
            const url = `${import.meta.env.VITE_DATA_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Informacion Invalida')
        }
    } catch (error) {
        console.error(error)
    }
}

export async function getProduct() {
    try {
         const url = `${import.meta.env.VITE_DATA_URL}/api/products`
         const { data } = await axios(url)
         const result = safeParse(ProductsSchema, data.data)
         if (result.success) {
            return result.output
         } else {
            throw new Error('Informacion Invalida...')
         }
    } catch(error) {
        console.log(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
         const url = `${import.meta.env.VITE_DATA_URL}/api/products/${id}`
         const { data } = await axios(url)
         const result = safeParse(ProductSchema, data.data)
         if (result.success) {
            return result.output
         } else {
            throw new Error('Informacion Invalida...')
         }
    } catch(error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        const NumberSchema =  pipe(string(), transform(Number), number(), minValue(0))
        const result = safeParse(ProductSchema, {
            id: id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        
        if(result.success) {
            const url = `${import.meta.env.VITE_DATA_URL}/api/products/${id}`
           /* await axios.put(url, {
                name: result.output.name,
                price: result.output.price,
                availability: result.output.availability}
                
            )*/
           await axios.put(url, result.output)
        }

    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        console.log('desde service', id)
        const url = `${import.meta.env.VITE_DATA_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updatedProductAvailability(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_DATA_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}