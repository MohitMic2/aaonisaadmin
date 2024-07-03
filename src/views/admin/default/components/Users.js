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
import { db } from "../.././../../Config";
import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from 'react';

const Users = () => {
    const [data, setData] = useState([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const getData = async () => {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setData(usersData);
      };
    
      useEffect(() => {
        getData();
      }, []);
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
       Users
      </Text>
      <Menu />
    </Flex>
    <Table  variant='simple' color='gray.500' mb='24px'>
      <Thead>
      <Tr>
            <Td>Username</Td>
            <Td>Password</Td>
            <Td>Number</Td>
            <Td>Email</Td>
            <Td>Followers</Td>
            <Td>Following</Td>
            <Td>Profile Pic</Td>
            <Td>Plan</Td>
          </Tr>
      </Thead>
      <Tbody >
       {
        data.map((userData, index) => (
            <Tr key={index}>
              <Td>{userData.username}</Td>
              <Td>{userData.password}</Td>
              <Td>{userData.number}</Td>
              <Td>{userData.email}</Td>
              <Td>{userData?.followers?.length}</Td>
              <Td>{userData?.following?.length}</Td>
              <Td>
                {userData.profilePic && (
                  <img
                    src={userData.profilePic}
                    alt={`Profile Pic for ${userData.username}`}
                    style={{ width: "50px", height: "50px", borderRadius:"50%" }}
                  />
                )}
              </Td>
              <Td>{userData.plan}</Td>
            </Tr>
        ))
       }
      </Tbody>
    </Table>
  </Card>
  )
}

export default Users