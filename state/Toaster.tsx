import { useState } from "react";
import { useToaster } from "./ToastContext";

import {
  useToast,
  Toast,
  ToastDescription,
} from "@/components/ui/toast"

/**
 * Toast provider (it provides toast!)
 *
 * https://gluestack.io/ui/docs/components/toast
 */
export default function Toaster({ children }: any) {
    const setToaster = useToaster((state: any) => state.setToaster);

    const toast = useToast()
    const [toastId, setToastId] = useState(0)

    const handleToast = (msg: string) => {
        // @ts-ignore
        if (!toast.isActive(toastId)) {
            showNewToast(msg)
        }
    };
    setToaster(handleToast);

    const showNewToast = (msg: string) => {
        const newId = Math.random()
        setToastId(newId)
        toast.show({
            // @ts-ignore
            id: newId,
            placement: "bottom",
            duration: 1500,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id
                return (
                    <Toast nativeID={uniqueToastId} action="muted" variant="solid">
                        <ToastDescription>{msg}</ToastDescription>
                    </Toast>
                )
            },
        })
    };

    return children
}