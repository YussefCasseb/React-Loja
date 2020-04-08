import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';

import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from '../../styles/cart';
import * as CartActions from '../../store/modules/cart/actions';

export default function Cart() {
  const cartProds = useSelector((state) =>
    state.cart.map((prod) => ({
      ...prod,
      subtotal: formatPrice(prod.price * prod.amount),
    }))
  );

  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce((sumTotal, prod) => {
        return sumTotal + prod.price * prod.amount;
      }, 0)
    )
  );

  const dispatch = useDispatch();

  function increment(prod) {
    dispatch(CartActions.updateAmountRequest(prod.id, prod.amount + 1));
  }

  function decrement(prod) {
    dispatch(CartActions.updateAmountRequest(prod.id, prod.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QUANTIDADE</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cartProds.map((prod) => (
            <tr>
              <td>
                <img src={prod.image} alt={prod.title} />
              </td>
              <td>
                <strong>{prod.title}</strong>
                <span>{prod.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(prod)}>
                    <MdRemoveCircleOutline color="#7159c1" size={20} />
                  </button>
                  <input type="number" readOnly value={prod.amount} />
                  <button type="button" onClick={() => increment(prod)}>
                    <MdAddCircleOutline color="#7159c1" size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{prod.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(CartActions.removeFromCart(prod.id))}
                >
                  <MdDelete color="#7159c1" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>TOTAL</span>´<strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
