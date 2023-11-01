import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Constants from './colors';
import { Gradient2 } from './gradients';
import { commonStyles } from './styles';
import RectangleComponent from './RectangleComponent';
import GradientBackgroundComponent from './BackgroundComponent';

import {slideGradientAnimation } from './titleAnimation';


const HomeScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const containerWidth = (screenWidth * 90) / 100; // 90% of the screen width
    const containerHeight = (screenHeight * 85) / 100; // 85% of the screen height

    const navigation = useNavigation();

    const handleLoginButtonPress = () => {
        // Define the action you want to perform when the button is pressed.
        // You can add navigation, state updates, or any other functionality here.
        navigation.navigate('Login');
    };

    const handleSignupButtonPress = () => {
        // Define the action you want to perform when the button is pressed.
        // You can add navigation, state updates, or any other functionality here.
        navigation.navigate('Signup');
    };

    const handleGuestButtonPress = () => {
        // Define the action you want to perform when the button is pressed.
        // You can add navigation, state updates, or any other functionality here.
        navigation.navigate('Guest');
    };

    const { gradientAnimation, startAnimation } = slideGradientAnimation(6000);

    useEffect(() => {
        // Start the animation
        startAnimation();
    }, []);

    return (
        <View style={commonStyles.container}>
            <GradientBackgroundComponent />
            <View style={styles.content}>
                <View style={[commonStyles.blackBorder, { width: containerWidth, height: containerHeight }]}>
                    <Animated.Text
                        style={[
                            commonStyles.text,
                            { textAlign: 'center', marginTop: 30, color: gradientAnimation, fontFamily: 'Futura', textShadowColor: 'black', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 0, fontWeight: 'bold'},
                        ]}
                    >
                        FESTIVA!
                    </Animated.Text>
                    <RectangleComponent />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={handleLoginButtonPress}>
                            <View style={commonStyles.button}>
                                <Text style={[commonStyles.buttonText, styles.textShadow]}>Login</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 10 }}>
                            <TouchableOpacity onPress={handleSignupButtonPress}>
                                <View style={commonStyles.button}>
                                    <Text style={[commonStyles.buttonText, styles.textShadow]}>Signup</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleGuestButtonPress}>
                            <View style={[commonStyles.button, { backgroundColor: Constants.Turqoise }]}>
                            <Text style={[commonStyles.buttonText, styles.textShadow]}>Continue as Guest</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        position: 'relative',
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 0, // Shadow radius
      },
});

export default HomeScreen;