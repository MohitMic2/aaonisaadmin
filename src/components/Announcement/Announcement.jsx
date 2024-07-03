import React, { useEffect, useState } from 'react';
import { Box, Button, Textarea, FormControl, FormErrorMessage, Input, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addAnnouncement, getAnnouncements } from 'service/announcementService'; // Adjust path as necessary
import ReactPaginate from 'react-paginate';

const schema = yup.object().shape({
  content: yup.string().max(1000, 'Content must be at most 1000 characters').required('Content is required'),
  image: yup.mixed().test('fileSize', 'The file is too large', (value) => {
    return value && value[0] ? value[0].size <= 2 * 1024 * 1024 : true; // Max 2MB
  })
});


const Announcement = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Page index starts from 0
  const [announcementsPerPage] = useState(4); // Number of announcements per page

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const announcementsData = await getAnnouncements();
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { content, image } = data;
      await addAnnouncement(content, image[0]); // Assuming image[0] is the file
      reset();
      fetchAnnouncements(); // Refresh announcements after adding new one
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  // Pagination logic
  const pageCount = Math.ceil(announcements?.length / announcementsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Display announcements for the current page
  const indexOfLastAnnouncement = (currentPage + 1) * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  return (
    <Box marginTop='100px'>
      <Box mb={8}>
        <Heading size="md" mb={4}>Add New Announcement</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.content} mb={4}>
            <Textarea 
              placeholder="Content"
              maxLength={1000}
              {...register('content')}
            />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.image} mb={4}>
            <Input 
              type="file" 
              id="imageInput" 
              accept="image/*" 
              {...register('image')}
            />
            <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit">Submit</Button>
        </form>
      </Box>

      <Box>
        <Heading size="md" mb={4}>All Announcements</Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
          {currentAnnouncements.map((announcement) => (
            <Box key={announcement.id} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="sm">{announcement.title}</Heading>
              {announcement?.image && announcement?.image !== " " &&(
                <img src={announcement.image} alt="Announcement" style={{ maxWidth: '100%', marginTop: '8px' }} />
              )}
              <Text mt={2}>{announcement?.created_at?.toDate()?.toLocaleDateString()}</Text> {/* Convert Firestore timestamp to Date */}
            </Box>
          ))}
        </Grid>
        
        {/* Pagination controls */}
        <Box sx={{
  '.pagination': {
    listStyle: 'none',
    padding: 0,
    marginTop: "10px",
    display: 'flex',
    justifyContent:"center"
  },
  '.pagination li': {
    marginRight: '10px',
  },
  '.pagination li a': {
    padding: '5px 10px',
    textDecoration: 'none',
    color: '#337ab7',
  },
  '.pagination li a:hover': {
    color: '#23527c',
  },
  '.active a': {
    color: '#fff',
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
}}>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousClassName={'pagination-previous'}
            nextClassName={'pagination-next'}
            breakClassName={'pagination-break'}
            pageClassName={'pagination-page'}
            pageLinkClassName={'pagination-page-link'}
            previousLinkClassName={'pagination-previous-link'}
            nextLinkClassName={'pagination-next-link'}
            breakLinkClassName={'pagination-break-link'}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Announcement;
