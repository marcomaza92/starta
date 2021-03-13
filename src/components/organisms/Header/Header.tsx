import { types } from '../../../api/static';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <div>
        {types.map((type, index) => (
          <Link key={index} href={`/${type.all}/`}>
            <a>{type.all}</a>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
