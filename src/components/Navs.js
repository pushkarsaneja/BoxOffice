import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => (
  <div>
    <ul>
      {LINKS.map((val, index) => {
        return (
          <li>
            <Link to={val.to} key={index}>
              {val.text}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export default Navs;
