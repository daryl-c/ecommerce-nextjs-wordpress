import { FunctionComponent } from 'react';
import styles from './Footer.module.scss';

const Footer: FunctionComponent = ({ ...rest }) => {
	return (
		<footer className={styles.footer} {...rest}>
			&copy; Hyper Bros. Trading Cards, {new Date().getFullYear()}
		</footer>
	);
}

export default Footer;