import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '../theme/theme';

export const SkeletonCard: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.imagePlaceholder, { opacity: animatedValue }]} />
      <View style={styles.content}>
        <Animated.View style={[styles.badgePlaceholder, { opacity: animatedValue }]} />
        <Animated.View style={[styles.titlePlaceholder, { opacity: animatedValue }]} />
        <Animated.View style={[styles.subtitlePlaceholder, { opacity: animatedValue }]} />
        <View style={styles.footer}>
          <Animated.View style={[styles.pricePlaceholder, { opacity: animatedValue }]} />
          <Animated.View style={[styles.ratingPlaceholder, { opacity: animatedValue }]} />
        </View>
      </View>
    </View>
  );
};

export const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.md,
    backgroundColor: '#E2E8F0',
  },
  content: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  badgePlaceholder: {
    width: 60,
    height: 14,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#E2E8F0',
    marginBottom: Spacing.xs,
  },
  titlePlaceholder: {
    width: '90%',
    height: 16,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#E2E8F0',
    marginBottom: Spacing.xs,
  },
  subtitlePlaceholder: {
    width: '60%',
    height: 12,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#E2E8F0',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  pricePlaceholder: {
    width: 70,
    height: 18,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#E2E8F0',
  },
  ratingPlaceholder: {
    width: 40,
    height: 14,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#E2E8F0',
  },
});
