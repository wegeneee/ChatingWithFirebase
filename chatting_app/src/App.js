import React, { useContext, useEffect, useState } from 'react'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import NoConnection from './NoConnection'
 import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
 import { AuthContext } from './Context/AuthContext';

const App = () => {
  const {currentUser} = useContext(AuthContext);
  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to ="/login"/>;
    }
    return children
  };


  return (
    <NoConnection>
    <div>
    <BrowserRouter>
      <Routes>
      <Route path='/'>
      <Route index element={ <ProtectedRoute>
          <Home/>
      </ProtectedRoute>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>


      </Route>
      </Routes>
    </BrowserRouter>
    </div>
     </NoConnection>
  )
}

export default App 



// import React, { useContext, useState, useEffect } from 'react';
// import Signup from './Pages/Signup';
// import Login from './Pages/Login';
// import Home from './Pages/Home';
// import NoConnection from './NoConnection';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './Context/AuthContext';

// const App = () => {
//   const { currentUser } = useContext(AuthContext);


//   const ProtectedRoute = ({ children }) => {
//     if (!currentUser) {
//       return <Navigate to="/login" />;
//     }
//     return children;
//   };

 

//   return (

//      <NoConnection>
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/">
         
//             <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
//             <Route path="login" element={<Login />} />
//             <Route path="signup" element={<Signup />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//       </NoConnection>
//   );
// }

// export default App;
