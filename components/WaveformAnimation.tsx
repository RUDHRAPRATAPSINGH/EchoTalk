import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

const BAR_COUNT = 50;

export function WaveformAnimation({ isRecording }: { isRecording: boolean }) {
  return (
    <View style={styles.container}>
      {[...Array(BAR_COUNT)].map((_, i) => (
        <MotiView
          key={i}
          style={[styles.bar]}
          animate={{
            height: isRecording ? 
              [20, Math.random() * 80 + 20, 20] : 
              20,
            backgroundColor: isRecording ?
              ['#3B82F6', '#60A5FA', '#3B82F6'] :
              'rgba(71, 85, 105, 0.3)',
          }}
          transition={{
            type: 'timing',
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            delay: i * (1000 / BAR_COUNT),
            repeatReverse: true,
            loop: isRecording,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    gap: 2,
  },
  bar: {
    width: 3,
    height: 20,
    backgroundColor: 'rgba(71, 85, 105, 0.3)',
    borderRadius: 4,
  },
});