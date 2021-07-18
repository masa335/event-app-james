import React, { memo, VFC, useEffect, useState, useCallback, ChangeEvent, } from "react";
import { Heading, Box, Center, Stack, FormControl, FormLabel, Input, FormErrorMessage, Button, Textarea, Link, Image } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { User } from "../../types/user";
import { useUser } from "../../hooks/useUser";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/Auth";

export const Settings: VFC = memo(() => {
  const { updateUserInfo, loading } = useUser();
  const [ userId, setUserId ] = useState<number>();

  const auth = useRecoilValue(authState);

  const [image, setImage] = useState<File>();

  //ユーザー情報を取得
  useEffect(() => {

    setValue("name", auth.currentUser?.name);
    setValue("age", auth.currentUser?.age);
    setValue("self_introduction", auth.currentUser?.self_introduction);
    setUserId(auth.currentUser?.id);

    const cleanup = () => {
      setValue("name", auth.currentUser?.name);
      setValue("age", auth.currentUser?.age);
      setValue("self_introduction", auth.currentUser?.self_introduction);
      setUserId(auth.currentUser?.id);
    };

    return cleanup;
    
  },[auth]);

  const { register, handleSubmit,　setValue, formState: { errors } } = useForm({ 
    mode: "onChange"
  });

  const selectImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selectedImage: File = e.target.files[0];
    console.log(selectedImage);
    setImage(selectedImage)
  }, [])

  type Params = {
    name: string;
    age: number;
    self_introduction: string;
  };

  const onSubmit = (params: Params) => {
    //画像もアップロードするので、FormDataを使う。
    const formData = new FormData();
    formData.append('name', params.name);
    formData.append('age', `${params.age}`);
    formData.append('self_introduction', params.self_introduction);
    image && formData.append('image', image ?? ""); //画像が選択されていない時はappendしない。

    updateUserInfo(userId, formData);
  };

  return (
    <>
    {console.log("return")}
    <Box mx="40px" my="20px">
      <Box my="20px" p={1} bg="#76a1b8">
        <Heading as="h2" size="md" color="white">各種設定</Heading>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center my="30px" mx={{base: "10px", md: "200px", lg: "300px"}}>
          <Stack spacing={4} w="100%">
            <Heading as="h2" size="md" color="gray.600">プロフィール編集</Heading>
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
            <FormControl>
              <FormLabel fontSize="md">プロフィール画像</FormLabel>
              <Stack direction="column">
                <Image
                  borderRadius="full"
                  boxSize="100px"
                  src={auth.currentUser?.image.url}
                  alt={auth.currentUser?.name}
                />
                <input 
                id="image"
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => selectImage(e)}
                />
              </Stack>
            </FormControl>
            <Heading as="h2" size="md" color="gray.600">パスワード変更</Heading>
            <Link href="/updatePassword" color="teal.500">パスワード設定を開く</Link>
            <Button type="submit" colorScheme="blue" disabled={loading} isLoading={loading}>保存する</Button>
            <Link color="red.400">アカウントを削除する</Link>
          </Stack>
        </Center>
      </form>
    </Box>
    </>
  );
});