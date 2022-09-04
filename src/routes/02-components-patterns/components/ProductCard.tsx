import styles from "../styles/styles.module.css";
import noImage from "../assets/no-image.jpg";

import { useProduct } from "../hooks/useProduct";
import { createContext, ReactElement, useContext } from "react";

interface Props {
	product: Product;
	children?: ReactElement | ReactElement[];
}

interface Product {
	id: string;
	title: string;
	img?: string;
}

interface ProductContextProps {
	counter: number;
	increaseBy: (value: number) => void;
	product: Product;
}

const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export const ProductImage = ({ img = "" }) => {
	const { product } = useContext(ProductContext);
	let imgToShow: string;
	if (img) {
		imgToShow = img;
	} else if (product.img) {
		imgToShow = product.img;
	} else {
		imgToShow = noImage;
	}

	return <img className={styles.productImg} src={imgToShow} alt="Product" />;
};

export const ProductTitle = ({ title }: { title?: string }) => {
	const { product } = useContext(ProductContext);
	return <span className={styles.productDescription}>{title ?? product.title}</span>;
};

export const ProductButtons = () => {
	const { increaseBy, counter } = useContext(ProductContext);
	return (
		<div className={styles.buttonsContainer}>
			<button className={styles.buttonMinus} onClick={() => increaseBy(-1)}>
				-
			</button>
			<div className={styles.countLabel}> {counter} </div>
			<button className={styles.buttonAdd} onClick={() => increaseBy(1)}>
				+
			</button>
		</div>
	);
};

export const ProductCard = ({ product, children }: Props) => {
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

ProductCard.Title = ProductTitle;
ProductCard.Image = ProductImage;
ProductCard.Buttons = ProductButtons;
