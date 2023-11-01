import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import Constants from './colors';
import { Gradient1 } from './gradients';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles } from './styles';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const containerWidth = (screenWidth * 90) / 100; // 90% of the screen width
    const containerHeight = (screenHeight * 85) / 100; // 85% of the screen height
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('User: ', user);
        console.log('Password: ', password);
        navigation.navigate('Home'); // Navigate to the 'Main' screen
    };

    const handleSignup = () => {
        // Navigate to the 'Signup' screen when the "Signup" text is pressed
        navigation.navigate('Signup');
    };

    return (
        <View style={commonStyles.container}>
            <LinearGradient
                colors={Gradient1.colors}
                start={[0.5, 0]}
                end={[0.5, 1]}
                style={commonStyles.background}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <View style={[commonStyles.blackBorder, { width: containerWidth, height: containerHeight }]}>
                    <Text style={[commonStyles.text, {textAlign: 'center'}]}>
                        FESTIVA
                    </Text>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ paddingBottom: 10 }}>Login Screen</Text>
                            <TextInput
                                style={commonStyles.input}
                                placeholder="Username"
                                onChangeText={(text) => setUser(text)}
                                value={user}
                            />
                            <TextInput
                                style={commonStyles.input}
                                placeholder="Password"
                                secureTextEntry={true} // For password input
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                            />
                            <Text style={{ paddingBottom: 10 }}>
                                Don't Have an account?{' '}
                                <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={handleSignup}>
                                    Signup
                                </Text>
                            </Text>
                            <TouchableOpacity onPress={handleLogin}>
                                <View style={[commonStyles.button, { backgroundColor: Constants.Turqoise, width: 230, height: 50 }]}>
                                    <Text style={commonStyles.buttonText}>Login</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View >
    );
};

export default LoginScreen;