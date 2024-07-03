import React, { useEffect, useState } from "react";

import {doc, getDoc ,updateDoc, deleteDoc} from "firebase/firestore";
import { JSdb } from "JSConfig";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditListing = () => {
    const history = useHistory();
    const [username,setUsername] = useState("");
    const [businessname,setBusinessname] = useState("");
    const [mobilenumber,setMobilenumber] = useState("");
    const [email,setemail] = useState("");
    const [street,setStreet] = useState("");
    const [building,setBuilding] = useState("");
    const [landmark,setlandmark] = useState("");
    const [area,setArea] = useState("");
    const [district,setDistrict] = useState("");
    const [state,setState] = useState("");
    const [pincode,setPincode] = useState('');
    const [open,setOpen] = useState("");
    const [close,setClose] = useState("");
    const [categorie,setCategorie] = useState("");
    const [latitude,setLatitude] = useState(0);
    const [longitude,setLongitude] = useState(0);
  const {id} = useParams();
  

  const getData = async () => {
    try {
        const docRef = doc(JSdb, "buissness-listing", id); // Reference to the document by ID
        const docSnapshot = await getDoc(docRef); // Fetch the document
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data(); // Get the data of the document
          console.log(userData);
          setArea(userData.area);
          setUsername(userData.username);
          setBusinessname(userData.businessName);
          setMobilenumber(userData.mobilenumber);
          setemail(userData.email);
          setStreet(userData.street);
          setBuilding(userData.building);
          setlandmark(userData.landmark);
          setDistrict(userData.district);
          setState(userData.state);
          setPincode(userData.pincode);
          setOpen(userData.opensat);
          setClose(userData.closesat);
          setCategorie(userData.categorie);
          setLatitude(userData.latitude);
          setLongitude(userData.longitude);
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
          const docRef = doc(JSdb, "buissness-listing", id);
          await updateDoc(docRef, {
            username: username,
            businessName: businessname,
            mobilenumber: mobilenumber,
            email: email,
            street: street,
            building: building,
            landmark: landmark,
            area: area,
            district: district,
            state: state,
            pincode: pincode,
            opensat: open,
            closesat: close,
            categorie: categorie,
            latitude : latitude,
            longitude : longitude
          });
          console.log("Document updated successfully");
          history.goBack();
          alert("This Document Updated Successfully");
        } catch (error) {
          console.error("Error updating document:", error);
        }
      };



      async function deleteDocument() {
        const docRef = doc(JSdb, 'buissness-listing', id); // Reference to the document by ID
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
            <label>Name</label>
            <input value={username} onChange={(event) => setUsername(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Business Name</label>
            <input value={businessname} onChange={(event) => setBusinessname(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Mobile Number</label>
            <input value={mobilenumber} onChange={(event) => setMobilenumber(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Email</label>
            <input value={email} onChange={(event) => setemail(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Street</label>
            <input value={street} onChange={(event) => setStreet(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Building</label>
            <input value={building} onChange={(event) => setBuilding(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Land Mark</label>
            <input value={landmark} onChange={(event) => setlandmark(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Area</label>
            <input value={area} onChange={(event) => setArea(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>District</label>
            <input value={district} onChange={(event) => setDistrict(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>State</label>
            <input value={state} onChange={(event) => setState(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Pincode</label>
            <input value={pincode} onChange={(event) => setPincode(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Open At</label>
            <input value={open} onChange={(event) => setOpen(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Close At</label>
            <input value={close} onChange={(event) => setClose(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Categorie</label>
            <input value={categorie} onChange={(event) => setCategorie(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Latitude</label>
            <input value={latitude} onChange={(event) => setLatitude(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>


            <div style={{height: "20px"}}></div>
            <label>Longitude</label>
            <input value={longitude} onChange={(event) => setLongitude(event.target.value)} style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center'}}></input>

            <div style={{height: "50px"}}></div>
            <button style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center', backgroundColor: "#61DBFB"}} name="submit">Edit</button>


            <div style={{height: "20px"}}></div>
            <button style={{border: '1px solid #ccc',borderRadius: "50px",textAlign: 'center', backgroundColor: "#61DBFB"}} onClick={deleteDocument}>Delete</button>
        </form>
    </div>
  );
};

export default EditListing;
