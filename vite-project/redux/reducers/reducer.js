import { ADD_TO_RECENTPRODUCTS } from "../actions/actions";

const initialState = {
    recentProducts: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_RECENTPRODUCTS:
            const existingProductIndex = state.recentProducts.findIndex(
                product => {
                    if (product.id && action.payload.id) {
                        return product.id === action.payload.id;
                    }
                    
                    return (
                        (product.title === action.payload.title && 
                         product.img === action.payload.img) ||
                        (product.title === action.payload.title && 
                         product.image === action.payload.image)
                    );
                }
            );
            
            if (existingProductIndex !== -1) {
                const updatedProducts = [...state.recentProducts];
                updatedProducts.splice(existingProductIndex, 1);
                
                return {
                    ...state,
                    recentProducts: [action.payload, ...updatedProducts].slice(0, 10),
                };
            } else {
                return {
                    ...state,
                    recentProducts: [action.payload, ...state.recentProducts].slice(0, 10),
                };
            }
        default:
            return state;
    }
}

export default reducer;