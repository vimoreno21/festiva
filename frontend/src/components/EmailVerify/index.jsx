import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { Fragment } from 'react';
const verify = require('./LoginSignUp');

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			console.log("in verifyEmailURL -> index.jsx")
			try {
				//const url = `https://festiva-ucf-3a962394b6e7.herokuapp.com/api/registerVerification/:id/verify/:token`;
				//const { data } = await axios.get(url);
				//console.log(data);
				setValidUrl(true);
				try {
					const response = await fetch('/api/registerVerification/:id/verify/:token', {
					  method: 'POST',
					  headers: { 'Content-Type': 'application/json' },
					});
			  
					let res = await response.json();
					if (res.message === 'Account verified successfully! You may close this window and log in.') {
					  setResultSignUp('Account verified successfully! You may close this window and log in.');
					} else {
					  setResultSignUp('Error Verifying account.');
					}
				  } catch (e) {
					alert(e.toString());
					return;
				  }
			} catch (error) {
				console.log("WE HAVE AN ERROR");
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			{validUrl ? (
				<div className={styles.container}>
					<h1>Email verified successfully</h1>
					<Link to="/start">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;