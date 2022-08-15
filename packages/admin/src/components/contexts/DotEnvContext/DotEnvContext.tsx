import React, {createContext, useContext} from 'react'

const DotEnvContext = createContext<{[key: string]: string}>({})

export const DotEnvContextProvider = ({values, children}: {values: {[key: string]: string}; children?: any}) => (
  <DotEnvContext.Provider value={values}>{children}</DotEnvContext.Provider>
)

export const useDotEnvContext = () => useContext(DotEnvContext)
