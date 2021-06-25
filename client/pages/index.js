import React from 'react';
import buildClient from '../api/build-client';

 function Home ( { currentUser } ) {

  return (
    <div>
      {currentUser ? <h1>You are signed in </h1> : <h1> you are NOT signed in </h1>}
    </div>
  )
}

Home.getInitialProps = async (context) => {

  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser")

  // console.log(data);

  return data
}


export default Home