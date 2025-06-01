import { useState } from 'react';
import { View } from 'react-native';
import { UserDrowpdown } from './UserDropdown';
import { Input, InputField } from "@/components/ui/input"
import { FormControl } from "@/components/ui/form-control"
import { Link, LinkText } from "@/components/ui/link"
import { Button, ButtonText } from "@/components/ui/button"

export default function AuthForm({ setUser, onSubmit }: any) {
    const [formState, setFormState] = useState<'login' | 'signup'>('login');
    const toggleFormState = () => {
        if (formState === 'login') setFormState('signup');
        if (formState === 'signup') setFormState('login');
    };

    return (<>
        <View>
            <UserDrowpdown setUser={setUser} formState={formState} />

            {/* password fields */}
            <FormControl
                size="md"
                isDisabled={true}
                isReadOnly={true}
                isRequired={false}
            >
                <Input className="my-1" size="lg">
                    <InputField type="password" placeholder="password"/>
                </Input>
                {
                    formState === 'signup' ?
                        <Input className="my-1" size="lg">
                            <InputField type="password" placeholder="confirm password"/>
                        </Input>
                        : <></>
                }
            </FormControl>


            <Button size="md" variant="solid" action="primary" onPress={onSubmit} style={{ marginTop: 15 }}>
                <ButtonText>{formState === 'login' ? 'Log In' : 'Sign Up'}</ButtonText>
            </Button>
        
            <Link onPress={toggleFormState} style={{ marginTop: 15 }}>
                <LinkText style={{margin: 'auto'}}>{
                    formState === 'login' 
                        ? 'New here? '
                        : 'Already a user? '
                }</LinkText>
            </Link>

        </View>
    </>)
}
