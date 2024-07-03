import React, { useEffect, useState } from 'react'
import "./SalesmenScreen.css"
import { Table, Td, Thead, Tr } from '@chakra-ui/react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'Config';

const SalesmenScreen = () => {

  const [users, setUsers] = useState([]);
  const [free, setFree] = useState([]);
  const [paid, setPaid] = useState([]);

  const getData = async () => {
    try {
      const salesmenData = localStorage.getItem("salesmendata");
      const data = JSON.parse(salesmenData);
      console.log(data);


      const postsCollection1 = collection(db, 'users');
      const userPostsQuery1 = query(postsCollection1, where('referId', '==', data.salemenid),where('plan', '==', "free"));
      const querySnapshot1 = await getDocs(userPostsQuery1);
      const usersData1 = querySnapshot1.docs.map(doc => doc.data());
      console.log(usersData1);
      setFree(usersData1);



      const postsCollection2 = collection(db, 'users');
      const userPostsQuery2 = query(postsCollection2, where('referId', '==', data.salemenid),where('plan', '==', "paid"));
      const querySnapshot2 = await getDocs(userPostsQuery2);
      const usersData2 = querySnapshot2.docs.map(doc => doc.data());
      console.log(usersData2);
      setPaid(usersData2);



      const postsCollection = collection(db, 'users');
      const userPostsQuery = query(postsCollection, where('referId', '==', data.salemenid));
      const querySnapshot = await getDocs(userPostsQuery);
      const usersData = querySnapshot.docs.map(doc => doc.data());
      console.log(usersData);
      setUsers(usersData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Empty dependency array to ensure useEffect runs only once

    return (
      <>
      <div className="salesmen-screen">
        <div className="screen-tabs">
          <p>Total Paid Users</p>
          <p>{paid.length}</p>
        </div>

        <div className="screen-tabs">
          <p>Total Free Users</p>
          <p>{free.length}</p>
        </div>
      </div>

      <div className="screen-table">
        <h2 style={{fontWeight:"600"}}>All Users by this Id</h2>
      <Table>
        <Thead>
        <Tr>
            <Td>User Name</Td>
            <Td>Phone Number</Td>
            <Td>Plan</Td>
          </Tr>
          {
            users.map((data)=>{
              return <Tr>
              <Td>{data.username}</Td>
              <Td>{data.contactNumber}</Td>
              <Td>{data.plan}</Td>
            </Tr>
            })
          }
        </Thead>
      </Table>
      </div>
      </>
    )
}

export default SalesmenScreen