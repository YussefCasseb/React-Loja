import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { Container, Cart } from '../../styles/header';

import logo from '../../assets/images/logo.svg';

export default function Header() {
  const cartCount = useSelector((state) => state.cart.length);

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>{cartCount} iten(s)</span>
        </div>
        <MdShoppingBasket color="#FFF" size={36} />
      </Cart>
    </Container>
  );
}
