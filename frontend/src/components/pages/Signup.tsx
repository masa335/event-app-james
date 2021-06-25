import { ChangeEvent, memo, useState, VFC } from "react";
import { Button, FormControl, FormLabel, Input, Center, Stack } from "@chakra-ui/react"

export const Signup: VFC = memo(() => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");


  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
  };

  return (
    <Center my="30px" mx={{base: "40px", md: "200px", lg: "485px"}}>
      <Stack spacing={4} w="100%">
        <FormControl>
          <FormLabel fontSize="md">メール</FormLabel>
          <Input value={email} onChange={onChangeEmail} border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="md">ニックネーム</FormLabel>
          <Input value={name} onChange={onChangeName} border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
        </FormControl>
        <FormControl>
          <FormLabel type="date" fontSize="md">パスワード</FormLabel>
          <Input value={password} onChange={onChangePassword} border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="md">パスワード再確認</FormLabel>
          <Input value={passwordConfirmation} onChange={onChangePasswordConfirmation} border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
        </FormControl>
        <Button colorScheme="blue">サインアップ</Button>
      </Stack>
    </Center>
  );
});