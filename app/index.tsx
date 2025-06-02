import { useState } from 'react';
import { useToast, Toast, ToastDescription } from "@/components/ui/toast";

import AuthForm from '@/components/AuthForm';
import BackSplash from '@/components/BackSplash';


export default function AuthScreen() {
  // gluestack UI lib toast 
  // https://gluestack.io/ui/docs/components/toast
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

  return (<>
    <BackSplash />
    <AuthForm handleToast={handleToast}/>
  </>);
};
