import React from 'react'

const Modal = ({selectedimg, setselectedimg}) => {
    const handleclick = (event) =>{
        // console.log(event.target.classList)
        if (event.target.classList.contains('backdrop')){
            setselectedimg(null)
        }
    }
    return (
        <div className="backdrop" onClick ={handleclick} >
            <img src={selectedimg} alt="openImage"/>            
        </div>
    )
}

export default Modal
