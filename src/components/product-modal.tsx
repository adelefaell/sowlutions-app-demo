import { Image } from "expo-image";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Product } from "@/types/product";

import { ThemedText } from "./themed-text";

type Props = {
	product: Product | null;
	onClose: () => void;
};

export function ProductModal({ product, onClose }: Props) {
	const theme = useTheme();

	return (
		<Modal
			visible={product !== null}
			animationType="slide"
			onRequestClose={onClose}
		>
			<SafeAreaView
				style={[styles.container, { backgroundColor: theme.background }]}
			>
				<View style={styles.header}>
					<Pressable onPress={onClose} style={styles.closeBtn} hitSlop={12}>
						<ThemedText type="subtitle">×</ThemedText>
					</Pressable>
				</View>
				{product && (
					<ScrollView
						contentContainerStyle={styles.content}
						showsVerticalScrollIndicator={false}
					>
						<Image
							source={{ uri: product.image }}
							style={styles.image}
							contentFit="contain"
						/>
						<View style={styles.details}>
							<ThemedText type="default" style={styles.category}>
								{product.category.toUpperCase()}
							</ThemedText>
							<ThemedText type="subtitle" style={styles.title}>
								{product.title}
							</ThemedText>
							<ThemedText type="title" style={styles.price}>
								${product.price.toFixed(2)}
							</ThemedText>
							<View
								style={[
									styles.divider,
									{ backgroundColor: theme.backgroundElement },
								]}
							/>
							<View style={styles.ratingRow}>
								<ThemedText type="smallBold">Rating</ThemedText>
								<ThemedText type="small" themeColor="textSecondary">
									{product.rating.rate} / 5 · {product.rating.count} reviews
								</ThemedText>
							</View>
							<ThemedText
								type="small"
								themeColor="textSecondary"
								style={styles.description}
							>
								{product.description}
							</ThemedText>
						</View>
					</ScrollView>
				)}
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingHorizontal: Spacing.three,
		paddingTop: Spacing.two,
		alignItems: "flex-end",
	},
	closeBtn: {
		padding: Spacing.two,
	},
	content: {
		paddingHorizontal: Spacing.four,
		paddingBottom: Spacing.six,
		gap: Spacing.three,
	},
	image: {
		width: "100%",
		height: 280,
		borderRadius: 12,
	},
	details: {
		gap: Spacing.two,
	},
	category: {
		fontSize: 11,
		letterSpacing: 1.2,
	},
	title: {
		fontSize: 22,
		lineHeight: 30,
	},
	price: {
		fontSize: 36,
		lineHeight: 44,
	},
	divider: {
		height: 1,
		marginVertical: Spacing.two,
	},
	ratingRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	description: {
		lineHeight: 22,
		marginTop: Spacing.two,
	},
});
