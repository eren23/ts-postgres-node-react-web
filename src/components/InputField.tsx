import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Textarea
} from "@chakra-ui/core";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    textarea?: boolean;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    textarea,
    ...props
}) => {
    const [field, { error }] = useField(props);
    let InputOrTextarea = Input
    if (textarea) {
        InputOrTextarea = Textarea
    }
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea {...field} {...props} id={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};