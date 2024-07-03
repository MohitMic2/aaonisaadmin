import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from "@chakra-ui/react";
import { db, storage } from "Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
import "./AddMusic.css";
import { reload } from "firebase/auth";

const AddTheme = () => {
  const [title, setTitle] = useState("");
  const [mp3, setMp3] = useState(null);

  const uploadHandler = async (e) => {
    e.preventDefault();
    if (mp3 === null) return;

    // Extract the file names from the FileLists
    const musicFileName = mp3[0].name;

    // Create references with custom names
    const musicRef = ref(storage, `theme/${musicFileName}_${v4()}`);

    // Upload music file
    await uploadBytes(musicRef, mp3[0]);
    const musicURL = await getDownloadURL(musicRef);

    // Store metadata in Firestore
    const songsCollection = collection(db, "themes");

    try {
      const docRef = await addDoc(songsCollection, {
        name : title,
        themeUrl : musicURL,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Theme Uploaded");
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  console.log(mp3)
  return (
    <>
    <div className="music">
      <div className="add__music">
        <label for="file-upload" className="custom-file-upload">
          <IoCloudUploadOutline style={{fontSize:"20px", marginLeft:"30px"}}/>
          Upload Theme
        </label>
        <input id="file-upload" type="file" accept=".JPG,.PNG,.JPEG"  onChange={(e) => setMp3(e.target.files)}/>
        {mp3 && mp3[0] && (
            <p>Selected Theme File: {mp3[0].name}</p>
          )}
      </div>
    </div>

    
      <form className="music__form">
        <label>Theme Name</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)}/>
      </form>
        <Button marginTop="10px" colorScheme='red' onClick={uploadHandler}>Upload</Button>
    
    </>

  );
};

export default AddTheme;
