import { useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DraggableList } from "@/components/draggable-list";
import { ProductModal } from "@/components/product-modal";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types/product";

export default function HomeScreen() {
	const { data, isLoading } = useProducts();

	const [selected, setSelected] = useState<Product | null>(null);

	if (isLoading) {
		return (
			<ThemedView style={styles.centred}>
				<ActivityIndicator />
			</ThemedView>
		);
	}

	if (!data?.length) {
		return (
			<ThemedView style={styles.centred}>
				<ThemedText themeColor="textSecondary">No products found.</ThemedText>
			</ThemedView>
		);
	}

	return (
		<ThemedView style={styles.container}>
			<SafeAreaView style={styles.safe} edges={["top"]}>
				<ThemedText type="subtitle" style={styles.heading}>
					Products
				</ThemedText>
				<DraggableList products={data} onProductPress={setSelected} />
			</SafeAreaView>

			<ProductModal product={selected} onClose={() => setSelected(null)} />
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	safe: {
		flex: 1,
		paddingHorizontal: Spacing.three,
	},
	heading: {
		paddingVertical: Spacing.three,
	},
	centred: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
