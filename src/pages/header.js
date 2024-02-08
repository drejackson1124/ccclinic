import React, { useState, useEffect } from 'react';
import Sticky from 'react-stickynode';
import Navbar from './navbar';
import '../css/header.css';


const Header = () => {
	
	return(
     <Sticky enabled={true} top={0} bottomBoundary={3000} className='sticky-container'>
        <Navbar/>
     </Sticky>
	);
}

export default Header;