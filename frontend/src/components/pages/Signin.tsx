import { memo, VFC } from "react";
import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, Center, Stack, Link, Heading } from "@chakra-ui/react"

import { useSignin } from "../../hooks/useSignin";
import { SigninParams } from "../../types/signinParams";

export const Signin: VFC = memo(() => {
  const { signin, loading } = useSignin();
  const { register, handleSubmit, formState } = useForm({ mode: "all" });

  const onSubmit = (params: SigninParams) => {
    signin(params);
    console.log(params);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center my="30px" mx={{base: "40px", md: "200px", lg: "485px"}}>
          <Stack spacing={4} w="100%">
            <Heading as="h4" textAlign="center">ログイン</Heading>
            <FormControl>
              <FormLabel fontSize="md">メール</FormLabel>
              <Input 
              id="email"
              type="text"
              {...register("email",{ required: "メールは必須入力です" })}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md">パスワード</FormLabel>
              <Input 
              id="password"
              type="password"
              {...register("password",{ required: "パスワードは必須入力です" })}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
            </FormControl>
            <Button type="submit" colorScheme="blue" disabled={!formState.isValid || loading} isLoading={loading}>ログイン</Button>
            <Link color="teal.500" href="/signup">まだアカウントをお持ちでない方はこちら</Link>
          </Stack>
      </Center>
    </form>
  );
});