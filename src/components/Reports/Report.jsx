import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "Config";

const Report = () => {
  const [report, setReport] = useState([]);


  const clickHandler=async(uid)=>{
    const reportRef = doc(db, "videoReports", uid);
    await deleteDoc(reportRef);  
    window.location.reload();
  }

  const handleClick = (e) => {
    window.open(e, '_blank');
  };

  useEffect(() => {
    // Function to fetch music data from Firestore
    const fetchReport = async () => {
      try {
        const reportsCollection = collection(db, "videoReports");
        const snapshot = await getDocs(reportsCollection);

        const report = snapshot.docs.map((doc) => ({
          reportId: doc.id,
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
          <Td>Caption</Td>
          <Td>Likes</Td>
          <Td>Dislikes</Td>
          <Td>Profile</Td>
          <Td>Report</Td>
          <Td>Username</Td>
          <Td>Thumbnail</Td>
          <Td>Delete</Td>
          <Td>View</Td>
        </Tr>
      </Thead>
      <Tbody>
        {report.reverse().map((data) => (
          <Tr>
            <Td>{data.caption}</Td>
            <Td>{data.likes.length}</Td>
            <Td>{data.dislike.length}</Td>
            <Td>
              {data.profile && (
                <img
                  src={data.profile}
                  alt={`Profile Pic for ${data.username}`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              )}
            </Td>
            <Td>{data.report}</Td>
            <Td>{data.username}</Td>
            <Td>{data.thumbnail && (
                <img
                  src={data.thumbnail}
                  alt={`Thumbnail Pic for ${data.username}`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              )}</Td>
              <Td onClick={()=>clickHandler(data.reportId)}>Delete</Td>
              <Td onClick={()=>handleClick(data.videoUrl)}>View</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Report;
