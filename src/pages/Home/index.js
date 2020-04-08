import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../services/api';
import { formatPrice } from '../../util/format';
import { ProductList } from '../../styles/home';
import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector((state) =>
    state.cart.reduce((sumAmount, prod) => {
      sumAmount[prod.id] = prod.amount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map((prod) => ({
        ...prod,
        priceFormatted: formatPrice(prod.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <ProductList>
      {products.map((prod) => (
        <li key={prod.id}>
          <img src={prod.image} alt={prod.title} />
          <strong>{prod.title}</strong>
          <span>{prod.priceFormatted}</span>

          <button
            type="button"
            onClick={() => dispatch(CartActions.addToCartRequest(prod.id))}
          >
            <div>
              <MdAddShoppingCart color="#FFF" size={16} />{' '}
              {amount[prod.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
