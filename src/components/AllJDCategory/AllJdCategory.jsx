import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { collection, getDocs, query } from "firebase/firestore";
import { JSdb } from "JSConfig";

const AllJDCategory = () => {
  const [data, setData] = useState([]);
  const [demo, setDemo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  

  const getData = async () => {
    const q = query(collection(JSdb, "dealscategories"));
    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(usersData);
    setDemo(usersData);
  };

  const onchangeHandler=(event)=>{
    if(event.target.value === ""){
      setData(demo);
    }else{
      const filterdata = demo.filter(item => item.categorie === event.target.value);
    console.log(filterdata);
    setData(filterdata);
    }
  }

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
        placeholder="Search By Category"
      />
    </div>
    <div>
      <Table marginTop={"50px"}>
        <Thead>
          <Tr>
            <Th>Categorie</Th>
            <Th>Subcategorie</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentUsers.map((userData, index) => (
            <Tr key={index}>
            <Td>{userData.categorie}</Td>
            <Td>{userData.subCategorie}</Td>
            <Td><Link to={`/editjdcategory/${userData.id}`}>Edit</Link></Td>
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

export default AllJDCategory;
