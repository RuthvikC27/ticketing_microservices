import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Headers from '../components/headers';

function AppComponent({ Component, pageProps, currentUser }) {
  return <div className="container">
    <Headers currentUser={currentUser}/> 
    <Component {...pageProps} />
  </div>
} 

AppComponent.getInitialProps = async(appContext) => {
  // console.log(Object.keys(appContext));
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if(appContext.Component.getInitialProps){
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  console.log(pageProps);

  return {
    pageProps,
    ...data
  };
};

export default AppComponent;