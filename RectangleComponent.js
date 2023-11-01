import * as React from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { commonStyles } from './styles';
import * as Animatable from 'react-native-animatable';

const animatedValue = new Animated.Value(0);

const backgroundColorAnimation = animatedValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['rgba(255, 255, 255, .45)', 'rgba(255, 255, 255, 1)'],
});

// Create an animated sequence that includes a loop
const loopAnimation = Animated.sequence([
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: false,
  }),
  Animated.timing(animatedValue, {
    toValue: 0,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: false,
  }),
]);

// Loop the animation indefinitely
Animated.loop(loopAnimation).start();

const RectangleComponent = () => {
  return (

    <Animated.View
      style={{
        backgroundColor: backgroundColorAnimation, // Apply the animated background color here
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: -150,
        width: '68%',
        height: '25%',
        borderColor: 'rgb(0.67, 0.66, 0.66)',
      }}
    >
        <Text style={[commonStyles.text, { fontSize: 16, textAlign: 'center', margin: 10 }]}>
          Unleash the fun with Festiva!
          Dive into a whirlwind of hilarious prompts,
          witty comebacks, and unforgettable party moments. {'\n'} {'\n'}
          Perfect for friends, family, and every festivity in between.
          Let the games begin!
        </Text>
    </Animated.View>
  );
};

export default RectangleComponent;