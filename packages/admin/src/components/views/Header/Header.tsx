import React, {FC, useState} from 'react'

const Header: FC = () => {
  const [userName] = useState<string>('UserName')
  return (
    <div>
      <span>welcome, {userName}!</span>
    </div>
  )
}

export default Header
