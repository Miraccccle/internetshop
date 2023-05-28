import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addCart, delCart, delAllCart, getTotalCost } from '../redux/action';

// Define the Cart component
const Cart = ({ cartItems, totalCost, handleAdd, handleDel, handleDelAll }) => {
    // Function to render an empty cart message
    const emptyCart = () => {
        // JSX for displaying an empty cart message
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Cart is Empty</h3>
                    </div>
                </div>
            </div>
        );
    };

    // Function to render cart items
    const cartItemsRender = (product) => {
        // JSX for displaying a single cart item
        return (
            <>
                <div className="px-4 my-5 bg-light rounded-3 py-5">
                    <div className="container py-4">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <img src={product.image} alt={product.title} height="200px" width="180px" />
                            </div>
                            <div className="col-md-4">
                                <h3>{product.title}</h3>
                                <p className="lead fw-bold">
                                    {product.qty} X ${product.price} = ${(product.qty * product.price.toFixed(2)).toFixed(2)}
                                </p>
                                <button className="btn btn-outline-dark me-4" onClick={() => handleDelAll(product)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <button className="btn btn-outline-dark me-4" onClick={() => handleDel(product)}>
                                    <i className="fa fa-minus"></i>
                                </button>
                                <button className="btn btn-outline-dark" onClick={() => handleAdd(product)}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    // Function to render buttons for total cost and checkout
    const buttons = () => {
        // JSX for displaying total cost and checkout button
        return (
            <>
                <div className="container">
                    <div className="row">
                        <p className="text-center lead fw-bold">Total Cost: ${totalCost.toFixed(2)}</p>
                        <NavLink to="/checkout" className="btn btn-outline-dark mb-5 w-25 mx-auto">
                            Proceed to Checkout
                        </NavLink>
                    </div>
                </div>
            </>
        );
    };

    // Render the Cart component
    return (
        <div>
            {/* If cartItems array is empty, render empty cart message */}
            {cartItems.length === 0 && emptyCart()}
            {/* If cartItems array is not empty, render cart items */}
            {cartItems.length !== 0 && cartItems.map(cartItemsRender)}
            {/* If cartItems array is not empty, render buttons */}
            {cartItems.length !== 0 && buttons()}
        </div>
    );
};

// Map state from Redux store to component props
const mapStateToProps = (state) => ({
    cartItems: state.handleCart, // Map handleCart state to cartItems prop
    totalCost: getTotalCost(state.handleCart), // Calculate totalCost based on handleCart state
});

// Define action dispatchers using bindActionCreators
const mapDispatchToProps = {
    handleAdd: addCart, // Map addCart action to handleAdd prop
    handleDel: delCart, // Map delCart action to handleDel prop
    handleDelAll: delAllCart, // Map delAllCart action to handleDelAll prop
};

// Connect the Cart component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
