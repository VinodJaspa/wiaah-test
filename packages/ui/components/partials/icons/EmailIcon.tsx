import React from 'react'
import { IconBaseProps } from 'react-icons'
import { MdEmail } from "react-icons/md"

export const EmailIcon:React.FC<IconBaseProps> = (props) => {
  return (
    <MdEmail {...props} />    
  )
}
