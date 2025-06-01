import { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import { Image, Text, View } from 'react-native';
import { useToast, Toast, ToastDescription } from "@/components/ui/toast";
	
type UserType = {
  name: string,
  role: 'admin' | 'non-admin',
};

type FormType = 'login' | 'signup';

// returns info about user
export const callLoginAPI = async (user: UserType) => {
  return {
    token: {
      id: "xxx-xxx",
      name: user.name,
      role: user.role,
    }
  }
};

export default function AuthScreen() {
  const [user, setUser] = useState<UserType | undefined>();
  const [formState, setFormState] = useState<FormType>('login');

  const toast = useToast();
  const [toastId, setToastId] = useState(0);
  const handleToast = (msg: string) => {
      // @ts-ignore
      if (!toast.isActive(toastId)) {
          showNewToast(msg);
      }
  };
  
  const showNewToast = (msg: string) => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      // @ts-ignore
      id: newId,
      placement: 'bottom',
      duration: 1500,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
            <Toast nativeID={uniqueToastId} action="muted" variant="solid" >
              <ToastDescription>{msg}</ToastDescription>
            </Toast>
        );
      },
    });
  }

  const onSubmit = async () => {
    // disable signup
    if (formState === 'signup') {
      handleToast('Registration unavailable.');
      return;
    };

    // form validation
    if (!user) {
      handleToast('Please select a login.');
      return;
    };

    const { token } = await callLoginAPI(user);

    // TODO: sign user in
    // store token in local cache
  }

  return (<>
    {/* backsplash */}
    <View style={{ height: 250, width: '100%' }}>
      <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 'auto' }}>
        <View style={{ margin: 'auto' }}>
          <Image 
            style={{ height: 80, width: 80 }}
            source={require('@/assets/tower.png')}
          />
        </View>

        <Text style={{ fontSize: 35, marginLeft: 20, marginVertical: 'auto' }}>Tower Comm</Text>
      </View>
    </View>

    {/* form */}
    <View style={{ marginHorizontal: 'auto', flex: 1, width: 300 }}>
      <AuthForm setUser={setUser} formState={formState} setFormState={setFormState} onSubmit={onSubmit} />
    </View>
  </>)
}
