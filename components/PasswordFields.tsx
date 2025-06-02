import { Input, InputField } from "@/components/ui/input"
import { FormControl } from "@/components/ui/form-control"
import { FormType } from "@/types/types"

export default function PasswordFields({ formState }: { formState: FormType }) {
    return (
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
    );
};
