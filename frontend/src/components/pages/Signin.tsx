import { memo, VFC } from "react";
import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, Center, Stack, Link, Heading, FormErrorMessage } from "@chakra-ui/react"

import { useSignin } from "../../hooks/useSignin";
import { SigninParams } from "../../types/signinParams";
import { GuestUserInfo } from "../../data/GuestUserInfo";

export const Signin: VFC = memo(() => {
  const { signin, loading } = useSignin();
  const { register, handleSubmit, formState, formState: { errors } } = useForm({ mode: "all" });

  const onSubmit = (params: SigninParams) => {
    signin(params);
    console.log(params);
  };

  const onClickGuestLogin = () => {
    const params = GuestUserInfo;
    signin(params);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center my="30px" mx={{base: "40px", md: "200px", lg: "485px"}}>
          <Stack maxW="500px" spacing={4} w="100%">
            <Heading as="h4" size="md" textAlign="left">ログイン</Heading>
            <FormControl isInvalid={errors.email}>
              <FormLabel fontSize="md">メール</FormLabel>
              <Input 
              id="email"
              type="email"
              {...register("email",{ required: "メールは必須入力です" , pattern: {
                value: /\S+@\S+\.\S+/,
                message: "メールアドレスの形式で入力してください"
              }})}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel fontSize="md">パスワード</FormLabel>
              <Input 
              id="password"
              type="password"
              {...register("password",{ required: "パスワードは必須入力です"})}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="blue" disabled={!formState.isValid || loading} isLoading={loading}>ログイン</Button>
            <Button onClick={onClickGuestLogin} colorScheme="teal" isLoading={loading}>ゲストユーザーでログインする</Button>
            <Link color="teal.500" href="/signup">まだアカウントをお持ちでない方はこちら</Link>
          </Stack>
      </Center>
    </form>
  );
});