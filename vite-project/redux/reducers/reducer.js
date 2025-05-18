import { ADD_TO_RECENTPRODUCTS } from "../actions/actions";

const initialState = {
    recentProducts: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_RECENTPRODUCTS:
            return {
                ...state,
                recentProducts: [action.payload, ...state.recentProducts].slice(0, 10),
            };
        default:
            return state;
    }
}

export default reducer;