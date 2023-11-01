import * as React from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { commonStyles } from './styles';
import { Gradient1 } from './gradients';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Constants from './colors';

type Props = StackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const containerWidth = (screenWidth * 90) / 100; // 90% of the screen width
    const containerHeight = (screenHeight * 85) / 100; // 85% of the screen height

    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');


    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const handleSignup = () => {
        // Navigate to the 'Signup' screen when the "Signup" text is pressed
        console.log('User: ', user);
        console.log('Password: ', password);
        navigation.navigate('Home'); // Navigate to the 'Main' screen
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
                        <Text style={[commonStyles.text, { textAlign: 'center' }]}>
                            FESTIVA
                        </Text>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ paddingBottom: 10 }}>Signup Screen</Text>
                            <TextInput
                                style={commonStyles.input}
                                placeholder="Email"
                                secureTextEntry={true}
                                onChangeText={(text) => setEmail(text)}
                                value={password}
                            />
                            <TextInput
                                style={commonStyles.input}
                                placeholder="Username"
                                onChangeText={(text) => setUser(text)}
                                value={user}
                            />
                            <TextInput
                                style={commonStyles.input}
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                            />
                            <TextInput
                                style={commonStyles.input}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                onChangeText={(text) => setConfPassword(text)}
                                value={password}
                            />
                            <Text style={{ paddingBottom: 10 }}>
                                Have an account?{' '}
                                <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={handleLogin}>
                                    Login
                                </Text>
                            </Text>
                            <TouchableOpacity onPress={handleSignup}>
                                <View style={[commonStyles.button, { backgroundColor: Constants.Turqoise, width: 230, height: 50 }]}>
                                    <Text style={commonStyles.buttonText}>Signup</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default SignupScreen;