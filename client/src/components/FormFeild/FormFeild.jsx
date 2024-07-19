import React from 'react'
import "./FormFeild.css"

const FormField = ({ labelname, type, name, value, placeholder, handleChange, handleSurpriseMe, isSurpriseMe }) => {
    return (
        <div className='form-feild'>
            <div>
                <label htmlFor={name}>
                    {labelname}
                    
                    {isSurpriseMe && (
                        <button type='button' onClick={handleSurpriseMe}>Surprise me</button>
                    )}
                </label>
            </div>
            <input type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                style={{}}
                required />
        </div>
    )
}

export default FormField