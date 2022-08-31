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

export const ProductCard = ({ product }: Props) => {
	const { counter, increaseBy } = useProduct();
	const { title, img } = product;
	return (
		<div className={styles.productCard}>
			<img className={styles.productImg} src={img ?? noImage} alt="Coffe mug" />

			<span className={styles.productDescription}>{title}</span>
			<div className={styles.buttonsContainer}>
				<button className={styles.buttonMinus} onClick={() => increaseBy(-1)}>
					-
				</button>
				<div className={styles.countLabel}> {counter} </div>
				<button className={styles.buttonAdd} onClick={() => increaseBy(1)}>
					+
				</button>
			</div>
		</div>
	);
};
