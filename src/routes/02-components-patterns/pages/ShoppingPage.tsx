import { useState } from "react";
import { ProductCard, ProductImage, ProductTitle, ProductButtons } from "../components";
import { onChangeArgs, Product } from "../interfaces/interfaces";
import "../styles/custom-styles.css";

const product1 = {
	id: "1",
	title: "Coffe Mug - Card",
	img: "./coffee-mug.png",
};

const product2 = {
	id: "2",
	title: "Coffe Mug - MEME",
	img: "./coffee-mug2.png",
};

const products = [product1, product2];

interface ProductInCart extends Product {
	count: number;
}

export const ShoppingPage = () => {
	const [shoppingCart, setShoppingCart] = useState<{ [key: string]: ProductInCart }>();

	const onProductCountChange = ({ count, product }: onChangeArgs) => {
		if (count !== 0) {
			setShoppingCart((prev) => ({ ...prev, [product.id]: { ...product, count } }));
		} else {
			setShoppingCart((prev) => {
				if (!prev) return prev;
				const { [product.id]: toDelete, ...rest } = prev;
				return rest;
			});
		}
	};

	return (
		<div>
			<h1>Shopping Store</h1>
			<hr />

			<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						className="bg-dark"
						onChange={(e) => onProductCountChange(e)}
					>
						<ProductImage className="custom-image" />
						<ProductTitle className="text-white text-bold" />
						<ProductButtons className="custom-buttons" />
					</ProductCard>
				))}
			</div>

			<div className="shopping-cart">
				<ProductCard
					product={product2}
					className="bg-dark"
					style={{ width: "100px" }}
					onChange={(e) => onProductCountChange(e)}
				>
					<ProductImage className="custom-image" />
					<ProductButtons className="custom-buttons" />
				</ProductCard>
				<ProductCard
					product={product1}
					className="bg-dark"
					style={{ width: "100px" }}
					onChange={(e) => onProductCountChange(e)}
				>
					<ProductImage className="custom-image" />
					<ProductButtons className="custom-buttons" />
				</ProductCard>
			</div>
		</div>
	);
};
