import Head from 'next/head';
import { FunctionComponent } from 'react';

import Header from '@components/Header';
import Footer from '@components/Footer';

import styles from './Layout.module.scss';

interface LayoutProps {
	children: React.ReactNode;
	className?: string;
}

const Layout: FunctionComponent<LayoutProps> = ({ children, className, ...props }) => {
	let layoutClassname = styles.layout;

	if (className) {
		layoutClassname = `${layoutClassname} ${className}`;
	}

	return (
		<div className={layoutClassname} {...props}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className={styles.main}>
				{ children }
			</main>
			<Footer />
		</div>
	);
}

export default Layout;