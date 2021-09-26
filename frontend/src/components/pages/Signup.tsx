import { memo, VFC } from "react";
import { Button, FormControl, FormLabel, Input, Center, Stack, FormErrorMessage, Heading } from "@chakra-ui/react"
import { useSignup } from "../../hooks/useSignup";
import { SignupParams } from "../../types/signupParams";
import { useForm } from "react-hook-form";
import { useRef } from "react";

export const Signup: VFC = memo(() => {
  const { signup, loading } = useSignup();
  const { register, handleSubmit, watch, formState, formState: { errors } } = useForm({ mode: "all" });

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (params: SignupParams) => {
    params.confirm_success_url = "http://localhost:3000/";
    signup(params);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center my="30px" mx={{base: "40px", md: "200px", lg: "485px"}}>
          <Stack spacing={4} w="100%">
            <Heading as="h4" size="md" textAlign="left">新規登録</Heading>
            <FormControl isInvalid={errors.email}>
              <FormLabel fontSize="md">メール</FormLabel>
              <Input 
              id="email"
              type="text"
              {...register("email",{ required: "メールは必須入力です" })}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.name}>
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
            <FormControl isInvalid={errors.password}>
              <FormLabel fontSize="md">パスワード</FormLabel>
              <Input 
              id="password"
              type="password"
              {...register("password",{ 
                required: "パスワードは必須入力です"
              })}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password_confirmation}>
              <FormLabel fontSize="md">パスワード再確認</FormLabel>
              <Input 
              id="password_confirmation"
              type="password"
              {...register("password_confirmation",{ 
                required: "パスワード再確認は必須入力です",
                validate: value => value === password.current || "パスワードが一致しません"
              })}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.password_confirmation && errors.password_confirmation.message}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="blue" disabled={!formState.isValid || loading} isLoading={loading}>サインアップ</Button>
          </Stack>
      </Center>
    </form>
  );
});