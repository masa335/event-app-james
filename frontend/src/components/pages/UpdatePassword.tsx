import { memo, VFC } from "react";
import { Button, FormControl, FormLabel, Input, Center, Stack, FormErrorMessage, Box, Heading } from "@chakra-ui/react"
import { SignupParams } from "../../types/signupParams";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { usePassword } from "../../hooks/usePassword";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/Auth";

export const UpdatePassword: VFC = memo(() => {
  const { updatePassword, loading } = usePassword();
  const { register, handleSubmit, watch, formState, formState: { errors } } = useForm({ mode: "all" });

  const auth = useRecoilValue(authState);

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (params: SignupParams) => {
    const isGuestUser = auth.currentUser?.email === 'guest@example.com';
    isGuestUser ? alert("ゲストユーザーのパスワードは変更できません。") : updatePassword(auth.currentUser?.id, params);
  };

  return (
    <>
    <Box my="20px" mx="20px" p={1} bg="#76a1b8">
      <Heading as="h2" size="md" color="white">パスワード変更</Heading>
    </Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center my="30px" mx={{base: "40px", md: "200px", lg: "485px"}}>
          <Stack spacing={4} w="100%">
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
            <Button type="submit" colorScheme="blue" disabled={!formState.isValid || loading} isLoading={loading}>変更する</Button>
          </Stack>
      </Center>
    </form>
    </>
  );
});