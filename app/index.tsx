import { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import { View } from 'react-native';
import { useToast, Toast, ToastDescription } from "@/components/ui/toast";
import React from "react";
	
type UserType = {
  name: string,
  role: 'admin' | 'non-admin',
};

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

  const toast = useToast();
  const [toastId, setToastId] = React.useState(0);
  const handleToast = () => {
      // @ts-ignore
      if (!toast.isActive(toastId)) {
          showNewToast();
      }
  };
  
  const showNewToast = () => {
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
              <ToastDescription>Please select a login.</ToastDescription>
            </Toast>
        );
      },
    });
  }

  const onSubmit = async () => {
    // form validation
    if (!user) {
      handleToast();
      return;
    };

    const { token } = await callLoginAPI(user);

    // TODO: sign user in
    // store token in local cache
  }

  return (
    <View style={{ margin: 'auto' }}>
      {/* TODO: backsplash */}
      <AuthForm setUser={setUser} onSubmit={onSubmit} />
    </View>
  )
}
