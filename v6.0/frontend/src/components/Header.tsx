import { Flex, Heading } from '@chakra-ui/react';
import ConnectMetamask from './ConnectMetamask';

export default function Header() {
  return (
    <Flex
      direction="column"
      justifyContent="grid"
      align="center"
      py={10}
    >
      <Heading as="h2">Dutch Auction</Heading>
      <ConnectMetamask />
    </Flex>
  );
}
