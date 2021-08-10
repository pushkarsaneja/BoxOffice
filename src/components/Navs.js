import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavList, LinkStyled } from './Navs.styled';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];
const Navs = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <NavList>
        {LINKS.map(val => (
          <li key={val.to}>
            <LinkStyled
              to={val.to}
              className={val.to === pathname ? 'active' : ''}
            >
              {val.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;
