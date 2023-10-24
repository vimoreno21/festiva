import React from 'react';
import PageTitle from '../components/PageTitle';
import LoginSignUp from '../components/LoginSignUp';

const StartPage = () =>
{
    return(
        <div className="container-fluid center-content">
        <PageTitle />
        <LoginSignUp className="center-content"/>
        </div>
    );
};
export default StartPage;
