import Cookies from 'js-cookie';

const cartCookieName = 'cart';

// Function to get initial cart state from cookie
const getInitialCartState = () => {
    const cartFromCookie = Cookies.get(cartCookieName);
    return cartFromCookie ? JSON.parse(cartFromCookie) : [];
};

// Reducer function to handle cart state and actions
const handleCart = (state = getInitialCartState(), action) => {
    const product = action.payload;

    switch (action.type) {
        case 'ADDITEM':
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                return [
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    },
                ];
            }

        case 'DELITEM':
            const exist1 = state.find((x) => x.id === product.id);
            if (exist1.qty === 1) {
                return state.filter((x) => x.id !== exist1.id);
            } else {
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty - 1 } : x
                );
            }

        case 'DELLALLITEM':
            const exist2 = state.find((x) => x.id === product.id);
            return state.filter((x) => x.id !== exist2.id);

        default:
            return state;
    }
};

// Middleware function to save cart state to cookie
export const saveCartToCookie = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    Cookies.set(cartCookieName, JSON.stringify(state.handleCart));
    return result;
};

export default handleCart;
