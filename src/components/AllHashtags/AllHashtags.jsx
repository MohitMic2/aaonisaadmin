import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "Config";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AllHashtags = () => {
  const [data, setData] = useState([]);
  const [demo, setDemo] = useState([]);
  const [tag,settag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  

  const getData = async () => {
    const q = query(collection(db, "hashtags"));
    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(usersData);
    setDemo(usersData);
  };

  const onchangeHandler=(event)=>{
    if(event.target.value === ""){
      setData(demo);
    }else{
      const filterdata = demo.filter(item => item.name === event.target.value);
    console.log(filterdata);
    setData(filterdata);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const oldData = {
        id : tag,
        name : tag,
        reels : []
      }

      const newDocRef = doc(db, "hashtags", tag);

        await setDoc(newDocRef,oldData);


      console.log("Document updated successfully");
      window.location.reload();
      alert("This Document Updated Successfully");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
    <div style={{marginTop: "150px"}}>
      <input
        type="text"
        onChange={onchangeHandler}
        placeholder="Search By Hashtag"
      />

      <span style={{marginLeft:'50px'}}></span>

      <input
        type="text"
        onChange={(event) => settag(event.target.value)}
        placeholder="Create Hashtags"
      />

<span style={{marginLeft:'10px'}}></span>
      <button onClick={handleSubmit}>Post</button>
    </div>
    <div>
      <Table marginTop={"50px"}>
        <Thead>
          <Tr>
            <Th>Hashtags</Th>
            <Th>No. of Posts</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentUsers.map((userData, index) => (
            <Tr key={index}>
            <Td>{userData.name}</Td>
            <Td>{userData.reels.length}</Td>
            <Td><Link to={`/edithashtags/${userData.id}`}>Edit</Link></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * usersPerPage >= data.length}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default AllHashtags;
