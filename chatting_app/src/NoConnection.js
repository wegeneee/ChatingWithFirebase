
import { Detector } from 'react-detect-offline'; 
import offline from './Image/offline.png'

const NoConnection = (props) => {
  return (
    <Detector
      render={({ online }) => (
        online ? <>{props.children}</> :
        <div style={{paddingTop:'10' ,textAlign:'center'}}>
        <img  src={offline} alt='no image'/>
        <h1>No Connection</h1>
          <p style={{margin:'0'}}>Please check your internet connection and try again.</p>
        </div>
      )}
    />
  );
};

export default NoConnection;
