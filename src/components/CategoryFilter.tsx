import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../theme/theme';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const allCategories = ['all', ...categories];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {allCategories.map((cat) => {
        const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
        const displayName = cat === 'all' ? 'All Items' : cat.charAt(0).toUpperCase() + cat.slice(1);

        return (
          <TouchableOpacity
            key={cat}
            style={[styles.pill, isSelected && styles.pillActive]}
            onPress={() => onSelectCategory(cat)}
            activeOpacity={0.7}
          >
            <Text style={[styles.pillText, isSelected && styles.pillTextActive]}>
              {displayName}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  pill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  pillTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
});
