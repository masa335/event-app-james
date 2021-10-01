import React, { memo, VFC, useEffect, useState, useCallback, ChangeEvent, useRef, } from "react";
import { Heading, Box, Center, Stack, FormControl, FormLabel, Input, FormErrorMessage, Button, Textarea, Link, Image, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useUser } from "../../hooks/useUser";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/Auth";

export const Settings: VFC = memo(() => {
  const { updateUserInfo, deleteUser, loading } = useUser();
  const [ userId, setUserId ] = useState<number>();
  const auth = useRecoilValue(authState);

  const [image, setImage] = useState<File>();

  //ユーザー削除ダイアログ用
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const onCloseDialog = () => setIsOpenDialog(false);
  const onOpenDialog = () => setIsOpenDialog(true);

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

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ 
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

  const onClickUserDelete = () => {
    const isGuestUser = auth.currentUser?.email === 'guest@example.com'
    isGuestUser ? alert("ゲストユーザーは消さないでください！！！") : deleteUser(auth.currentUser?.id);
    setIsOpenDialog(false);
  }

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
              {...register("name",{ required: "ニックネームは必須入力です", maxLength: {value: 50, message: "50字以内で入力してください"} })}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.age}>
              <FormLabel fontSize="md">年齢</FormLabel>
              <Input 
              id="age"
              type="text"
              {...register("age",{ maxLength: {value: 3, message: "3文字以内で入力してください"}, pattern: {value: /^[0-9]+$/, message: "半角数字で入力してください"} })}
              w="70px" border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.age && errors.age.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.self_introduction}>
              <FormLabel fontSize="md">自己紹介</FormLabel>
              <Textarea
              id="self_introduction"
              type="textarea"
              {...register("self_introduction", {maxLength: {value: 200, message: "200字以内で入力してください"}})}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.self_introduction && errors.self_introduction.message}
              </FormErrorMessage>
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
            <Link onClick={onOpenDialog} color="red.400">アカウントを削除する</Link>
          </Stack>
        </Center>
      </form>
    </Box>
    <AlertDialog isOpen={isOpenDialog} leastDestructiveRef={cancelRef} onClose={onCloseDialog}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            アカウント削除
          </AlertDialogHeader>

          <AlertDialogBody>
            {`アカウントを削除します。\nよろしいですか？`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseDialog}>
              キャンセル
            </Button>
            <Button colorScheme="red" onClick={onClickUserDelete} ml={3}>
              アカウント削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
    </>
  );
});