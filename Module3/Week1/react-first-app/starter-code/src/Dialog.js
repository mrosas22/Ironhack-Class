import React from "react";
import FancyBorder from './FancyBorder.js'

function Dialog(props) {
    console.log('The prop is: ', props)
	return (
		<FancyBorder>
		<h1> 
		{props.title}
		</h1>
		<p>
		{props.message}
		</p>
		</FancyBorder>     // | |
	);                     // | |
}                          // | |
                           // | |
function WelcomeDialog() { // | |
	return (               // | |
		<Dialog // | |
		title="Welcome" // <=========== | 
		message="Thank you for visiting our spacecraft!" /> // <===
	);
}

export default WelcomeDialog;