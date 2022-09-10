import { useState } from "react";
import { onChangeArgs, ProductInCart } from "../interfaces/interfaces";

export const useShoppingCart = () => {
	const [shoppingCart, setShoppingCart] = useState<{ [key: string]: ProductInCart }>({});

	const onProductCountChange = ({ count, product }: onChangeArgs) => {
		setShoppingCart((prev) => {
			const productInCart: ProductInCart = prev[product.id] || { ...product, count: 0 };
			if (Math.max(productInCart.count + count, 0)) {
				productInCart.count += count;
				return {
					...prev,
					[product.id]: productInCart,
				};
			} else {
				const { [product.id]: toDelete, ...rest } = prev;
				return rest;
			}
		});
	};
	return { shoppingCart, onProductCountChange };
};
