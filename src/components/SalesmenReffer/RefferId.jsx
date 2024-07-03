import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Button, Table, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'Config';
import "./RefferId.css";

const RefferId = () => {
  const [id, setId] = useState("");
  const [salesmen, setSalesmen] = useState([]);
  const [users, setUsers] = useState([]);
  const [salesCountBySalesman, setSalesCountBySalesman] = useState({}); // State to store sales count

  const history = useHistory();

  const clickHandler=async()=>{
    const postsCollection = collection(db, 'salesmen');
      const userPostsQuery = query(postsCollection, where('salemenid', '==', id));
      const querySnapshot = await getDocs(userPostsQuery);
      const usersData = querySnapshot.docs.map(doc => doc.data());
      console.log(usersData);
      setSalesmen(usersData);
  }

  const searchSalesmen = async () => {
    const salesmenCollection = collection(db, "salesmen");
    const q = query(salesmenCollection);
    const querySnapshot = await getDocs(q);
    const salesmenData = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setSalesmen(salesmenData);
  };

  const getUsers = async () => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection);
    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setUsers(usersData);
  };

  useEffect(() => {
    searchSalesmen();
    getUsers();
  }, []);

  // Move the calculation of combinedData inside useEffect to ensure it's updated when users or salesmen change
  useEffect(() => {
    const combinedData = users.map(user => ({
      ...user,
      salesman: salesmen.find(salesman => salesman.id === user.referId),
    }));

    // Calculate sales count by salesman
    const countBySalesman = combinedData.reduce((acc, user) => {
      const salesmanId = user.referId;
      acc[salesmanId] = (acc[salesmanId] || 0) + 1;
      return acc;
    }, {});

    setSalesCountBySalesman(countBySalesman);
    console.log(countBySalesman)
  }, [users, salesmen]);

  const salesmenScreenHandler = (data) => {
    localStorage.setItem("salesmendata", JSON.stringify(data))
    history.push("/admin/salesmen-screen");
  };

  return (
    <div className="reffer-id">
      <div className="reffer-input">
        <input type="text" onChange={(e) => setId(e.target.value)} />
        <Button onClick={clickHandler}>Search</Button>
      </div>

      <Table marginTop={"50px"} textAlign={"center"}>
        <Thead>
          <Tr>
            <Td>RefferCode</Td>
            <Td>Name</Td>
            <Td>Phone Number</Td>
            <Td>Total Referred</Td>
            <Td>Action</Td>
          </Tr>
        </Thead>
        <Tbody style={{textAlign:"center"}}>
          {salesmen.map((value, index) => (
            <Tr key={index} onClick={() => salesmenScreenHandler(value)}>
              <Td>{value.salemenid}</Td>
              <Td>{value.name}</Td>
              <Td>{value.phonenumber}</Td>
              <Td>{salesCountBySalesman[value.salemenid]}</Td>
              <Td></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default RefferId;
