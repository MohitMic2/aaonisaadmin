import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";

import { db } from "../../Config";
import { collection, getDocs, query } from "firebase/firestore";

const AllCategory = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const getData = async () => {
    const q = query(collection(db, "category"));
    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map((doc) => doc.data());
    setData(usersData);
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
      <Table marginTop={"100px"}>
        <Thead>
          <Tr>
            <Td>category</Td>
            <Td>category Name</Td>
          </Tr>
        </Thead>
        <Tbody>
          {currentUsers.map((userData, index) => (
            <Tr key={index}>
              <Td>
                {userData.categoryUrl && (
                  <img
                    src={userData.categoryUrl}
                    alt={`Profile Pic for ${userData.categoryUrl}`}
                    style={{ width: "50px", height: "50px", borderRadius:"50%" }}
                  />
                )}
              </Td>
              <Td>{userData.name}</Td>
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
  );
};

export default AllCategory;
