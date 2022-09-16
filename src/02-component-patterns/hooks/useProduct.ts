import { useEffect, useRef, useState } from "react";
import { InitialValuesProps, onChangeArgs, Product } from "../interfaces/interfaces";

interface UseProductArgs {
	product: Product;
	onChange?: (args: onChangeArgs) => void;
	value?: number;
	initialValues?: InitialValuesProps;
}

export const useProduct = ({ onChange, product, value = 0, initialValues }: UseProductArgs) => {
	const [counter, setCounter] = useState(initialValues?.count ?? value);
	const isMounted = useRef(false);

	const increaseBy = (value: number) => {
		let newValue: number;
		if (initialValues?.maxCount && counter + value > initialValues.maxCount) {
			newValue = Math.max(initialValues.maxCount, 0);
		} else {
			newValue = Math.max(counter + value, 0);
		}
		setCounter(newValue);

		onChange && onChange({ count: newValue, product });
	};

	const reset = () => setCounter(initialValues?.count ?? value ?? 0);

	useEffect(() => {
		if (!isMounted.current) return;
		setCounter(value);
	}, [value]);

	useEffect(() => {
		isMounted.current = true;
	}, []);

	return {
		counter,
		maxCount: initialValues?.maxCount,
		isMaxCountReached: !!initialValues?.maxCount && initialValues.maxCount === counter,
		increaseBy,
		reset,
	};
};
