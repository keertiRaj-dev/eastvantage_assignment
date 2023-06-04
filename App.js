import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [userData, setUserData] = useState(null);

const fetchUserData = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api');
    const { name, email } = response.data.results[0];
    const userData = { fullName: `${name.first} ${name.last}`, email };
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  const savedUserData = localStorage.getItem('userData');
  if (savedUserData) {
    setUserData(JSON.parse(savedUserData));
  } else {
    fetchUserData();
  }
}, []);

const handleRefresh = () => {
  fetchUserData();
};

  return (
    <div className="box">
    <h1 className="heading"><b>User Details</b></h1>
       {userData ? (
         <div className="box2">
           <p>Full Name: {userData.fullName}</p>
           <p>Email: {userData.email}</p>
         </div>
       ) : (
         <p>Loading...</p>
       )}
       <button className="refresh" onClick={handleRefresh}>Refresh To Have Other User's Details</button>
     </div>
  );
}

export default App;
