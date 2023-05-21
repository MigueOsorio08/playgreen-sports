import React from 'react';
import styled from 'styled-components';
import logOut from '../functions/logout';

const Nav = styled.section`
    display: flex;
    width :90%;
    justify-content: space-around;
    position: absolute;
    bottom: 10px;
    background-color: #2c2b3e;
    height: 85px;
    align-items:center;
    border-radius: 24px;
`;

const home = () => {
    sessionStorage.setItem("location","home");
    window.location.reload();
}

const history = () => {
    sessionStorage.setItem("location","history");
    window.location.reload();
}

const Navigation = () =>{
    return (
        <Nav>
            <div tabIndex={0} onClick={home} className="home-nav nav"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <path d="M18.3637 8.12707L18.3636 8.12697L10.5505 1.02391C10.2635 0.761112 9.88849 0.615354 9.49936 0.615372C9.11024 0.61539 8.73524 0.761183 8.44829 1.02401L0.63636 8.12697C0.475451 8.27355 0.34687 8.45206 0.258823 8.65112C0.170776 8.85018 0.125199 9.0654 0.125 9.28306V18.3125C0.125474 18.7268 0.290246 19.1239 0.583169 19.4168C0.876092 19.7098 1.27324 19.8745 1.6875 19.875H17.3125C17.7268 19.8745 18.1239 19.7098 18.4168 19.4168C18.7098 19.1239 18.8745 18.7268 18.875 18.3125V9.28311C18.8748 9.06547 18.8292 8.85026 18.7412 8.65121C18.6532 8.45216 18.5246 8.27365 18.3637 8.12707Z" fill="#777777" />
            </svg></div>
            <div tabIndex={0} onClick={history} className="history-nav nav"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M9.5 0.125C7.64581 0.125 5.83325 0.674834 4.29153 1.70497C2.74982 2.73511 1.54821 4.19929 0.838634 5.91234C0.129062 7.6254 -0.0565943 9.5104 0.305142 11.329C0.666879 13.1475 1.55976 14.818 2.87088 16.1291C4.182 17.4402 5.85246 18.3331 7.67103 18.6949C9.48961 19.0566 11.3746 18.8709 13.0877 18.1614C14.8007 17.4518 16.2649 16.2502 17.295 14.7085C18.3252 13.1668 18.875 11.3542 18.875 9.5C18.8722 7.01446 17.8836 4.63152 16.126 2.87398C14.3685 1.11643 11.9855 0.127811 9.5 0.125ZM13.9194 6.18541L10.0525 10.0524C9.97992 10.125 9.8938 10.1825 9.79902 10.2218C9.70423 10.2611 9.60264 10.2813 9.50004 10.2813C9.39744 10.2813 9.29585 10.2611 9.20106 10.2218C9.10627 10.1826 9.02014 10.125 8.94759 10.0525C8.87504 9.97992 8.81749 9.8938 8.77822 9.79901C8.73895 9.70422 8.71874 9.60263 8.71874 9.50004C8.71873 9.39744 8.73894 9.29584 8.77819 9.20105C8.81745 9.10626 8.875 9.02014 8.94754 8.94759L12.8145 5.08058C12.8871 5.00803 12.9732 4.95048 13.068 4.91122C13.1628 4.87195 13.2644 4.85174 13.367 4.85174C13.4696 4.85174 13.5712 4.87194 13.6659 4.9112C13.7607 4.95046 13.8469 5.00801 13.9194 5.08055C13.992 5.1531 14.0495 5.23922 14.0888 5.33401C14.128 5.42879 14.1482 5.53038 14.1482 5.63298C14.1482 5.73557 14.128 5.83716 14.0888 5.93195C14.0495 6.02674 13.992 6.11286 13.9194 6.18541H13.9194Z" fill="#777777" />
            </svg></div>
            <div tabIndex={0} className="logout nav" onClick={logOut}><svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                <path d="M15.7084 4.29167L14.2396 5.76042L16.9271 8.45833H6.33337V10.5417H16.9271L14.2396 13.2292L15.7084 14.7083L20.9167 9.5L15.7084 4.29167ZM2.16671 2.20833H10.5V0.125H2.16671C1.02087 0.125 0.083374 1.0625 0.083374 2.20833V16.7917C0.083374 17.9375 1.02087 18.875 2.16671 18.875H10.5V16.7917H2.16671V2.20833Z" fill="#777777" />
            </svg></div>
        </Nav>
    )
}

export default Navigation;