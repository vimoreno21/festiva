import React from 'react'

const List = ({headerText, bodyText, number}) => {
  return (
    <>
        <p className='fw-normal d-flex flex-row'>
            {number} <span className='fw-bold ms-2 fs-6'>{headerText}</span>
        </p>

        <p className='fw-normal pb-4 fs-6'>{bodyText}</p>
    </>
  )
}

export default List