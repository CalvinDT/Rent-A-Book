import React from "react";


const statusContext = React.createContext({
  jwt: "",
  setJwt: () => {}
});



export default statusContext