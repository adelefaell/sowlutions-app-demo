import { useEffect, useRef, useState } from "react";
import {
	Animated,
	PanResponder,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

import type { Product } from "@/types/product";

import { ITEM_HEIGHT, ProductCard } from "./product-card";

const ROW_HEIGHT = ITEM_HEIGHT + 8;

type Props = {
	products: Product[];
	onProductPress: (product: Product) => void;
};

function Row({
	product,
	index,
	hidden,
	onPress,
	onDragStart,
	onDragMove,
	onDragEnd,
}: {
	product: Product;
	index: number;
	hidden: boolean;
	onPress: () => void;
	onDragStart: (index: number, pageY: number) => void;
	onDragMove: (pageY: number) => void;
	onDragEnd: (pageY: number) => void;
}) {
	const armed = useRef(false);
	const moved = useRef(false);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const startY = useRef(0);

	const cb = useRef({ onPress, onDragStart, onDragMove, onDragEnd, index });
	cb.current = { onPress, onDragStart, onDragMove, onDragEnd, index };

	const pan = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => armed.current,
			onPanResponderTerminationRequest: () => !armed.current,

			onPanResponderGrant(evt) {
				startY.current = evt.nativeEvent.pageY;
				armed.current = false;
				moved.current = false;

				timer.current = setTimeout(() => {
					if (!moved.current) {
						armed.current = true;
						cb.current.onDragStart(cb.current.index, startY.current);
					}
				}, 500);
			},

			onPanResponderMove(evt) {
				const dy = Math.abs(evt.nativeEvent.pageY - startY.current);

				if (dy > 6) {
					moved.current = true;
					if (timer.current) {
						clearTimeout(timer.current);
						timer.current = null;
					}
				}

				if (armed.current) {
					cb.current.onDragMove(evt.nativeEvent.pageY);
				}
			},

			onPanResponderRelease(evt) {
				if (timer.current) {
					clearTimeout(timer.current);
					timer.current = null;
				}

				if (armed.current) {
					armed.current = false;
					cb.current.onDragEnd(evt.nativeEvent.pageY);
				} else if (!moved.current) {
					cb.current.onPress();
				}
			},

			onPanResponderTerminate() {
				if (timer.current) {
					clearTimeout(timer.current);
					timer.current = null;
				}
				armed.current = false;
			},
		}),
	).current;

	return (
		<View style={[styles.row, hidden && styles.hidden]} {...pan.panHandlers}>
			<ProductCard product={product} isDragging={false} />
		</View>
	);
}

export function DraggableList({ products, onProductPress }: Props) {
	const [items, setItems] = useState<Product[]>([]);
	const [dragging, setDragging] = useState(-1);

	const scrollY = useRef(0);
	const fromIdx = useRef(-1);
	const dragStartY = useRef(0);
	const ghostBaseY = useRef(0);

	const ghostPos = useRef(new Animated.Value(0)).current;
	const ghostAlpha = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (products.length > 0) setItems(products);
	}, [products]);

	function handleDragStart(index: number, pageY: number) {
		fromIdx.current = index;
		dragStartY.current = pageY;
		ghostBaseY.current = index * ROW_HEIGHT - scrollY.current;

		ghostPos.setValue(ghostBaseY.current);
		setDragging(index);

		Animated.timing(ghostAlpha, {
			toValue: 1,
			duration: 150,
			useNativeDriver: true,
		}).start();
	}

	function handleDragMove(pageY: number) {
		const delta = pageY - dragStartY.current;
		ghostPos.setValue(ghostBaseY.current + delta);
	}

	function handleDragEnd(pageY: number) {
		const delta = pageY - dragStartY.current;
		const from = fromIdx.current;
		const targetScrollY = ghostBaseY.current + scrollY.current + delta;
		const to = Math.max(
			0,
			Math.min(items.length - 1, Math.round(targetScrollY / ROW_HEIGHT)),
		);

		Animated.timing(ghostPos, {
			toValue: to * ROW_HEIGHT - scrollY.current,
			duration: 100,
			useNativeDriver: true,
		}).start(() => {
			setItems((prev) => {
				const next = [...prev];
				const [moved] = next.splice(from, 1);
				next.splice(to, 0, moved);
				return next;
			});

			setDragging(-1);
			ghostAlpha.setValue(0);
		});
	}

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.scroll}
				scrollEnabled={dragging === -1}
				onScroll={(e) => {
					scrollY.current = e.nativeEvent.contentOffset.y;
				}}
				scrollEventThrottle={16}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.list}
			>
				{items.map((item, index) => (
					<Row
						key={item.id}
						product={item}
						index={index}
						hidden={index === dragging}
						onPress={() => onProductPress(item)}
						onDragStart={handleDragStart}
						onDragMove={handleDragMove}
						onDragEnd={handleDragEnd}
					/>
				))}
			</ScrollView>

			{dragging !== -1 && (
				<Animated.View
					pointerEvents="none"
					style={[
						styles.ghost,
						{
							opacity: ghostAlpha,
							transform: [{ translateY: ghostPos }],
						},
					]}
				>
					<ProductCard product={items[dragging]} isDragging />
				</Animated.View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scroll: {
		flex: 1,
	},
	list: {
		paddingBottom: 16,
	},
	row: {
		height: ROW_HEIGHT,
	},
	hidden: {
		opacity: 0,
	},
	ghost: {
		position: "absolute",
		left: 0,
		right: 0,
		height: ITEM_HEIGHT,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 8,
	},
});
