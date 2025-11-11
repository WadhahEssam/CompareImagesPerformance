import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const IMAGES = [
  require('../../assets/images/react-logo.png'),
  require('../../assets/images/partial-react-logo.png'),
];

const ImageComponent = ({ index }: { index: number }) => {
  const imageSource = IMAGES[index % IMAGES.length];

  return (
    <View style={styles.item}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.label}>IMG #{index + 1}</Text>
    </View>
  );
};

export default function ImagesScreen() {
  const data = Array.from({ length: 300 }, (_, i) => ({ id: i.toString(), index: i }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Standard PNG Images</Text>
        <Text style={styles.subtitle}>300 standard image components</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <ImageComponent index={item.index} />}
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
    height: 120,
  },
  image: {
    width: 80,
    height: 80,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
});

