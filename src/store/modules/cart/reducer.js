import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART_SUCCESS':
      return produce(state, (draft) => {
        const { prod } = action;

        draft.push(prod);
      });
    case 'REMOVE_FROM_CART':
      return produce(state, (draft) => {
        const prodIndex = draft.findIndex((p) => p.id === action.id);

        if (prodIndex >= 0) {
          draft.splice(prodIndex, 1);
        }
      });
    case 'UPDATE_AMOUNT_SUCCESS': {
      return produce(state, (draft) => {
        const prodIndex = draft.findIndex((p) => p.id === action.id);

        if (prodIndex >= 0) {
          draft[prodIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
