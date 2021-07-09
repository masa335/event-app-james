import { memo, VFC, useEffect, } from "react";
import { Heading, Box, Center, Stack, FormControl, FormLabel, Input, FormErrorMessage, Button, Textarea, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useCurrentUser } from "../../hooks/useCurrentUser";
import { User } from "../../types/user";
import { useUser } from "../../hooks/useUser";

export const Settings: VFC = memo(() => {
  const { getCurrentUser, auth } = useCurrentUser();
  const { updateUserInfo, loading } = useUser();
  
  const userId = auth.currentUser?.id;
  const name = auth.currentUser?.name;
  const age = auth.currentUser?.age;
  const self_introduction = auth.currentUser?.self_introduction;
  
  const { register, handleSubmit, formState, formState: { errors } } = useForm({ 
    mode: "all", 
    defaultValues: {
      name: name, 
      age: age, 
      self_introduction: self_introduction
    } 
  });

  //ページを開いた時にだけ実行する
  useEffect(() => getCurrentUser(),[getCurrentUser])

  const onSubmit = (params: User) => {
    updateUserInfo(userId, params);
  };

  return (
    <>
    <Box mx="40px" my="20px">
      <Box my="20px" p={1} bg="#76a1b8">
        <Heading as="h2" size="md" color="white">各種設定</Heading>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center my="30px" mx={{base: "10px", md: "200px", lg: "300px"}}>
          <Stack spacing={4} w="100%">
            <Heading as="h2" size="md" color="gray.600">プロフィール編集</Heading>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel fontSize="md">ニックネーム</FormLabel>
              <Input 
              id="name"
              type="text"
              {...register("name",{ required: "ニックネームは必須入力です" })}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md">年齢</FormLabel>
              <Input 
              id="age"
              type="text"
              {...register("age")}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md">自己紹介</FormLabel>
              <Textarea
              id="self_introduction"
              type="textarea"
              {...register("self_introduction")}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
            </FormControl>
            <Heading as="h2" size="md" color="gray.600">パスワード変更</Heading>
            <Link color="teal.500">パスワード設定を開く</Link>
            <Button type="submit" colorScheme="blue" disabled={!formState.isValid || loading} isLoading={loading}>保存する</Button>
            <Link color="red.400">アカウントを削除する</Link>
          </Stack>
        </Center>
      </form>
    </Box>
    </>
  );
});