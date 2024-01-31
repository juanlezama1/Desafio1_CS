import crypto from 'crypto'

class Product {

    constructor (title, description, price, thumbnail, stock, code)

    {
        // Antes que nada valido que me hayan enviado todos los campos
        if (!title || !description || !price || !thumbnail || !stock ||!code)

        {
            console.error("Error al declarar producto!")
            return
        }

        else

        {
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.id = crypto.randomBytes(15).toString('hex') // Genero un ID random de 15 Bytes
            this.stock = stock
            this.code = code
            console.log("Producto generado correctamente!")
        }
    }    
}

class ProductManager {

    constructor()

    {
        this.products = []
        console.log("Gestor de productos generado correctamente!")
    }

    // Recibe un objeto del tipo "Product" y lo carga al arreglo
    addProduct = (product) => {

        // Valido que el parámetro recibido sea un producto, y un producto completo
        if (!product instanceof (Product) || !product.title || !product.description || !product.price || !product.thumbnail || !product.stock ||!product.code ||!product.id)

        {
            console.error("Sólo es posible agregar productos!")
            return
        }

        // Valido que no se repita el campo "code"
        if (this.products.find(my_product => my_product.code == product.code))

        {
            console.error("Producto previamente cargado!")
            return
        }

        this.products.push(product)
        console.log(`Producto '${product.title}' agregado correctamente al arrreglo!`)
    }

    // Devolverá el arreglo de todos los productos hasta el momento 
    getProducts = () => {

        console.log(this.products)
    }

    // Buscará en el arreglo el producto que coincida el código
    getProductById = (code) => {

        const certain_product = this.products.find(product => product.code == code)

        if (certain_product)

        {
            console.log("Producto encontrado: ", certain_product)
            return
        }

        // Caso en que no haya ningún producto con ese código
        console.error("Not Found -  Producto inexistente")
    }
}


/* PRUEBAS */

// Intento generar dos productos completos
const producto1 = new Product ("Papas Fritas", "Muy ricas!", 1500, "lays.jpg", 15, "A150")
const producto2 = new Product ("Chizitos", "Crujientes", 2000, "chizitos.jpg", 20, "B280")

// Intento generar producto incompleto
const producto3 = new Product ("Palitos", "Sabrosos", 3000)

// Intento generar producto incorrecto a propósito
const producto4 = new Product ("Maní", "Salado", NaN, "mani.jpg", 30, "C350")

// Intento generar ProductManager
const productManager = new ProductManager ()

// Agrego productos correctos al array
productManager.addProduct(producto1)
productManager.addProduct(producto2)

// Agrego producto incompleto/erróneo al array
productManager.addProduct(producto3)
productManager.addProduct(producto4)

// Intento agregar un mismo producto 2 veces
const producto5 = new Product ("Pochoclo", "Dulce", 3500, "pochoclo.jpg", 45, "D167")
productManager.addProduct(producto5)
productManager.addProduct(producto5)

// Traigo todos los productos cargados hasta el momento
productManager.getProducts()

// Intento obtener un producto con código inexistente
productManager.getProductById("Z550")

// Intento obtener un producto con código existente.
productManager.getProductById("D167")