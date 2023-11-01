import { Animated, Easing } from 'react-native';

export const slideGradientAnimation = (duration) => {
  const animatedValue = new Animated.Value(0);

  const gradientAnimation = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['rgba(255, 105, 92, 1)', 'rgba(239, 211, 131, 1)', 'rgba(255, 68, 51, 1)'],
  });

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 2,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
      ])
    ).start();
  };

  return { gradientAnimation, startAnimation };
};