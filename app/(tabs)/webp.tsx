import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const IMAGES = [
  require('../../assets/images/react-logo.png'),
  require('../../assets/images/partial-react-logo.png'),
];

const WebPComponent = ({ index }: { index: number }) => {
  const imageSource = IMAGES[index % IMAGES.length];

  return (
    <View style={styles.item}>
      <Image
        source={imageSource}
        style={styles.image}
        contentFit="contain"
        transition={200}
        cachePolicy="memory-disk"
      />
      <Text style={styles.label}>WebP #{index + 1}</Text>
    </View>
  );
};

export default function WebPScreen() {
  const [count, setCount] = useState(300);
  const [inputValue, setInputValue] = useState('300');

  const handleUpdate = () => {
    const newCount = Number.parseInt(inputValue, 10);
    if (!Number.isNaN(newCount) && newCount > 0 && newCount <= 1000) {
      setCount(newCount);
    }
  };

  const items = Array.from({ length: count }, (_, idx) => ({ id: `webp-${idx}`, index: idx }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expo Image (WebP Optimized)</Text>
        <Text style={styles.subtitle}>{count} optimized images with expo-image (direct render)</Text>
        
        <View style={styles.controls}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="number-pad"
            placeholder="Enter count"
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.list}>
        <View style={styles.grid}>
          {items.map((item) => (
            <WebPComponent key={item.id} index={item.index} />
          ))}
        </View>
      </ScrollView>
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
  controls: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#9B59B6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '31%',
    margin: '1%',
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

