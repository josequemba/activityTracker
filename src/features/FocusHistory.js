import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { colors } from '../utilities/colors';
import { fontSizes, spacing } from '../utilities/sizes';

export const FocusHistory = ({history}) => {

  if (!history || !history.length) return <Text style={styles.title}>We haven't focused in anything yet! </Text>;

  const renderItem = ({item}) => <Text style={styles.item}>- {item}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we've focused on:</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  item: {
    color: colors.white,
    fontSize: fontSizes.md,
    paddingTop: spacing.sm
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: "bold"
  }
})