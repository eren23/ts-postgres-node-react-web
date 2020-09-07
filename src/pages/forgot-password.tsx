import React, { useState } from 'react'
import { Formik, Form, } from 'formik';
import {
    Button, Box,
} from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useForgotPasswordMutation } from '../generated/graphql';

import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';





const ForgotPassword: React.FC<{}> = ({ }) => {
    const [complete, setComplete] = useState(false)
    const [_, forgotPassword] = useForgotPasswordMutation()
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    await forgotPassword(values);
                    setComplete(true)
                }}>
                {
                    ({ isSubmitting }) => complete ? <Box>If an Account Exists, We Sent You an Email</Box> : (
                        <Form>
                            <InputField
                                name="email"
                                placeholder="email"
                                label="Type Email Address"
                                type="email "
                            />

                            <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">Forgot Password</Button>

                        </Form>
                    )
                }
            </Formik>
        </Wrapper>);
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)