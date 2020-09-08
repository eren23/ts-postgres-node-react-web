import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link, Stack, Box, Heading, Text, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link"

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10
    }
  });
  if (!fetching && !data) {
    return <div>You got no data</div>
  }
  return (
    <Layout>
      <Flex align="center">
        <Heading >LiReddit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">
            Create a Post
           </Link>
        </NextLink>
      </Flex>
      <br />
      {fetching && !data ? (
        <div>loading...</div>
      ) : (<Stack spacing={8}>
        {data!.posts.map((p) => (

          <Box key={p.id} p={5} shadow="md" borderWidth="1px" >

            <Heading fontSize="xl">{p.title}</Heading>
            <Text mt={4}>{p.textSnippet}</Text>
          </Box>
        ))}
      </Stack>
        )}
      {data ? <Flex> <Button isLoading={fetching} m="auto" my={4} > Load More </Button></Flex> : null}

    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);