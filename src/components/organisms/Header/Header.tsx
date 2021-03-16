import { types } from '../../../api/static';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  return (
    <header className={styles.container}>
      <h2 className={styles.title} data-testid="title">
        <Link href="/">
          <a>Starta</a>
        </Link>
      </h2>
      <nav className={styles.navigation}>
        {types.map((type, index) => (
          <Link key={index} href={`/${type.all}/`}>
            <a
              className={`${styles.navItem} ${
                router.pathname.includes(type.all)
                  ? styles.currentSection
                  : null
              }`}
            >
              {type.title}
            </a>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
