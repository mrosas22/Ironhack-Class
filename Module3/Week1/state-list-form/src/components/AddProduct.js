import React, {Component} from 'react'

class AddProduct extends Component {
    constructor(){
        super();
        this.state ={
            _id   : '',
            name  : '',
            price : '',
            inStock : false

        }
    }
    onChangeHandler = (event)=>{
        // console.log('Event is: ', event.target)
        let {name, value} = event.target;
        console.log(name, value);
        //case of checkbox
        if(name === 'inStock' && value === 'on'){
            value = true;
        }

        this.setState({[name]: value})
    }
    handleFormSubmit = (event) =>{
        // console.log('The event for submit is: ', event.target)
        event.preventDefault();
        this.props.productAddition(this.state)
        this.setState({
            _id   : '',
            name  : '',
            price : '',
            inStock : false
        })
    }
    render (){
        return(
            <div>
                <h2>Add a new Product</h2>
                <form onSubmit ={event => this.handleFormSubmit(event)}>
                    <label>ID</label>
                    <input
                        onChange ={event => this.onChangeHandler(event)}
                        name ='_id'
                        type = 'text'
                        value = {this.state._id} 
                    />
                    <br />
                    <label>Name</label>
                    <input
                        onChange ={event => this.onChangeHandler(event)}
                        name ='name'
                        type = 'text'
                        value = {this.state.name} 
                    />
                    <br />
                    <label>Price</label>
                    <input
                        onChange ={event => this.onChangeHandler(event)}
                        name ='price'
                        type = 'number'
                        value = {this.state.price} 
                    />
                    <br />
                    <label>In Stock</label>
                    <input
                        onChange ={event => this.onChangeHandler(event)}
                        name ='inStock'
                        type = 'checkbox'
                        checked = {this.state.inStock} 
                    />
                    <br />
                    <button>Add Product</button>
                </form>
            </div>
        )
    }
}

export default AddProduct;
