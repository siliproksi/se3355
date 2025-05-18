export const ADD_TO_RECENTPRODUCTS = 'ADD_TO_RECENTPRODUCTS';

export const addToRecentProducts = (recentProduct) => ({
  type: ADD_TO_RECENTPRODUCTS,
  payload: recentProduct,
});
