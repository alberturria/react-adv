import styles from "../styles/styles.module.css";
import noImage from "../assets/no-image.jpg";

import { useProduct } from "../hooks/useProduct";

interface Props {
	product: Product;
}

interface Product {
	id: string;
	title: string;
	img?: string;
}

interface ProductButtonsProps {
	counter: number;
	increaseBy: (number: number) => void;
}

export const ProductImage = ({ img = "" }) => {
	return <img className={styles.productImg} src={img ?? noImage} alt="Product" />;
};

export const ProductTitle = ({ title }: { title: string }) => {
	return <span className={styles.productDescription}>{title}</span>;
};

export const ProductButtons = ({ counter, increaseBy }: ProductButtonsProps) => {
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

export const ProductCard = ({ product }: Props) => {
	const { counter, increaseBy } = useProduct();
	const { title, img } = product;
	return (
		<div className={styles.productCard}>
			<ProductImage img={img} />
			<ProductTitle title={title} />
			<ProductButtons counter={counter} increaseBy={increaseBy} />
		</div>
	);
};
