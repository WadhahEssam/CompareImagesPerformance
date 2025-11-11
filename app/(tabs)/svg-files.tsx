import { usePerformance } from '@/contexts/PerformanceContext';
import { Image } from 'expo-image';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NUMBER_OF_IMAGES } from '../_layout';

const IMAGES = [
  require('../../assets/images/svg/1.svg'),
  require('../../assets/images/svg/2.svg'),
  require('../../assets/images/svg/3.svg'),
  require('../../assets/images/svg/4.svg'),
  require('../../assets/images/svg/5.svg'),
];

const SVGComponent = ({ index, isLast, onLastLayout }: { index: number; isLast: boolean; onLastLayout?: () => void }) => {
  const imageSource = IMAGES[index % IMAGES.length];

  return (
    <View style={styles.item} onLayout={isLast ? onLastLayout : undefined}>
      <Image
        source={imageSource}
        style={styles.image}
        contentFit="contain"
        transition={200}
        cachePolicy="memory-disk"
      />
      <Text style={styles.label}>SVG #{index + 1}</Text>
    </View>
  );
};

export default function SVGFilesScreen() {
  const [count, setCount] = useState(NUMBER_OF_IMAGES);
  const [inputValue, setInputValue] = useState(NUMBER_OF_IMAGES.toString());
  const [renderTime, setRenderTime] = useState<number | null>(null);
  const [localStartTime, setLocalStartTime] = useState<number>(0);
  const [hasRendered, setHasRendered] = useState(false);
  const { startTime } = usePerformance();

  useEffect(() => {
    if (startTime > 0 && !hasRendered) {
      setLocalStartTime(startTime);
      setRenderTime(null);
    }
  }, [startTime, hasRendered]);

  const handleLastElementLayout = useCallback(() => {
    if (localStartTime > 0 && !hasRendered) {
      const endTime = Date.now();
      const duration = endTime - localStartTime;
      setRenderTime(duration);
      setHasRendered(true);
    }
  }, [localStartTime, hasRendered]);

  const handleUpdate = () => {
    const newCount = Number.parseInt(inputValue, 10);
    if (!Number.isNaN(newCount) && newCount > 0 && newCount <= 1000) {
      setLocalStartTime(Date.now());
      setRenderTime(null);
      setHasRendered(false);
      setCount(newCount);
    }
  };

  const items = Array.from({ length: count }, (_, idx) => ({ id: `svg-file-${idx}`, index: idx }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SVG Files (Expo Image)</Text>
        <Text style={styles.subtitle}>{count} SVG file images with expo-image (direct render)</Text>
        
        {renderTime !== null && (
          <View style={styles.performanceBox}>
            <Text style={styles.performanceLabel}>⚡ Render Time:</Text>
            <Text style={styles.performanceValue}>{renderTime}ms</Text>
          </View>
        )}
        
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
          {items.map((item, idx) => (
            <SVGComponent 
              key={item.id} 
              index={item.index}
              isLast={idx === items.length - 1}
              onLastLayout={idx === items.length - 1 ? handleLastElementLayout : undefined}
            />
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
  performanceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 10,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#E67E22',
  },
  performanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E67E22',
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
    backgroundColor: '#E67E22',
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

