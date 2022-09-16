import { createContext } from "react";

import { useProduct } from "../hooks/useProduct";
import {
	ProductContextProps,
	Product,
	onChangeArgs,
	InitialValuesProps,
	ProductCardHandlers,
} from "../interfaces/interfaces";

import styles from "../styles/styles.module.css";

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export interface Props {
	product: Product;
	children: (args: ProductCardHandlers) => JSX.Element;
	className?: string;
	style?: React.CSSProperties;
	onChange?: (args: onChangeArgs) => void;
	value?: number;
	initialValues?: InitialValuesProps;
}

export const ProductCard = ({
	children,
	product,
	className,
	style,
	onChange,
	value,
	initialValues,
}: Props) => {
	const { counter, increaseBy, maxCount, isMaxCountReached, reset } = useProduct({
		onChange,
		product,
		value,
		initialValues,
	});

	return (
		<Provider
			value={{
				counter,
				increaseBy,
				product,
				maxCount,
			}}
		>
			<div className={`${styles.productCard} ${className}`} style={style}>
				{children({
					count: counter,
					isMaxCountReached,
					product,
					increaseBy,
					reset,
					maxCount: initialValues?.maxCount,
				})}
			</div>
		</Provider>
	);
};
