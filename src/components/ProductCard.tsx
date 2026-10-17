import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types/product';
import { Colors, Spacing, BorderRadius, Shadows } from '../theme/theme';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const originalPrice = product.discountPercentage > 0
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const isLowStock = product.stock < 10;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.imageContainer}>
        {imageLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        )}
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="cover"
          onLoadEnd={() => setImageLoading(false)}
        />
        {product.discountPercentage > 5 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(product.discountPercentage)}%
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.category} numberOfLines={1}>
            {product.category.toUpperCase()}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={13} color={Colors.star} />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        {product.brand ? (
          <Text style={styles.brand} numberOfLines={1}>
            By {product.brand}
          </Text>
        ) : null}

        <View style={styles.footerRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {originalPrice && (
              <Text style={styles.originalPrice}>${originalPrice}</Text>
            )}
          </View>

          <View style={[styles.stockChip, isLowStock ? styles.stockChipLow : styles.stockChipIn]}>
            <View style={[styles.stockDot, isLowStock ? styles.stockDotLow : styles.stockDotIn]} />
            <Text style={[styles.stockText, isLowStock ? styles.stockTextLow : styles.stockTextIn]}>
              {isLowStock ? `Only ${product.stock} left` : 'In Stock'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.sm,
  },
  imageContainer: {
    width: 104,
    height: 104,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.chipBg,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.chipBg,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: Colors.danger,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    zIndex: 2,
  },
  discountText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.5,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginLeft: Spacing.xs,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
    marginLeft: 3,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
    marginTop: 2,
  },
  brand: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: Spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  stockChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  stockChipIn: {
    backgroundColor: Colors.successLight,
  },
  stockChipLow: {
    backgroundColor: Colors.dangerLight,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  stockDotIn: {
    backgroundColor: Colors.success,
  },
  stockDotLow: {
    backgroundColor: Colors.danger,
  },
  stockText: {
    fontSize: 11,
    fontWeight: '600',
  },
  stockTextIn: {
    color: '#065F46',
  },
  stockTextLow: {
    color: '#991B1B',
  },
});
