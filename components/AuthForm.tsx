import { useState } from 'react';
import { callLoginAPI } from '@/lib/requests';
import { useSessionContext } from '@/state/SessionContext';
import { useToaster } from '@/state/ToastContext';

import { View } from 'react-native';
import { Link, LinkText } from "@/components/ui/link"
import { Button, ButtonText } from "@/components/ui/button"
import { UserDrowpdown } from './UserDropdown';
import PasswordFields from './PasswordFields';

import { FormType, UserType } from '@/types/types';


export default function AuthForm() {
    const signIn = useSessionContext((state: any) => state.signIn);
    const toaster = useToaster((state: any) => state.toaster)

    const [user, setUser] = useState<UserType | undefined>();

    const [formState, setFormState] = useState<FormType>('login');
    const toggleFormState = () => {
        if (formState === 'login') setFormState('signup');
        if (formState === 'signup') setFormState('login');
    };

    const onSubmit = async () => {
        // disable signup
        if (formState === 'signup') {
        toaster('Registration unavailable.');
        return;
        };

        // form validation
        if (!user) {
        toaster('Please select a login.');
        return;
        };

        const { data } = await callLoginAPI(user);
        if (!data) return;
        // store token in local cache
        signIn(data.token);
    }

    return (
        <View style={{ marginHorizontal: 'auto', flex: 1, width: 300 }}>
            <UserDrowpdown setUser={setUser} formState={formState} />
            <PasswordFields formState={formState} />

            <Button size="md" variant="solid" action="primary" onPress={onSubmit} style={{ marginTop: 15 }}>
                <ButtonText>{formState === 'login' ? 'Log In' : 'Sign Up'}</ButtonText>
            </Button>
        
            <Link onPress={toggleFormState} style={{ marginTop: 15 }}>
                <LinkText style={{margin: 'auto'}}>
                    {
                        formState === 'login' 
                            ? 'New here? '
                            : 'Already a user? '
                    }
                </LinkText>
            </Link>

        </View>
    );
};
