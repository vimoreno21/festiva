import React from 'react';
import { Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackgroundComponent = () => {
    const animatedValue = new Animated.Value(0);

    const gradientAnimation = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(108, 187, 202, 1)', 'rgba(50, 187, 199, 0)'],
    });

    const loopAnimation = Animated.sequence([
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
        }),
    ]);

    Animated.loop(loopAnimation).start();

    return (
        <Animated.View
            style={{
                position: 'absolute', // Position absolutely
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: gradientAnimation,
                zIndex: -1, // Set zIndex to control layering
            }}
        >
            <LinearGradient
                colors={['rgba(108, 187, 202, 1)', 'rgba(147, 208, 214, 0)']}
                start={[0, 0]}
                end={[0, 1]}
                style={{ flex: 1 }}
            />
        </Animated.View>
    );
};

export default GradientBackgroundComponent;