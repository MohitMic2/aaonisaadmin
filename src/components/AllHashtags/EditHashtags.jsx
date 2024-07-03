import React, { useEffect, useState } from "react";

import {doc, getDoc ,updateDoc, deleteDoc, setDoc} from "firebase/firestore";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { db } from "Config";

const EditHashtags = () => {
    const history = useHistory();
    const [categorie,setCategorie] = useState("");
    const [data,setdata] = useState([]);
  const {id} = useParams();
  

  const getData = async () => {
    try {
        const docRef = doc(db, "hashtags", id); // Reference to the document by ID
        const docSnapshot = await getDoc(docRef); // Fetch the document
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data(); // Get the data of the document
          console.log(userData);
          setdata(userData);
          setCategorie(userData.name);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const oldData = {
            id : categorie,
            name : categorie,
            reels : data.reels
          }

          const newDocRef = doc(db, "hashtags", categorie);
          const docRef = doc(db, 'hashtags', id);

          await setDoc(newDocRef, oldData);
            
            // Step 4: Delete the old document
            await deleteDoc(docRef);


          console.log("Document updated successfully");
          history.goBack();
          alert("This Document Updated Successfully");
        } catch (error) {
          console.error("Error updating document:", error);
        }
      };



      async function deleteDocument() {
        const docRef = doc(db, 'hashtags', id); // Reference to the document by ID
        try {
          await deleteDoc(docRef);
          history.goBack();
          console.log('Document deleted successfully');
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: "300px", margin: "auto", marginTop: "100px",marginBottom: "100px"}}>

            <div style={{height: "20px"}}></div>
            <label>Categorie</label>
            <input value={categorie} onChange={(event) => setCategorie(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "50px"}}></div>
            <button style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center', backgroundColor: "#61DBFB"}} name="submit">Edit</button>


            <div style={{height: "20px"}}></div>
            <button style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center', backgroundColor: "#61DBFB"}} onClick={deleteDocument}>Delete</button>
        </form>
    </div>
  );
};

export default EditHashtags;
