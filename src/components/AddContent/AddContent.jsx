import React, { useEffect,useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from "@chakra-ui/react";
import { db, storage } from "Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { getDocs, query } from "firebase/firestore";
import { v4 } from "uuid";
import "../AddMusic/AddMusic.css";
import { reload } from "firebase/auth";

const AddContent = () => {
  const [title, setTitle] = useState("");
  const [mp3, setMp3] = useState(null);
  const [thumbnail, setthumbnail] = useState(null);
  const [data,setData] = useState([]);
  const [category,setCategory] = useState("select");

  const uploadHandler = async (e) => {
    e.preventDefault();
    if (mp3 === null) return;
    if(thumbnail===null) return;
    if(category==="select") return;
    if(title==="")  return;

    // Extract the file names from the FileLists
    const musicFileName = mp3[0].name;
    const thumbnailName = thumbnail[0].name;

    // Create references with custom names
    const musicRef = ref(storage, `content/${musicFileName}_${v4()}`);
    const thumbnailRef = ref(storage, `content/${thumbnailName}_${v4()}`);

    // Upload music file
    await uploadBytes(musicRef, mp3[0]);
    await uploadBytes(thumbnailRef,thumbnail[0]);

    const musicURL = await getDownloadURL(musicRef);
    const thumbnailUrl = await getDownloadURL(thumbnailRef);

    // Store metadata in Firestore
    const songsCollection = collection(db, "content");

    try {
      const docRef = await addDoc(songsCollection, {
        name : title,
        category: category,
        contentUrl : musicURL,
        thumbnailUrl: thumbnailUrl
      });
      console.log("Document written with ID: ", docRef.id);
      alert("content Uploaded");
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getData = async () => {
    const q = query(collection(db, "category"));
    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map((doc) => doc.data());
    setData(usersData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <div className="music">
      <div className="add__music">
        <label for="file-upload" className="custom-file-upload">
          <IoCloudUploadOutline style={{fontSize:"20px", marginLeft:"30px"}}/>
          Upload Content
        </label>
        <input id="file-upload" type="file" accept=".MOV,.MKV,.MP4"  onChange={(e) => setMp3(e.target.files)}/>
        {mp3 && mp3[0] && (
            <p>Selected Content File: {mp3[0].name}</p>
          )}
      </div>
    </div>
    <div className="add__music">
        <label for="thumbnail-upload" className="custom-file-upload">
          <IoCloudUploadOutline style={{fontSize:"20px", marginLeft:"50px"}} />
          Upload Thumbnail
        </label>
        <input  type="file" id="thumbnail-upload" accept="image/*" onChange={(e) => setthumbnail(e.target.files)}/>
        {thumbnail && thumbnail[0] && (
            <p>Selected Thumbnail File: {thumbnail[0].name}</p>
          )}
      </div>

    <p>Select Category</p>

    <select onChange={(e)=>setCategory(e.target.value)}>
        <option>select</option>
        {
    
            data.map(({name})=>{
                return <option>{name}</option>
            })
        }
    </select>

    
      <form className="music__form">
        <label>Content Name</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)}/>
      </form>
        <Button marginTop="10px" colorScheme='red' onClick={uploadHandler}>Upload</Button>
    
    </>

  );
};

export default AddContent;
