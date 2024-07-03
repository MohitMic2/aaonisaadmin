import React, { useEffect, useState } from "react";

import {doc, getDoc ,updateDoc, deleteDoc} from "firebase/firestore";
import { JSdb } from "JSConfig";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditJDCategory = () => {
    const history = useHistory();
    const [categorie,setCategorie] = useState("");
    const [subCategorie, setSubCategorie] = useState('');
  const {id} = useParams();
  

  const getData = async () => {
    try {
        const docRef = doc(JSdb, "dealscategories", id); // Reference to the document by ID
        const docSnapshot = await getDoc(docRef); // Fetch the document
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data(); // Get the data of the document
          console.log(userData);
          setCategorie(userData.categorie);
          setSubCategorie(userData.subCategorie);
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
          const docRef = doc(JSdb, "dealscategories", id);
          await updateDoc(docRef, {
            categorie: categorie,
            subCategorie : subCategorie
          });
          console.log("Document updated successfully");
          history.goBack();
          alert("This Document Updated Successfully");
        } catch (error) {
          console.error("Error updating document:", error);
        }
      };



      async function deleteDocument() {
        const docRef = doc(JSdb, 'dealscategories', id); // Reference to the document by ID
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


            <div style={{height: "20px"}}></div>
            <label>Sub Category</label>
            <textarea  value={subCategorie} onChange={(event) => setSubCategorie(event.target.value)} style={{border: '1px solid #ccc',textAlign: 'center'}}></textarea>


            <div style={{height: "50px"}}></div>
            <button style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center', backgroundColor: "#61DBFB"}} name="submit">Edit</button>


            <div style={{height: "20px"}}></div>
            <button style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center', backgroundColor: "#61DBFB"}} onClick={deleteDocument}>Delete</button>
        </form>
    </div>
  );
};

export default EditJDCategory;
