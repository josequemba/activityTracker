import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, Vibration } from 'react-native';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utilities/sizes';
import { colors } from '../utilities/colors';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Timing } from './Timing';

const ONE_SECOND_IN_MS = 1000;

const PATTERN =
  Platform.OS === 'android'
    ? [
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
      ]
    : [
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
      ];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, SetIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    SetIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress} // or onProgress={(progress) => setProgress(progress)}
          onEnd={onEnd}
        />

        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={parseFloat(progress.toFixed(2))}
          style={{ height: spacing.sm }}
          color={colors.progressBarr}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="Start" onPress={() => SetIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="Pause" onPress={() => SetIsStarted(false)} />
        )}
      </View>

      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    lex: 0.1,
    flexDirection: 'row',
    padding: spacing.xxl,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
});
