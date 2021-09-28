import { memo, VFC } from "react";
import { Box, Icon, Image, Stack, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md"

type Props = {
  id: number | undefined;
  userId: number | undefined;
  imageUrl: string;
  eventName: string;
  prefecture: string;
  maxParticipants: number | undefined;
  participantsCount: number | undefined;
  onClick: (id: number | undefined, userId: number | undefined) => void;
};

export const EventCard: VFC<Props> = memo(props => {
  const { id, userId, imageUrl, eventName, prefecture, maxParticipants, participantsCount, onClick } = props;

  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id, userId)}
    >
      <VStack>
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
        <Flex alignItems="center">
          <Icon as={MdLocationOn} />
          <Text fontSize="sm" color="gray">
            {prefecture}
          </Text>
          <Text ml={5} fontSize="sm">{`${participantsCount}/${maxParticipants}人`}</Text>
        </Flex>
        </Box>
      </VStack>
    </Box>
  );
});