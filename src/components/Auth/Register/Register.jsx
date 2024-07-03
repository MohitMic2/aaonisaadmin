import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, realtimeDb } from 'Config';
import toast, { Toaster } from "react-hot-toast"
import { useHistory } from 'react-router-dom/'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const history = useHistory()
  const registerHandler = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', pass);

    
    // Create user in Firebase Authentication
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async(userCredential) => {
        const user = userCredential.user;
        console.log('User:', user);
        await updateProfile(user, {
          displayName:name
        })
        localStorage.setItem("name", name)
        toast.success("User registered Successfully")
        history.push("/admin/default")
        window.location.reload()
        // Save user data to Realtime Database
      

        // You might want to redirect the user or perform additional actions here
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error:', errorCode, errorMessage);
        toast.error("Please Try Again Later")
        // Handle errors gracefully, e.g., display an error message to the user
      });
  };

  return (
    <>
    <Toaster />
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign Up to your account</Heading>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={(e) => setPass(e.target.value)} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              {/* <Checkbox>Remember me</Checkbox> */}
              {/* <Text color={'blue.500'}>Forgot password?</Text> */}
            </Stack>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              onClick={registerHandler}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
          />
      </Flex>
    </Stack>
          </>
  );
}
