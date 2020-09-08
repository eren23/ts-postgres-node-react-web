import React from 'react'
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { Box, Button } from '@chakra-ui/core';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';



const CreatePost: React.FC<{}> = ({ }) => {
    const [{ data }] = useMeQuery()
    const router = useRouter();
    useIsAuth();
    const [, createPost] = useCreatePostMutation()
    return (
        <Layout variant="small">

            <Formik initialValues={{ title: "", text: "" }} onSubmit={async (values) => {
                console.log(values);
                const { error } = await createPost({ input: values })
                if (!error) {
                    router.push("/");
                }
            }}>
                {
                    ({ isSubmitting }) => !data?.me ? <div>Loading...</div> : (
                        <Form>
                            <InputField
                                name="title"
                                placeholder="title"
                                label="Title"
                            />
                            <Box mt={4}>
                                <InputField
                                    textarea
                                    name="text"
                                    placeholder="text..."
                                    label="Text"
                                />

                            </Box>
                            <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">Create Post</Button>

                        </Form>
                    )
                }
            </Formik>

        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost)