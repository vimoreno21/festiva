import React from 'react'

const List = ({headerText, bodyText, number}) => {
  return (
    <>
        <p className='fw-bold text-3xl mb-1'>
            {headerText}
        </p>

        <p className='fw-normal text-xl'>{bodyText}</p>
    </>
  )
}

export default List