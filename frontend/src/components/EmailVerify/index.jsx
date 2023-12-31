import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Fragment } from 'react';

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
	console.log("these are the param inside index.jsx")
	console.log(param);

	useEffect(() => {
		const verifyEmailUrl = async () => {

			let obj = {_id: param.id, token: param.token};
			let jsonBody = JSON.stringify(obj);

			try {
				setValidUrl(true);
				try {
					const response = await fetch('/api/registerVerification/:id/verify/:token', {
					  method: 'POST',
					  body: jsonBody, 
					  headers: { 'Content-Type': 'application/json' },
					});
			  
					let res = await response.json();
					if (res.message === 'Account verified successfully! You may close this window and log in.') {
					  console.log("worked")
					} 
					else
					  console.log("didnt work")
				  } 
				  catch (e) {
					// alert(e.toString());
					return;
				  }
			} catch (error) {
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
