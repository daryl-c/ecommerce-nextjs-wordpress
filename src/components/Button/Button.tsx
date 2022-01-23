import { FunctionComponent } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
	children: React.ReactNode;
	className?: string;
}

const Button: FunctionComponent<ButtonProps> = ({ children, className, ...props }) => {
	let buttonClassname = styles.button;

	if (className) {
		buttonClassname = `${buttonClassname} ${className}`;
	}

	return (
		<button className={buttonClassname} {...props}>
			{ children }
		</button>
	);
}

export default Button;