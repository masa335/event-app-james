import { memo, VFC } from "react";
import { Heading, Box, Image, Text } from "@chakra-ui/react"

export const User: VFC = memo(() => {
  return (
    <>
    <Box mx="40px" my="20px">
      <Box borderBottom="6px" borderStyle="double" borderColor="blackAlpha.400">
        <Image
            borderRadius="full"
            boxSize="160px"
            src="https://source.unsplash.com/random"
            alt="アオキマサノリ"
            m="auto"
          />
        <Text fontSize="2xl" textAlign="center" color="gray.600">アオキ マサノリ</Text>
        <Text fontSize="lg" textAlign="center" color="gray.600">ギターとベースができます。よろしくです。</Text>
      </Box>
      <Heading as="h2" size="lg" color="gray.600">イベント</Heading>
      <p>★TODO:主催、参加イベントをタブで分けたい。</p>
    </Box>
    
    
    </>
  );
});