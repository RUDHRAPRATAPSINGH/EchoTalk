import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WaveformAnimation } from '../../components/WaveformAnimation';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useFonts, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';


const { width, height } = Dimensions.get('window');

export default function RecordScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [fontsLoaded] = useFonts({
    SpaceGrotesk_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const handleRecordPress = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTranscription('');
      const demoText = 'Meeting scheduled for next Tuesday at 2 PM.\nAction items:\n- Review Q4 reports\n- Prepare presentation slides\n- Contact marketing team';
      let currentText = '';
      const words = demoText.split(' ');
      
      words.forEach((word, index) => {
        setTimeout(() => {
          currentText += word + ' ';
          setTranscription(currentText);
        }, index * 500);
      });
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDark ? 
          ['#0F172A', '#1E293B', '#0F172A'] : 
          ['#E0F2FE', '#BAE6FD', '#7DD3FC']}
        style={styles.gradient}
      >
        {/* Background Circles */}
        <MotiView 
          style={[styles.backgroundCircle, { top: '10%', left: '10%' }]}
          from={{ scale: 0.8, opacity: 0.3 }}
          animate={{ scale: 1.2, opacity: 0.6 }}
          transition={{ 
            loop: true,
            duration: 4000,
            type: 'timing',
          }}
        />
        <MotiView 
          style={[styles.backgroundCircle, { bottom: '20%', right: '15%' }]}
          from={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 1.5, opacity: 0.7 }}
          transition={{ 
            loop: true,
            duration: 5000,
            type: 'timing',
          }}
        />

        <SafeAreaView style={styles.safeArea}>
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 1000 }}
            style={styles.header}
          >
            <Text style={[styles.title, isDark && styles.textLight]}>EchoTalk</Text>
            <Text style={[styles.subtitle, isDark && styles.textLight]}>
              {isRecording ? 'Recording...' : 'Ready to record'}
            </Text>
          </MotiView>

          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 200 }}
            style={styles.waveformContainer}
          >
            <View style={[styles.waveformCard, isDark && styles.waveformCardDark]}>
              <WaveformAnimation isRecording={isRecording} />
              {isRecording && (
                <Text style={[styles.timer, isDark && styles.textLight]}></Text>
              )}
            </View>
          </MotiView>

          <ScrollView
            style={styles.transcriptionContainer}
            contentContainerStyle={[
              styles.transcriptionContent,
              isDark && styles.transcriptionContentDark
            ]}
          >
            <Text style={[styles.transcriptionText, isDark && styles.textLight]}>
              {transcription || 'Tap the microphone button to start recording...'}
            </Text>
          </ScrollView>

          <View style={styles.controlsContainer}>
            <MotiView
              from={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 400 }}
            >
              <Pressable
                onPress={handleRecordPress}
                style={({ pressed }) => [
                  styles.recordButton,
                  isRecording && styles.recordButtonActive,
                  pressed && styles.recordButtonPressed,
                ]}
              >
                <LinearGradient
                  colors={isRecording ? 
                    ['#EF4444', '#DC2626'] : 
                    ['#3B82F6', '#2563EB']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons
                    name={isRecording ? 'stop' : 'mic'}
                    size={32}
                    color="white"
                  />
                </LinearGradient>
              </Pressable>
            </MotiView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: 'relative',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ scale: 1 }],
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 40,
    color: '#1E293B',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#475569',
    opacity: 0.9,
  },
  textLight: {
    color: '#F8FAFC',
  },
  waveformContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  waveformCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    transform: [{ perspective: 1000 }, { rotateX: '5deg' }],
  },
  waveformCardDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
  },
  timer: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#1E293B',
    textAlign: 'center',
    marginTop: 16,
  },
  transcriptionContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  transcriptionContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    padding: 24,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    transform: [{ perspective: 1000 }, { rotateX: '-5deg' }],
  },
  transcriptionContentDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
  },
  transcriptionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#1E293B',
  },
  controlsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  recordButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ perspective: 1000 }],
  },
  buttonGradient: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonActive: {
    transform: [{ scale: 1.1 }, { perspective: 1000 }],
  },
  recordButtonPressed: {
    transform: [{ scale: 0.95 }, { perspective: 1000 }],
    opacity: 0.9,
  },
});