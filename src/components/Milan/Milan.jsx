import React, { useState } from 'react';
import { Button, Input, Textarea } from '@chakra-ui/react';

import "./Milan.css"
import { addDoc, collection } from 'firebase/firestore';
import { milanDb } from 'MilanConfig';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { milanStorage } from 'MilanConfig';

const Milan = () => {
  const [state, setState] = useState("")
  const [district, setDistrict] = useState("")
  const [qualfication, setQualification] = useState("")
  const [asfeild, setAs] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [coupleName, setCoupleName] = useState("")
  const [coupleDetails, setCoupleDetails] = useState("")
  const [add, setAdd] = useState(null)
  const [help, setHelp] = useState("")
  const [privacy, setPrivacy] = useState("")

  const createCategories = async () => {
    try {
      const stateCollection = collection(milanDb, "state")
      const docRef = await addDoc(stateCollection, {
        state:state,
        district:district
      })
      console.log(docRef.id, "State Entered")
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };

  const createQualification = async() => {
    try{
      const qualification = collection(milanDb, "qualification")
      const docRef = await addDoc(qualification, {
        qualification:qualfication
      })
      console.log(docRef.id, "State Entered")
      window.location.reload()
    }
    catch(err){
      console.error(err)
    }
  }

  const createAs = async() => {
    console.log("hey")
    try{
      const as = collection(milanDb, "as")
      const docRef = await addDoc(as, {
        as:asfeild
      })
      console.log(docRef.id, "As Entered")
      window.location.reload()
    }
    catch(err){
      console.error(err)
    }
  }

  const addTestimonial = async() => {
    
   // Upload thumbnail
   const thumbnailFileName = thumbnail[0].name;
   const thumbnailRef = ref(
    milanStorage,
    `testimonial-images/${thumbnailFileName}`
  );
   await uploadBytes(thumbnailRef, thumbnail[0]);
   const thumbnailURL = await getDownloadURL(thumbnailRef);
    try{
      const testimonial = collection(milanDb, "testimonial")
      const docRef = await addDoc(testimonial, {
        couplename:coupleName,
        coupledetails:coupleDetails,
        image:thumbnailURL
      })
      window.location.reload()
    }
    catch(err){
      console.error(err)
    }
  }
  
  const uploadAdd = async() => {
    const thumbnailFileName = add[0].name;
    const thumbnailRef = ref(
     milanStorage,
     `add-image/${thumbnailFileName}`
   );
    await uploadBytes(thumbnailRef, add[0]);
    const thumbnailURL = await getDownloadURL(thumbnailRef);
    try{
      const testimonial = collection(milanDb, "add")
      const docRef = await addDoc(testimonial, {
       add:thumbnailURL
      })
      window.location.reload()
    }
    catch(err){
      console.error(err)
    }
  }

  const addHelp = async () => {
    try {
      const helper = collection(milanDb, "help")
      const docRef = await addDoc(helper, {
       helptext:help
      })
     
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };

  const addPrivacy = async() => {
    const privacy = collection(milanDb, "privacy")
    const docRef = await addDoc(privacy, {
      privacy:privacy
    })
  }
  
  return (
    <>
    <div className="just-search">
      <div className="add-category">
        <h1>Add State</h1>

        <div className="category-input">
          <input
            type="text"
            placeholder="Enter State Name"
            onChange={(e) => setState(e.target.value)}
          />

          <Textarea
            placeholder="Enter District Name, EG:- Jodhpur, Rajasthan"
            onChange={(e) => setDistrict(e.target.value)}
          />
          
        </div>
        <Button
          style={{ border: '1px solid #000', marginLeft: '80px', marginTop: '20px' }}
          onClick={createCategories}
        >
          Create Category
        </Button>
      </div>
    </div>


    <div className="just-search">
      <div className="add-category">
        <h1>Add Qualification</h1>

        <div className="category-input">
          <Textarea
            placeholder="Qualification"
            onChange={(e) => setQualification(e.target.value)}
          />
          
        </div>
        <Button
          style={{ border: '1px solid #000', marginLeft: '80px', marginTop: '20px' }}
          onClick={createQualification}
        >
          Add Qualification
        </Button>
      </div>
    </div>

    <div className="just-search">
      <div className="add-category">
        <h1>Add AS Option</h1>

        <div className="category-input">
          <Textarea
            placeholder="MBA,Analyst,"
            onChange={(e) => setAs(e.target.value)}
          />
          
        </div>
        <Button
          style={{ border: '1px solid #000', marginLeft: '80px', marginTop: '20px' }}
          onClick={createAs}
        >
          Add AS Option
        </Button>
      </div>
    </div> 

    <div className="testimonial-section">
      <h1>Add Testimonial</h1>
      <div className="add__music">
        <label for="thumbnail-upload" className="custom-file-upload">
          <IoCloudUploadOutline style={{fontSize:"20px", marginLeft:"50px"}} />
          Upload Image
        </label>
        <input  type="file" id="thumbnail-upload" accept="image/*" onChange={(e) => setThumbnail(e.target.files)}/>
        {thumbnail && thumbnail[0] && (
            <p>Selected Thumbnail File: {thumbnail[0].name}</p>
          )}
      </div>
      <div className="add-data-testimonial">
      <Textarea
            placeholder="Name of the couple"
            onChange={(e) => setCoupleName(e.target.value)}
            marginTop={"20px"}
            style={{border:`1px solid #000`}}

          />
          <Textarea
            placeholder="Testimonial Data, EG:- So we basically met on this milan. We started talkingand decided to meet one day. And on first date me introduced his sis and there husband's. We have so many…"
            onChange={(e) => setCoupleDetails(e.target.value)}
            marginTop={"20px"}
            style={{border:`1px solid #000`}}
          />
      </div>
      <Button marginTop={"10px"} onClick={addTestimonial}>Submit</Button>
    </div> 

    <div className="testimonial-section">
      <h1>Upload Add</h1>
      <div className="add__music">
        <label for="add" className="custom-file-upload">
          <IoCloudUploadOutline style={{fontSize:"20px", marginLeft:"50px"}} />
          Upload Add
        </label>
        <input  type="file" id="add" accept="image/*" onChange={(e) => setAdd(e.target.files)}/>
        {add && add[0] && (
            <p>Selected Thumbnail File: {add[0].name}</p>
          )}
      </div>
      
      <Button marginTop={"10px"} onClick={uploadAdd}>Submit</Button>
    </div> 

    <div className="just-search">
      <div className="add-category">
        <h1>Add Help Text</h1>

        <div className="category-input">
          <Textarea
            placeholder="help text"
            onChange={(e) => setHelp(e.target.value)}
          />
          
        </div>
        <Button
          style={{ border: '1px solid #000', marginLeft: '80px', marginTop: '20px' }}
          onClick={addHelp}
        >
          Submit
        </Button>
      </div>
    </div> 

    <div className="privacy-policy">
      <h1 style={{fontWeight:"600", fontSize:"22px"}}>Add Privacy Policy</h1>
      <Textarea onChange={(e) => setPrivacy(e.target.value)} placeholder='Enter Privacy Policy'/>
      <Button onClick={addPrivacy}>Submit</Button>
    </div>
    </>
  )
}

export default Milan