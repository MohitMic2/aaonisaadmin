import { db } from 'Config';
import Table from '../Tables/Tables';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const getData = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);

      const userData = [];
      for (const userDoc of usersSnapshot.docs) {
        const user = userDoc.data();
        const postsCollection = collection(db, 'videos');
        const userPostsQuery = query(postsCollection, where('uid', '==', user.uid));
        const postsSnapshot = await getDocs(userPostsQuery);

        let totalLikes = 0;
        let totalViews = 0;
        postsSnapshot.forEach(postDoc => {
          const postData = postDoc.data();
          totalLikes += postData.likes ? postData.likes.length : 0;
          totalViews += postData.views ? postData.views : 0;
        });

        userData.push({
          ...user,
          likes: totalLikes,
          views: totalViews,
          totalPosts: postsSnapshot.docs.length
        });
      }

      setUsers(userData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { Header: 'Username', accessor: 'username' },
    { Header: 'Mobile Number', accessor: 'MobileNumber' },
    { Header: 'Followers', accessor: 'Followers' },
    { Header: 'Following', accessor: 'Following' },
    { Header: 'Profile Pic', accessor: 'Pic' },
    { Header: 'Plan', accessor: 'Plan' },
    { Header: 'Likes', accessor: 'likes' },
    { Header: 'Views', accessor: 'views' },
    { Header: 'Total Posts', accessor: 'totalPosts' }
  ];

  const data = users.map(data => ({
    username: data.username,
    Password: data.password,
    MobileNumber: data.contactNumber,
    Email: data.email,
    Followers: data.followers.length,
    Following: data.following.length,
    Pic: data.profilePic,
    Plan: data.plan,
    likes: data.likes,
    views: data.views,
    totalPosts: data.totalPosts
  }));

  return <Table columns={columns} data={data} />;
};

export default AllUsers;
