import { ADD_TO_RECENTPRODUCTS } from "../actions/actions";

const initialState = {
    recentProducts: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_RECENTPRODUCTS:
            // Check if product already exists in recentProducts by comparing key properties
            // Using a combination of properties to identify unique products
            const existingProductIndex = state.recentProducts.findIndex(
                product => {
                    // If products have IDs, use that for comparison
                    if (product.id && action.payload.id) {
                        return product.id === action.payload.id;
                    }
                    
                    // Otherwise, compare using a combination of title and image URL
                    return (
                        (product.title === action.payload.title && 
                         product.img === action.payload.img) ||
                        (product.title === action.payload.title && 
                         product.image === action.payload.image)
                    );
                }
            );
            
            if (existingProductIndex !== -1) {
                // If product exists, remove it from its current position
                const updatedProducts = [...state.recentProducts];
                updatedProducts.splice(existingProductIndex, 1);
                
                // Add it to the beginning (most recently viewed)
                return {
                    ...state,
                    recentProducts: [action.payload, ...updatedProducts].slice(0, 10),
                };
            } else {
                // If product doesn't exist, add it to the beginning
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