import { memo, VFC } from "react";
import { Box, Icon, Image, Stack, Text, HStack } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md"

type Props = {
  id: number | undefined;
  imageUrl: string;
  eventName: string;
  prefecture: string;
  onClick: (id: number | undefined) => void;
};

export const EventCard: VFC<Props> = memo(props => {
  const { id, imageUrl, eventName, prefecture, onClick } = props;

  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Image
          borderRadius="full"
          boxSize="160px"
          src={imageUrl}
          alt={eventName}
          m="auto"
        />
        <Text fontSize="sm" fontWeight="bold">
          {eventName}
        </Text>
        <Box>
        <HStack textAlign="center">
          <Icon as={MdLocationOn} />
          <Text fontSize="sm" color="gray">
            {prefecture}
          </Text>
        </HStack>
        </Box>
      </Stack>
    </Box>
  );
});