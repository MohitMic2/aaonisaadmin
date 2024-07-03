import React, { useEffect, useState } from "react";
import {Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { collection, getDocs, query,where,doc,updateDoc } from "firebase/firestore";
import { JSdb } from "JSConfig";

const AllOffers = () => {
  const [data, setData] = useState([]);
  const [demo, setDemo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  

  const getOfferData = async () => {
    try {
      const offer = collection(JSdb, "offer-listing");
      const q = query(
        offer,
        where("approved","==",false)
      );
      const querySnapshot = await getDocs(q);
  
      const OfferInRange = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          const dateString = data.date; // Adjust this line according to your actual date field name
          const date = new Date(dateString);
          return { id: doc.id, ...data, date };
        })
        .filter((record) => {
          const twentyFourHoursAgo = new Date();
          twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
          return record.date > twentyFourHoursAgo;
        });
      
      const res = OfferInRange.map(data=>data.images);
      setDemo(res);
      setData(OfferInRange);
      console.log(res);
      console.log(OfferInRange);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOfferData();
  }, []);


  const clickHandler=async(id)=>{
    try {
      const docRef = doc(JSdb, "offer-listing", id);
      await updateDoc(docRef, {
        approved : true
      });
      console.log("Document updated successfully");
      alert("This Document Updated Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
    <div>
      <Table marginTop={"50px"}>
        <Thead>
          <Tr>
            <Th>Business Name</Th>
            <Th>State</Th>
            <Th>Categorie</Th>
            <Th>Images</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentUsers.map((userData, index) => (
            <Tr key={index}>
              <Td>{userData.businessName}</Td>
              <Td>{userData.state}</Td>
              <Td>{userData.categorie}</Td>
              <Td>{
                demo[index].map((data)=>(
                  <img
                  src={data}
                  alt={`Profile Pic for ${data}`}
                  style={{ width: "50px", height: "50px", borderRadius:"50%" }}
                />
              ))
                }</Td>
              <Td onClick={()=>clickHandler(userData.id)}>Approve</Td>
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

export default AllOffers;
