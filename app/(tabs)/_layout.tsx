import { Tabs } from 'expo-router';
import { useCallback } from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { PerformanceProvider, usePerformance } from '@/contexts/PerformanceContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PerformanceTabButton = (props: Record<string, unknown> & { children: React.ReactNode }) => {
  const { setStartTime } = usePerformance();
  const { onPress, children, ...rest } = props;
  
  const handlePress = useCallback((e: unknown) => {
    setStartTime(Date.now());
    if (onPress && typeof onPress === 'function') {
      onPress(e);
    }
  }, [onPress, setStartTime]);

  return <HapticTab {...rest} onPress={handlePress}>{children}</HapticTab>;
};

function TabLayoutContent() {
  const colorScheme = useColorScheme();
  const {top} = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: PerformanceTabButton,
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
          title: 'RN-SVG',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="0.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="svgs"
        options={{
          title: 'Complx SVG',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="1.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="images"
        options={{
          title: 'PNG',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="2.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="webp"
        options={{
          title: 'WEBP',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="3.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="svg-files"
        options={{
          title: 'SVG Files',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="4.circle" color={color} />,
        }}
      />

    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <PerformanceProvider>
      <TabLayoutContent />
    </PerformanceProvider>
  );
}
