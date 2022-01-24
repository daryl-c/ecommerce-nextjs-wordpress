import { FunctionComponent } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
	children: React.ReactNode;
	className?: string;
	color?: string;
	onClick?: () => void
}

const Button: FunctionComponent<ButtonProps> = ({ children, color, className, ...props }) => {
	let buttonClassname = styles.button;

	if (className) {
		buttonClassname = `${buttonClassname} ${className}`;
	}

	return (
		<button className={buttonClassname} data-color={color} {...props}>
			{ children }
		</button>
	);
}

export default Button;