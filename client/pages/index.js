import React from 'react';
import axios from 'axios';
import buildClient from '../api/build-client';

 function Home ( { currentUser } ) {
   console.log(currentUser);
  return (
    <div>
      <h1>Heading </h1>
    </div>
  )
}

Home.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser")

  return data;
}


export default Home