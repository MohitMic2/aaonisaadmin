import { db } from 'Config';
import Table from '../Tables/Tables';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const AllVideos = () => {
  const [users, setUsers] = useState([]);
  const [demo,setDemo] = useState([]);
  const [form, setform] = useState('');
  const [to,setTo] = useState('');
  const [data,setdata] = useState([])

  const getData = async () => {
    try {
      const usersCollection = collection(db, 'videos');
      const usersSnapshot = await getDocs(usersCollection, where('date', '>=', form), where('date', '<=', to));
    const usersData = usersSnapshot.docs.map((doc) => doc.data());

    console.log(usersData);
    
      setUsers(usersData);
      setDemo(usersData);


      setdata(usersData.map(data => ({
        username: data.username,
        shareCount: data.shareCount,
        Followers: data.likes.length,
        Following: data.dislike.length,
        Pic: data.thumbnail,
        commentCount: data.commentCount,
        views: data.views,
      })))
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { Header: 'Username', accessor: 'username' },
    { Header: 'Share Count', accessor: 'shareCount' },
    { Header: 'Likes', accessor: 'Followers' },
    { Header: 'dislikes', accessor: 'Following' },
    { Header: 'Profile Pic', accessor: 'Pic' },
    { Header: 'Comment Count', accessor: 'commentCount' },
    { Header: 'Views', accessor: 'views' },
  ];

  const clickHandler = () => {
    const fromDateTimestamp = new Date(form).getTime();
    const toDateTimestamp = new Date(to).getTime();
    var res = [];
  
    const filteredData = demo.filter((item) => {
      const itemTimestamp = item.date.toDate().getTime();
      return itemTimestamp >= fromDateTimestamp && itemTimestamp <= toDateTimestamp;
  });
  

    console.log(filteredData);
  
    setdata(filteredData.map(data => ({
      username: data.username,
      shareCount: data.shareCount,
      Followers: data.likes.length,
      Following: data.dislike.length,
      Pic: data.thumbnail,
      commentCount: data.commentCount,
      views: data.views,
    })))
  };
  
  

  return (
    <div>
      <div style={{marginTop:'100px', display:'inline-flex'}}>
      <input onChange={(e)=>setform(e.target.value)} type='date'></input>
      <div style={{width:'100px',textAlign:'center',fontWeight:'bold'}}>To</div>
      <input onChange={(e)=>setTo(e.target.value)} type='date'></input>
      <div onClick={clickHandler} style={{width:'100px',textAlign:'center',fontWeight:'bold'}}>Search</div>
      </div>
    <Table columns={columns} data={data} />
    </div>
  );
};

export default AllVideos;
