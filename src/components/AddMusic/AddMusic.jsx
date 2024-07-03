import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from "@chakra-ui/react";
import { db, storage } from "Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc , updateDoc, doc } from "firebase/firestore";

import { v4 } from "uuid";
import "./AddMusic.css";

const AddMusic = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [mp3, setMp3] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const uploadHandler = async (e) => {
    e.preventDefault();
    if (mp3 === null || thumbnail === null) return;

    // Extract the file names from the FileLists
    const musicFileName = mp3[0].name;
    const thumbnailFileName = thumbnail[0].name;

    // Create references with custom names
    const musicRef = ref(storage, `music/${musicFileName}_${v4()}`);
    const thumbnailRef = ref(
      storage,
      `musicthumbnail/${thumbnailFileName}_${v4()}`
    );

    // Upload music file
    await uploadBytes(musicRef, mp3[0]);
    const musicURL = await getDownloadURL(musicRef);

    // Upload thumbnail
    await uploadBytes(thumbnailRef, thumbnail[0]);
    const thumbnailURL = await getDownloadURL(thumbnailRef);

    // Store metadata in Firestore
    const songsCollection = collection(db, "songs");

    try {
      const docRef = await addDoc(songsCollection, {
        uid: "",
        title: title,
        artist: artist,
        musicURL: musicURL,
        thumbnailURL: thumbnailURL
      });
      await updateDoc(doc(songsCollection, docRef.id), {
        id: docRef.id // Assigning the value of docRef.id to id
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Music and Thumbnail Uploaded");
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
          Upload Music
        </label>
        <input id="file-upload" type="file" accept=".mp3"  onChange={(e) => setMp3(e.target.files)}/>
        {mp3 && mp3[0] && (
            <p>Selected Music File: {mp3[0].name}</p>
          )}
      </div>

      <div className="add__music">
        <label for="thumbnail-upload" className="custom-file-upload">
          <IoCloudUploadOutline style={{fontSize:"20px", marginLeft:"50px"}} />
          Upload Thumbnail
        </label>
        <input  type="file" id="thumbnail-upload" accept="image/*" onChange={(e) => setThumbnail(e.target.files)}/>
        {thumbnail && thumbnail[0] && (
            <p>Selected Thumbnail File: {thumbnail[0].name}</p>
          )}
      </div>
    </div>

    
      <form className="music__form">
        <label>Title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)}/>
        <label>Artist</label>
        <input type="text" onChange={(e) => setArtist(e.target.value)}/>
      </form>
        <Button marginTop="10px" colorScheme='red' onClick={uploadHandler}>Upload</Button>
    
    </>

  );
};

export default AddMusic;
