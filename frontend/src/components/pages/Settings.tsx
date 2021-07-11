import React, { memo, VFC, useEffect, useState, useCallback, ChangeEvent, } from "react";
import { Heading, Box, Center, Stack, FormControl, FormLabel, Input, FormErrorMessage, Button, Textarea, Link, Image } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useCurrentUser } from "../../hooks/useCurrentUser";
import { User } from "../../types/user";
import { useUser } from "../../hooks/useUser";

export const Settings: VFC = memo(() => {
  const { getCurrentUser, auth } = useCurrentUser();
  const { updateUserInfo, getUserInfo, userInfo, loading } = useUser();
  const [ userId, setUserId ] = useState<number>();

  const [image, setImage] = useState<File>();

  //ページを開いた時にだけ実行する
  // useEffect(() => {
  //   const test = async() => await getCurrentUser()
  //   test();
  // },[])
  useEffect (() => {
    getCurrentUser();
    console.log("currentUser");
    console.log(auth.currentUser);
  },[]);

  // const setData = async () => {
  //   await getCurrentUser();
  //   const userId = auth.currentUser?.id;
  //   console.log(`1.${userId}`);
  // }
  // const userId = auth.currentUser?.id;
  // console.log(`1.${userId}`);

  //ユーザー情報を取得
  useEffect(() => {
    getUserInfo(9);
    console.log("getUserInfo");
    console.log(auth.currentUser?.id);
  },[]);

  // const name = userInfo?.name;
  // const age = userInfo?.age;
  // const self_introduction = userInfo?.self_introduction;
  // const imageUrl = `http://192.168.10.2:3001${userInfo?.image.url}`
  
  // console.log(`2.${userId}`);

  const { register, handleSubmit, formState, formState: { errors } } = useForm({ 
    mode: "all"
  });

  const selectImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selectedImage: File = e.target.files[0];
    setImage(selectedImage)
  }, [])

  const onSubmit = (params: User) => {
    //画像もアップロードするので、FormDataを使う。
    const formData = new FormData();
    formData.append('name', params.name)
    formData.append('age', `${params.age}`)
    formData.append('self_introduction', params.self_introduction)
    formData.append('image', image ?? "")

    updateUserInfo(userId, formData);
  };

  

  const [name, setName] = useState("");
  const [age, setAge] = useState<number>();
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.valueAsNumber);
  };
  const onChangeSelfIntroduction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSelfIntroduction(e.target.value);
  };

  useEffect(() => {
    setName(auth.currentUser?.name ?? "");
    setAge(auth.currentUser?.age);
    setSelfIntroduction(auth.currentUser?.self_introduction ?? "");
    setUserId(auth.currentUser?.id);
  },[]);

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
              value={name}
              {...register("name",{ required: "ニックネームは必須入力です" })}
              onChange={onChangeName}
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
              value={age}
              {...register("age")}
              onChange={onChangeAge}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md">自己紹介</FormLabel>
              <Textarea
              id="self_introduction"
              type="textarea"
              value={selfIntroduction}
              {...register("self_introduction")}
              onChange={onChangeSelfIntroduction}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md">プロフィール画像</FormLabel>
              <Stack direction="column">
                <Image
                  borderRadius="full"
                  boxSize="100px"
                  src={`http://192.168.10.2:3001${userInfo?.image.url}`}
                  alt={userInfo?.name}
                />
                <input 
                id="image"
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => selectImage(e)}
                />
              </Stack>
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