import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Svg, { Circle, Rect, Path, Polygon } from 'react-native-svg';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

const SvgComponent = ({ index }: { index: number }) => {
  const color = COLORS[index % COLORS.length];
  const type = index % 4;

  return (
    <View style={styles.item}>
      <Svg width="100" height="100" viewBox="0 0 100 100">
        {type === 0 && <Circle cx="50" cy="50" r="40" fill={color} />}
        {type === 1 && <Rect x="10" y="10" width="80" height="80" fill={color} />}
        {type === 2 && <Polygon points="50,10 90,90 10,90" fill={color} />}
        {type === 3 && <Path d="M50 10 L90 50 L50 90 L10 50 Z" fill={color} />}
      </Svg>
      <Text style={styles.label}>#{index + 1}</Text>
    </View>
  );
};

export default function RNSvgScreen() {
  const data = Array.from({ length: 300 }, (_, i) => ({ id: i.toString(), index: i }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native SVG Components</Text>
        <Text style={styles.subtitle}>300 programmatic SVGs</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <SvgComponent index={item.index} />}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.list}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  list: {
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
});
