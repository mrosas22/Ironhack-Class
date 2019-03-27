import React, {Component} from 'react'
import AddProduct from './AddProduct'

class ProductsList extends Component {
    constructor (){
        super();
        this.state = {
            showInStock: false,
            products : [
                {
                    _id   : '34rg',
                    name  : 'iPhone X',
                    price : 799.99,
                    inStock : true
                },
                {
                    _id   : '36gu',
                    name  : 'iron',
                    price : 29.99,
                    inStock : false
                },
                {
                    _id   : '97ux',
                    name  : 'Coffee Mug',
                    price : 9.00,
                    inStock : true
                }
            ]
        }
    }
    checkIfInStock(){
        this.setState({
            showInStock: !this.state.showInStock
        })
    }
    deleteProduct (whichOne){
        console.log('Which product I am deleting')
        const {products} = this.state
        //Make a copy of the array
        const productsCopy = [...products];
        //remove element from array
        productsCopy.splice(whichOne,1);//whichOne is the index and 1 is the number of elements to remove
        //update the state
        this.setState({
            products: productsCopy
        })

    }
    addNewProduct (newProduct){
        // console.log('adding:', newProduct)
        const prodCopy = [...this.state.products];
        prodCopy.push(newProduct)
        this.setState({products: prodCopy})
    }
    render (){
        const {products, showInStock} = this.state
        return (
            <div>
                <AddProduct productAddition ={productToBeSaved => this.addNewProduct(productToBeSaved)}/>
                <button onClick = { () => this.checkIfInStock()}>{showInStock ? 'All products' : 'In Stock' }</button>
                <ul>
                    {products.map((oneProduct, index) => {
                        return(//                               then (execute)
                            (!showInStock || oneProduct.inStock) && (
                                <li key={oneProduct._id}> 
                                    <h3>{oneProduct.name}</h3>
                                    <p>{oneProduct.price}</p>
                                    {oneProduct.inStock ? <p>In Stock</p> : <p>Out of Stock</p>}
                                    <button onClick={() => this.deleteProduct(index)}>Delete</button>
                                </li>
                            )
                           
                        )
                    })}
                </ul>
            </div>
        )
    }

}

export default ProductsList