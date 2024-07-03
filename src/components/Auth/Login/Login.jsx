import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react'
import { signInWithEmailAndPassword  } from "firebase/auth"
import { auth } from 'Config'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const history = useHistory()

  const loginHandler = () => {
    signInWithEmailAndPassword(auth, email, pass).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      toast.success("logedin successfully")
      localStorage.setItem("name", email)
      history.push("/admin/default")
      window.location.reload()
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  
  }
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} marginTop={"50px"}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={(e) => setPass(e.target.value)}/>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              {/* <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text> */}
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'} onClick={loginHandler}>
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
  )
}