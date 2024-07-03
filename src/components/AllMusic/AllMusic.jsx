import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "Config";
import "./AllMusic.css";
import { useEffect } from "react";

const AllMusic = () => {
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    // Function to fetch music data from Firestore
    const fetchMusicData = async () => {
      try {
        const songsCollection = collection(db, "songs");
        const snapshot = await getDocs(songsCollection);

        const musicList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMusicData(musicList);
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchMusicData();
  }, []);
  console.log(musicData)
  return (
    <div className="music__card--container">
      {musicData.map((music) => (
        <div className="music__card">
           


            <img src={music.thumbnailURL} alt="thumbnail" />
            
            <audio controls className="audio">
              <source src={music.musicURL} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
           
           
           
            <p>Title: {music.title}</p>
            <p>Artist: {music.artist}</p>
           
            
        </div>
      ))}
    </div>
  );
};

export default AllMusic;
