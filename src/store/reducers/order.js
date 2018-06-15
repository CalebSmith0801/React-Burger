import * as actionTypes from "../actions/actionTypes";

const initial_state = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initial_state, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            };
        case actionTypes.PURHCASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_FAILED:
            return{
                ...state,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:   //can add all same action type to multiple reducers and they will all be executed
            return {
                ...state,
                orders: []
            }
        default:
            return state;
    }
};

export default reducer;