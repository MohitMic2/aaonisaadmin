import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "Config";

const UserReport = () => {
  const [report, setReport] = useState([]);


  const clickHandler=async(uid)=>{
    const reportRef = doc(db, "userReports", uid);
    await deleteDoc(reportRef);  
    window.location.reload();
  }


  useEffect(() => {
    // Function to fetch music data from Firestore
    const fetchReport = async () => {
      try {
        const reportsCollection = collection(db, "userReports");
        const snapshot = await getDocs(reportsCollection);

        const report = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReport(report);
        console.log(report)
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchReport();
  }, []);
  console.log(report);
  return (
    <Table marginTop="150px">
      <Thead>
        <Tr>
        <Td>User Id</Td>
          <Td>Contact Number</Td>
          <Td>Email</Td>
          <Td>Plan</Td>
          <Td>Report</Td>
          <Td>Username</Td>
          <Td>Profile Pic</Td>
          <Td>Delete</Td>
        </Tr>
      </Thead>
      <Tbody>
        {report.reverse().map((data) => (
          <Tr>
            <Td>{data.uid}</Td>
            <Td>{data.contactNumber}</Td>
            <Td>{data.email}</Td>
            <Td>{data.plan}</Td>
            <Td>{data.report}</Td>
            <Td>{data.username}</Td>
            <Td>{data.profilePic && (
                <img
                  src={data.profilePic}
                  alt={`Profile Pic for ${data.username}`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              )}</Td>
              <Td onClick={()=>clickHandler(data.reportId)}>Delete</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UserReport;
