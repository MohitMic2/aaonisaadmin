import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Textarea } from '@chakra-ui/react';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { JSdb, JSstorage } from 'JSConfig'; // Assuming you have the 'storage' object from Firebase config
import { IoCloudUploadOutline } from 'react-icons/io5';
import "./JustSearch.css"


const JustSearch = () => {
  const [categorie, setCategorie] = useState('');
  const [subCategorie, setSubCategorie] = useState('');
  const [image, setImage] = useState(null); // State to hold the selected image file
  const [add, setAdd] = useState(null)

  const createCategories = async () => {
    try {

      const uuid = uuidv4();
      // 1. Upload image to Firebase Storage
      const storageRef = ref(JSstorage, `category-logo/${uuid}`);
      await uploadBytes(storageRef, image);
      const imageURL = await getDownloadURL(storageRef)

      // 2. Add category to Firestore
      const categories = collection(JSdb, 'categories');
      await addDoc(categories, {
        categorie: categorie,
        subCategorie: subCategorie,
        imageUrl: imageURL, // Reference to the uploaded image
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };



  return (
    <>
    <div className="just-search">
      <div className="add-category">
        <h1>Add Category</h1>

        <div className="category-input">
          <input
            type="text"
            placeholder="Enter Categorie Name"
            onChange={(e) => setCategorie(e.target.value)}
          />

          <Textarea
            placeholder="Enter Subcategories"
            onChange={(e) => setSubCategorie(e.target.value)}
          />
          <p>Add Logo for the category</p>
          <input type="file" onChange={handleImageChange} />
        </div>
        <Button
          style={{ border: '1px solid #000', marginLeft: '80px', marginTop: '20px' }}
          onClick={createCategories}
        >
          Create Category
        </Button>
      </div>
    </div>

    <div className="upload-add">
    <div className="add__music">
        <label for="add-one" className="custom-file-upload">
          <IoCloudUploadOutline style={{fontSize:"20px", marginLeft:"50px"}} />
          Upload Add 1
        </label>
        <input  type="file" id="add-one" accept="image/*" onChange={(e) => setAdd(e.target.files)}/>
        {add && add[0] && (
            <p>Selected Thumbnail File: {add[0].name}</p>
          )}
      </div>
      <Button>Upload</Button>
    </div>

    <div className="upload-add">
    <div className="add__music">
        <label for="add-two" className="custom-file-upload">
          <IoCloudUploadOutline style={{fontSize:"20px", marginLeft:"50px"}} />
          Upload Add 2
        </label>
        <input  type="file" id="add-two" accept="image/*" onChange={(e) => setAdd(e.target.files)}/>
        {add && add[0] && (
            <p>Selected Thumbnail File: {add[0].name}</p>
          )}
      </div>
      <Button>Upload</Button>
    </div>

    <div className="upload-add">
    <div className="add__music">
        <label for="add-two" className="custom-file-upload">
          <IoCloudUploadOutline style={{fontSize:"20px", marginLeft:"50px"}} />
          Upload Add 3
        </label>
        <input  type="file" id="add-two" accept="image/*" onChange={(e) => setAdd(e.target.files)}/>
        {add && add[0] && (
            <p>Selected Thumbnail File: {add[0].name}</p>
          )}
      </div>
      <Button>Upload</Button>
    </div>
    </>
  );
};

export default JustSearch;
