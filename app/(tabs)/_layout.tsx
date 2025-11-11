import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {top} = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        sceneStyle: {
          paddingTop: top
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house" color={color} />,
        }}
      />

      <Tabs.Screen
        name="rn-svgs"
        options={{
          title: 'RN-SVGs',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="0.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="svgs"
        options={{
          title: 'Complex SVG',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="1.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="images"
        options={{
          title: 'PNG Images',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="2.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="webp"
        options={{
          title: 'Expo Image',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="3.circle" color={color} />,
        }}
      />

    </Tabs>
  );
}
