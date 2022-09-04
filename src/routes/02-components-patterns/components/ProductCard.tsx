import styles from "../styles/styles.module.css";

import { useProduct } from "../hooks/useProduct";
import { createContext } from "react";
import { ProductContextProps, ProductCardProps } from "../interfaces/interfaces";

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export const ProductCard = ({ product, children }: ProductCardProps) => {
	const { counter, increaseBy } = useProduct();

	return (
		<Provider value={{ counter, increaseBy, product }}>
			<div className={styles.productCard}>
				{children}
				{/* <ProductImage img={img} />
			<ProductTitle title={title} />
			<ProductButtons counter={counter} increaseBy={increaseBy} /> */}
			</div>
		</Provider>
	);
};
