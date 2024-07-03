import React from 'react'
import {
    Flex,
    Table,
    Checkbox,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Menu,
  } from "@chakra-ui/react";
import Card from 'components/card/Card';

const Music = () => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card
    direction='column'
    w='100%'
    px='0px'
    overflowX={{ sm: "scroll", lg: "hidden" }}>
    <Flex px='25px' justify='space-between' align='center'>
      <Text
        color={textColor}
        fontSize='22px'
        fontWeight='700'
        lineHeight='100%'>
       Music Table
      </Text>
      <Menu />
    </Flex>
    <Table  variant='simple' color='gray.500' mb='24px'>
      <Thead>
        
      </Thead>
      <Tbody >
       
      </Tbody>
    </Table>
  </Card>
  )
}

export default Music