import React, { memo, VFC, useState, useCallback, ChangeEvent, useEffect, } from "react";
import { Heading, Box, Center, Stack, FormControl, FormLabel, Input, FormErrorMessage, Button, Textarea, Select, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/Auth";
import { Event } from "../../types/event";
import { prefectures } from "../../data/prefectures";
import { useEvents } from "../../hooks/useEvents";
import { useParams } from "react-router-dom";
import moment from 'moment';
import { EventCategoryList } from "../../data/EventCategoryList";

export const EditEvent: VFC = memo(() => {
  const { id } = useParams<{ id: string }>(); //URLパラメーターを受け取る
  const { updateEvent, deleteEvent, loading } = useEvents();
  const { getEvent, event } = useEvents();

  const auth = useRecoilValue(authState);

  const [image, setImage] = useState<File>();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ 
    mode: "onChange"
  });

  const selectImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selectedImage: File = e.target.files[0];
    setImage(selectedImage)
  }, [])

  const onClickDelete = () => {
    deleteEvent(id, event?.user_id);
  };

  // イベント情報を取得
  useEffect(() => getEvent(id),[getEvent])

  //イベント情報をフォームにセット
  useEffect(() => {

    const startDate = moment(event?.start_date, moment.ISO_8601).format("yyyy-MM-DDTHH:mm");
    const endDate = moment(event?.end_date, moment.ISO_8601).format("yyyy-MM-DDTHH:mm");

    setValue("event_name", event?.event_name);
    setValue("event_category", event?.event_category);
    setValue("start_date", startDate);
    setValue("end_date", endDate);
    setValue("prefecture_id", event?.prefecture_id);
    setValue("max_participants", event?.max_participants);
    setValue("venue", event?.venue);
    setValue("explanation", event?.explanation);

    const cleanup = () => {
      setValue("event_name", event?.event_name);
      setValue("event_category", event?.event_category);
      setValue("start_date", startDate);
      setValue("end_date", endDate);
      setValue("prefecture_id", event?.prefecture_id);
      setValue("max_participants", event?.max_participants);
      setValue("venue", event?.venue);
      setValue("explanation", event?.explanation);
    };

    return cleanup;
    
  },[event]);

  const onSubmit = (params: Event) => {
    //画像もアップロードするので、FormDataを使う。
    const formData = new FormData();
    const startDate = (new Date(params.start_date).toString());
    const endDate = (new Date(params.end_date).toString());
    formData.append('user_id', `${auth.currentUser?.id}`);
    formData.append('event_name', params.event_name);
    formData.append('event_category', `${params.event_category}`);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('prefecture_id', `${params.prefecture_id}`);
    formData.append('max_participants', `${params.max_participants}`);
    formData.append('venue', params.venue);
    formData.append('explanation', params.explanation);
    image && formData.append('image', image ?? ""); //画像が選択されていない時はappendしない。

    console.log(formData.get('user_id'));
    updateEvent(id, formData);
  };

  return (
    <>
    <Box mx={{ base:2, md: "40px" }} my="20px">
      <Box my="20px" p={1} bg="#76a1b8">
        <Heading as="h2" size="md" color="white">イベント編集</Heading>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center my="30px" mx={{base: "10px", md: "200px", lg: "300px"}}>
          <Stack maxW="500px" spacing={4} w="100%">
            <FormControl isInvalid={errors.event_name}>
              <FormLabel fontSize="md">イベント名</FormLabel>
              <Input 
              id="event_name"
              type="text"
              {...register("event_name",{ required: "イベント名は必須入力です", maxLength: {value: 50, message: "50字以内で入力してください"} })}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.event_name && errors.event_name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md">カテゴリ</FormLabel>
              <Select 
              id="event_category"
              placeholder="選択してください"
              type="text"
              {...register("event_category")}
              w="200px" border="1px" borderColor="gray.400" backgroundColor="gray.100"
              >
                {
                  EventCategoryList.map((category, index) =>
                  <option key={index} value={index}>{category}</option>
                  )
                }
              </Select>
            </FormControl>
            <FormControl isInvalid={errors.start_date}>
              <FormLabel fontSize="md">開始日時</FormLabel>
              <Input
              id="start_date"
              type="datetime-local"
              {...register("start_date", { required: "開始日時は必須入力です"})}
              w="250px" border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.start_date && errors.start_date.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.end_date}>
              <FormLabel fontSize="md">終了日時</FormLabel>
              <Input
              id="end_date"
              type="datetime-local"
              {...register("end_date", { required: "終了日時は必須入力です"})}
              w="250px" border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
              <FormErrorMessage>
                {errors.end_date && errors.end_date.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md">開催する都道府県</FormLabel>
              <Select 
              id="prefecture_id"
              placeholder="選択してください"
              type="text"
              {...register("prefecture_id")}
              w="200px" border="1px" borderColor="gray.400" backgroundColor="gray.100"
              >
                {
                  prefectures.map((prefecture, index) =>
                  <option key={index} value={index}>{prefecture}</option>
                  )
                }
              </Select>
            </FormControl>
            <FormControl isInvalid={errors.max_participants}>
              <FormLabel fontSize="md">参加人数上限</FormLabel>
              <Input 
              id="max_participants"
              type="text"
              {...register("max_participants",{ 
                required: "参加人数上限は必須入力です",
                max: {value: 100, message: "100人以下で入力してください"}, 
                pattern: {value: /^[0-9]+$/, message: "半角数字で入力してください"} 
              })}
              w="70px" border="1px" borderColor="gray.400" backgroundColor="gray.100"/> 人
              <FormErrorMessage>
                {errors.max_participants && errors.max_participants.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md">会場</FormLabel>
              <Input
              id="venue"
              type="text"
              {...register("venue")}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md">イベントの説明</FormLabel>
              <Textarea
              id="explanation"
              type="date"
              {...register("explanation")}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md">イベント画像</FormLabel>
              <Stack direction="column">
                <input 
                id="image"
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => selectImage(e)}
                />
              </Stack>
            </FormControl>
            <Button type="submit" colorScheme="blue" disabled={loading} isLoading={loading}>保存する</Button>
            <Link onClick={onClickDelete} color="red.400">イベントを削除する</Link>
          </Stack>
        </Center>
      </form>
    </Box>
    </>
  );
});