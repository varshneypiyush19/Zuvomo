import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../theme/theme';

interface EmptyStateProps {
  message?: string;
  query?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No products found matching your search.',
  query,
  onReset,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="search-outline" size={40} color={Colors.textSecondary} />
      </View>
      <Text style={styles.title}>No Products Found</Text>
      <Text style={styles.message}>
        {query ? `We couldn't find any match for "${query}".` : message}
      </Text>

      {onReset && (
        <TouchableOpacity style={styles.button} onPress={onReset} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Clear Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.xxxl * 1.5,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  message: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    maxWidth: 280,
  },
  button: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.full,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
