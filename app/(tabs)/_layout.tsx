import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'RN-SVGs',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="0.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="svgs"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="1.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="images"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="2.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="webp"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="3.circle" color={color} />,
        }}
      />

    </Tabs>
  );
}
