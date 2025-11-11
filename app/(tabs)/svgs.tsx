import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';

const COLORS = ['#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6', '#1ABC9C', '#E67E22', '#34495E'];

const ComplexSvg = ({ index }: { index: number }) => {
  const color1 = COLORS[index % COLORS.length];
  const color2 = COLORS[(index + 1) % COLORS.length];
  const type = index % 6;

  return (
    <View style={styles.item}>
      <Svg width="100" height="100" viewBox="0 0 100 100">
        {type === 0 && (
          <G>
            <Circle cx="50" cy="50" r="45" fill={color1} opacity="0.8" />
            <Circle cx="50" cy="50" r="30" fill={color2} opacity="0.9" />
            <Circle cx="50" cy="50" r="15" fill="#fff" />
          </G>
        )}
        {type === 1 && (
          <G>
            <Rect x="5" y="5" width="90" height="90" fill={color1} opacity="0.8" />
            <Rect x="20" y="20" width="60" height="60" fill={color2} opacity="0.9" />
            <Rect x="35" y="35" width="30" height="30" fill="#fff" />
          </G>
        )}
        {type === 2 && (
          <G>
            <Path d="M50 10 L90 50 L50 90 L10 50 Z" fill={color1} />
            <Ellipse cx="50" cy="50" rx="20" ry="30" fill={color2} />
          </G>
        )}
        {type === 3 && (
          <G>
            <Path d="M10 50 Q 30 10, 50 50 T 90 50" stroke={color1} strokeWidth="8" fill="none" />
            <Circle cx="10" cy="50" r="6" fill={color1} />
            <Circle cx="50" cy="50" r="6" fill={color2} />
            <Circle cx="90" cy="50" r="6" fill={color1} />
          </G>
        )}
        {type === 4 && (
          <G>
            <Path d="M50 10 L90 40 L75 85 L25 85 L10 40 Z" fill={color1} />
            <Path d="M50 30 L70 50 L60 75 L40 75 L30 50 Z" fill={color2} />
          </G>
        )}
        {type === 5 && (
          <G>
            <Line x1="10" y1="10" x2="90" y2="90" stroke={color1} strokeWidth="4" />
            <Line x1="90" y1="10" x2="10" y2="90" stroke={color2} strokeWidth="4" />
            <Circle cx="50" cy="50" r="20" fill={color1} opacity="0.7" />
          </G>
        )}
      </Svg>
      <Text style={styles.label}>SVG #{index + 1}</Text>
    </View>
  );
};

export default function SvgsScreen() {
  const [count, setCount] = useState(300);
  const [inputValue, setInputValue] = useState('300');

  const handleUpdate = () => {
    const newCount = Number.parseInt(inputValue, 10);
    if (!Number.isNaN(newCount) && newCount > 0 && newCount <= 1000) {
      setCount(newCount);
    }
  };

  const items = Array.from({ length: count }, (_, idx) => ({ id: `complex-svg-${idx}`, index: idx }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Complex SVG Graphics</Text>
        <Text style={styles.subtitle}>{count} complex SVG compositions (direct render)</Text>
        
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
            <ComplexSvg key={item.id} index={item.index} />
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
    backgroundColor: '#3498DB',
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
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
});
