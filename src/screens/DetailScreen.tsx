import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/product';
import { Colors, Spacing, BorderRadius, Shadows } from '../theme/theme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const DetailScreen: React.FC = () => {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation();
  const { product } = route.params;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'specs' | 'reviews'>('about');
  const insets = useSafeAreaInsets();

  // Images list (fallback to thumbnail if images array empty)
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  // Calculate original price
  const originalPrice = product.discountPercentage > 0
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (slide !== activeImageIndex) {
      setActiveImageIndex(slide);
    }
  };

  const handleAddToCart = () => {
    Alert.alert(
      'Added to Cart! 🛒',
      `"${product.title}" has been added to your shopping bag.`,
      [{ text: 'Great!', style: 'default' }]
    );
  };

  const isLowStock = product.stock < 10;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />

      {/* Custom Top Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>

        <Text style={styles.navTitle} numberOfLines={1}>
          {product.title}
        </Text>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setIsFavorite(!isFavorite)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? Colors.danger : Colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Gallery Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {images.map((imgUri, index) => (
              <View key={index} style={styles.imageSlide}>
                <Image
                  source={{ uri: imgUri }}
                  style={styles.carouselImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          {images.length > 1 && (
            <View style={styles.paginationDots}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    activeImageIndex === index && styles.dotActive,
                  ]}
                />
              ))}
            </View>
          )}

          {/* Discount Pill */}
          {product.discountPercentage > 5 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round(product.discountPercentage)}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* Product Core Details */}
        <View style={styles.body}>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryBadge}>{product.category.toUpperCase()}</Text>
            <View style={[styles.stockChip, isLowStock ? styles.stockChipLow : styles.stockChipIn]}>
              <View style={[styles.stockDot, isLowStock ? styles.stockDotLow : styles.stockDotIn]} />
              <Text style={[styles.stockText, isLowStock ? styles.stockTextLow : styles.stockTextIn]}>
                {product.availabilityStatus || (isLowStock ? `Only ${product.stock} left` : 'In Stock')}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{product.title}</Text>

          {product.brand ? (
            <Text style={styles.brand}>Brand: <Text style={styles.brandBold}>{product.brand}</Text></Text>
          ) : null}

          {/* Price & Rating Bar */}
          <View style={styles.priceRatingRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              {originalPrice && (
                <Text style={styles.originalPrice}>${originalPrice}</Text>
              )}
            </View>

            <View style={styles.ratingBox}>
              <Ionicons name="star" size={16} color={Colors.star} />
              <Text style={styles.ratingNumber}>{product.rating.toFixed(1)}</Text>
              <Text style={styles.reviewsCount}>
                ({product.reviews?.length || 0} reviews)
              </Text>
            </View>
          </View>

          {/* Navigation Tabs */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'about' && styles.tabButtonActive]}
              onPress={() => setActiveTab('about')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'about' && styles.tabButtonTextActive]}>
                Description
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'specs' && styles.tabButtonActive]}
              onPress={() => setActiveTab('specs')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'specs' && styles.tabButtonTextActive]}>
                Specifications
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'reviews' && styles.tabButtonActive]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'reviews' && styles.tabButtonTextActive]}>
                Reviews ({product.reviews?.length || 0})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === 'about' && (
            <View style={styles.tabContent}>
              <Text style={styles.description}>{product.description}</Text>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  <Text style={styles.sectionSubtitle}>Tags</Text>
                  <View style={styles.tagsList}>
                    {product.tags.map((tag, idx) => (
                      <View key={idx} style={styles.tagPill}>
                        <Text style={styles.tagText}>#{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}

          {activeTab === 'specs' && (
            <View style={styles.tabContent}>
              <View style={styles.specTable}>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>SKU</Text>
                  <Text style={styles.specValue}>{product.sku || 'N/A'}</Text>
                </View>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Weight</Text>
                  <Text style={styles.specValue}>{product.weight ? `${product.weight} kg` : 'N/A'}</Text>
                </View>
                {product.dimensions && (
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Dimensions</Text>
                    <Text style={styles.specValue}>
                      {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                    </Text>
                  </View>
                )}
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Warranty</Text>
                  <Text style={styles.specValue}>{product.warrantyInformation || '1 Year Standard Warranty'}</Text>
                </View>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Shipping</Text>
                  <Text style={styles.specValue}>{product.shippingInformation || 'Ships in 3-5 business days'}</Text>
                </View>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Return Policy</Text>
                  <Text style={styles.specValue}>{product.returnPolicy || '30-day return policy'}</Text>
                </View>
                {product.minimumOrderQuantity && (
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Min. Order</Text>
                    <Text style={styles.specValue}>{product.minimumOrderQuantity} unit(s)</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {activeTab === 'reviews' && (
            <View style={styles.tabContent}>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, idx) => (
                  <View key={idx} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                          {rev.reviewerName.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.reviewerInfo}>
                        <Text style={styles.reviewerName}>{rev.reviewerName}</Text>
                        <Text style={styles.reviewDate}>
                          {new Date(rev.date).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.reviewRating}>
                        <Ionicons name="star" size={14} color={Colors.star} />
                        <Text style={styles.reviewRatingText}>{rev.rating}</Text>
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>{rev.comment}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noReviewsText}>No customer reviews yet.</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Floating Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : Spacing.md }]}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPriceLabel}>Total Price</Text>
          <Text style={styles.bottomPriceValue}>${product.price.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.85}
        >
          <Ionicons name="bag-handle-outline" size={18} color={Colors.white} style={{ marginRight: 6 }} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginHorizontal: Spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  carouselContainer: {
    height: 320,
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  imageSlide: {
    width: SCREEN_WIDTH,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  paginationDots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(15, 23, 42, 0.2)',
  },
  dotActive: {
    width: 18,
    backgroundColor: Colors.primary,
  },
  discountBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: Colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  body: {
    padding: Spacing.xl,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  categoryBadge: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.8,
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 28,
    marginTop: 4,
  },
  brand: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  brandBold: {
    color: Colors.text,
    fontWeight: '600',
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
  originalPrice: {
    fontSize: 16,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
  },
  reviewsCount: {
    fontSize: 12,
    color: '#B45309',
  },
  tabBar: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.md,
    padding: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  tabButtonActive: {
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabButtonTextActive: {
    color: Colors.text,
    fontWeight: '700',
  },
  tabContent: {
    marginTop: Spacing.lg,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  tagsContainer: {
    marginTop: Spacing.lg,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  tagText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  specTable: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  specLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  reviewCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  reviewDate: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  reviewRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  reviewComment: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  noReviewsText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  bottomBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadows.lg,
  },
  bottomPriceCol: {
    justifyContent: 'center',
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  bottomPriceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
