import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Product } from "@/types/product";

import { ThemedText } from "./themed-text";

export const ITEM_HEIGHT = 88;

type Props = {
	product: Product;
	isDragging: boolean;
};

export function ProductCard({ product, isDragging }: Props) {
	const theme = useTheme();

	return (
		<View
			style={[
				styles.row,
				{
					backgroundColor: theme.backgroundElement,
					opacity: isDragging ? 0.85 : 1,
				},
			]}
		>
			<Image
				source={{ uri: product.image }}
				style={styles.thumbnail}
				contentFit="contain"
			/>
			<View style={styles.info}>
				<ThemedText type="small" numberOfLines={2} style={styles.title}>
					{product.title}
				</ThemedText>
				<ThemedText type="smallBold" themeColor="textSecondary">
					${product.price.toFixed(2)}
				</ThemedText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		height: ITEM_HEIGHT,
		paddingHorizontal: Spacing.three,
		borderRadius: 10,
		gap: Spacing.three,
		marginBottom: Spacing.two,
	},
	thumbnail: {
		width: 56,
		height: 56,
		borderRadius: 6,
	},
	info: {
		flex: 1,
		gap: Spacing.half,
	},
	title: {
		lineHeight: 18,
	},
});
