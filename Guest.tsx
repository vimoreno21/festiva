import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type Props = StackScreenProps<RootStackParamList, 'Guest'>;

const SignupScreen = ({ navigation }: Props) => {
    const handleContinue = () => {
        console.log('Guest User Created');
        navigation.navigate('Home'); // Navigate to the 'Main' screen RN ITS HOME
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Guest Screen [GUESTUSER]</Text>
            <Button title="Continue" onPress={handleContinue} />
        </View>
    );
};

export default SignupScreen;