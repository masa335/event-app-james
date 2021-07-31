import { memo, VFC } from "react";
import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, Center, Stack, Link, Heading, Box, Wrap, WrapItem, HStack, Flex } from "@chakra-ui/react"

import { useSignin } from "../../hooks/useSignin";
import { SigninParams } from "../../types/signinParams";
import { EventCard } from "../organisms/event/eventCard";

export const Search: VFC = memo(() => {
  const { signin, loading } = useSignin();
  const { register, handleSubmit, formState } = useForm({ mode: "all" });

  const onSubmit = (params: SigninParams) => {
    // signin(params);
    console.log(params);
  };

  return (
    <>
    <Box my="20px" mx="20px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack spacing="24px" alignItems="flex-end">
          <Box>
            <FormControl>
              <FormLabel fontSize="md">キーワード</FormLabel>
              <Input 
              id="email"
              type="text"
              width="200px"
              placeholder="なんでも検索"
              {...register("email",{ required: "メールは必須入力です" })}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
            </FormControl>
          </Box>
          <Box>
            <Button type="submit" colorScheme="blue" disabled={!formState.isValid || loading} isLoading={loading}>検索</Button>
          </Box>
        </HStack>
      </form>

    <Box my="20px" p={1} bg="#76a1b8">
      <Heading as="h2" size="md" color="white">検索結果</Heading>
    </Box>
    <Wrap pr={{ base:4, md: 8 }} pl={{ base:4, md: 8 }} pb={{ base:4, md: 8 }} pt="5px" justify="space-around">
      {/* {events.map((event) => (
        <WrapItem key={event.id}>
          <EventCard
            id={event.id}
            userId={event.user_id}
            imageUrl={event.image.url ?? "https://placehold.jp/150x150.png?text=no image"}
            eventName={event.event_name}
            prefecture={event.prefecture_id ? prefectures[event.prefecture_id] : ""}
            onClick={onClickEvent}
          />
        </WrapItem>
      ))} */}
      <p>★検索結果表示</p>
    </Wrap>
  </Box>
  </>
  );
});