import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RNSvgScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello to the performance test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
