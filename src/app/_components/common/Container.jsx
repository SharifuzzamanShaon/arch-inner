import React from 'react'

const Container = ({children}) => {
  return (
    <div className="container mx-auto mx-w-[1440px] px-2 lg:px-8">{children}</div>
  )
}

export default Container