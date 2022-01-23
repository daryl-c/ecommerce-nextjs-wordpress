import { FunctionComponent } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

const Container: FunctionComponent<ContainerProps> = ({ children, className, ...props }) => {
	let containerClassname = styles.container;

	if (className) {
		containerClassname = `${containerClassname} ${className}`;
	}

	return (
		<div className={containerClassname} {...props}>
			{ children }
		</div>
	);
}

export default Container;