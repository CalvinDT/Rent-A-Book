import React from "react";

const StatusContext = React.createContext({
  isLoading: true,
  setIsLoading: () => {}
});

export default StatusContext;