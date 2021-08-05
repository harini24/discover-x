import React from 'react'

const Switch = ({ isOn, handleToggle }) => {
    return <React.Fragment>
        <div style={{ float: 'left' }}>
            <input
                checked={isOn}
                onChange={handleToggle}
                className='react-switch-checkbox'
                type="checkbox"
            />
            <label className="react-switch-label">
                Avatar
            </label>
        </div>
    </React.Fragment>
}

export default Switch