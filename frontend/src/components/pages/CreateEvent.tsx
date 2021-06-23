import { memo, VFC } from "react";
import { FormControl, FormLabel, Input, Center } from "@chakra-ui/react"

export const CreateEvent: VFC = memo(() => {
  return (
    <Center mt="20px" mx={{base: "5px", md: "30px", lg: "300px"}}>
      <FormControl>
        <FormLabel fontSize="xl">イベント名</FormLabel>
        <Input />
      </FormControl>
    </Center>
    
  );
});