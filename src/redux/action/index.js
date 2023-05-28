// Action: Add Item to Cart
export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    };
};

// Action: Delete Item From Cart
export const delCart = (product) => {
    return {
        type: "DELITEM",
        payload: product
    };
};

// Action: Delete All Items From Cart
export const delAllCart = (product) => {
    return {
        type: "DELLALLITEM",
        payload: product
    };
};

// Calculate Total Cost of Cart
export const getTotalCost = (cart) => {
    let total = 0;
    for (const item of cart) {
        total += item.price * item.qty;
    }
    return total;
};
