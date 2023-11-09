import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const  Profile = ({ src }) => {

  const [textWrapperWidth, setTextWrapperWidth] = useState(0);
  const mainMenu = useRef(null);
  const textWrapper = useRef(null);

  const onMainMenuHover = () => {
    const {
      current: { scrollWidth }
    } = textWrapper;
    setTextWrapperWidth(scrollWidth);
  };

  const onMainMenuLeave = () => {
    setTextWrapperWidth(0);
  };

  return (
    <div className="prof-menu">
      <button
        type="button"
        className="prof-menu__main"
        ref={mainMenu}
        onFocus={onMainMenuHover}
        onBlur={onMainMenuLeave}
        onMouseOver={onMainMenuHover}
        onMouseLeave={onMainMenuLeave}
      >
        <div
          id="text-wrapper"
          className="prof-menu__text-wrapper"
          ref={textWrapper}
          style={{ maxWidth: textWrapperWidth }}
        >
          <p className="prof-menu__greeting">
            Hello, fellow summoner!
            <span role="img" aria-label="cosmic-star">
              💫
            </span>
          </p>
        </div>
        <div className="prof-menu__img-wrapper">
          <img className="prof-menu__img" src={src} alt="profile" />
        </div>
      </button>
    </div>
  );
}

Profile.propTypes = {
  src: PropTypes.string
};
  
Profile.defaultProps = {
  src: ''
};


export default Profile;