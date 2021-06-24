import { ChangeEvent, memo, useState, VFC } from "react";
import { FormControl, FormLabel, Input, Center, Stack, Textarea } from "@chakra-ui/react"

export const CreateEvent: VFC = memo(() => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [venue, setVenue] = useState("");
  const [explanation, setExplanation] = useState("");

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  const onChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  }
  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  }
  const onChangePrefecture = (e: ChangeEvent<HTMLInputElement>) => {
    setPrefecture(e.target.value);
  }
  const onChangeVenue = (e: ChangeEvent<HTMLInputElement>) => {
    setVenue(e.target.value);
  }
  const onChangeExplanation = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExplanation(e.target.value);
  }

  return (
    <Center my="30px" mx={{base: "10px", md: "30px", lg: "300px"}}>
      <Stack spacing={4} w="100%">
        <FormControl isRequired>
          <FormLabel fontSize="md">イベント名</FormLabel>
          <Input value={name} onChange={onChangeName} border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="md">カテゴリ</FormLabel>
          <Input value={category} onChange={onChangeCategory} border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
        </FormControl>
        <FormControl>
          <FormLabel type="date" fontSize="md">開催日</FormLabel>
          <Input value={date} onChange={onChangeDate} border="1px" w="200px" borderColor="gray.400" backgroundColor="gray.100"/>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="md">開催する都道府県</FormLabel>
          <Input value={prefecture} onChange={onChangePrefecture} w="100px" border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="md">会場</FormLabel>
          <Input value={venue} onChange={onChangeVenue} border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="md">イベントの説明</FormLabel>
          <Textarea value={explanation} onChange={onChangeExplanation} border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
        </FormControl>
      </Stack>
    </Center>
    
  );
});