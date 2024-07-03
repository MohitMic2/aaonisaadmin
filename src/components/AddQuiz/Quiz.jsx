import React from 'react';
import { Box, Button, FormControl, FormErrorMessage, Input, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addQuizQuestion } from 'service/quizservice';

const schema = yup.object().shape({
  question: yup.string().required('Question is required').max(1000, 'Question must be at most 1000 characters'),
  image: yup.mixed()
});

const Quiz = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const { question, image } = data;
      await addQuizQuestion(question, image[0]);
      reset(); // Reset the entire form
    } catch (error) {
      console.error('Error adding quiz question:', error);
    }
  };

  return (
    <Box marginTop='100px'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.question} mb={4}>
          <Textarea 
            placeholder="Question"
            maxLength={1000}
            {...register('question')}
          />
          <FormErrorMessage>{errors.question?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.image} mb={4}>
          <Input 
            type="file" 
            accept="image/*" 
            {...register('image')}
          />
          <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default Quiz;
