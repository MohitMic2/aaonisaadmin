import React from 'react';
import { Box, Button, Textarea, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addQuizQuestion } from 'service/quizservice';


const schema = yup.object().shape({
  question: yup.string().max(500, 'Question must be at most 500 characters').required('Question is required'),
});

const Quiz = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
        await addQuizQuestion(data.question);
 alert('Quiz question data:', data);
      reset();
    } catch (error) {
      console.error('Error posting quiz question:', error);
    }
  };

  return (
    <Box marginTop="100px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.question} mb={4}>
          <Textarea 
            placeholder="Enter your quiz question here"
            maxLength={500}
            {...register('question')}
          />
          <FormErrorMessage>{errors.question?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default Quiz;
