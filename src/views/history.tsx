import { database } from "../firebase/credenciales";
import { getDatabase, ref, onValue, off, get, child } from "firebase/database";
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Navigation from './navigation';
import "firebase/database";

const Main = styled.main`
    height : 100vh;
    background-color : #181828;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;

const ReturnHome = styled.div`
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
   `;

const MainContent = styled.div`
   overflow: scroll;
   box-sizing: border-box;
   width: 90vw;
   height: 80vh;
   justify-content: center;
   margin-top: 30px;
   padding: 5px;

   ::-webkit-scrollbar {
    display: none
  }

  .title-history, .resume{
    color: white;
    width: 70%;
  }

  .history-element{
    display: flex;
    background-color: blue;
    box-sizing: border-box;
    height: 77px;
    margin: 10px 0px;
    align-items: center;
    background: #2c2b3e;
    border-radius : 24px;
  }
  
  .image-container{
    border-radius : 24px;
    background-color: aqua;
    width: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-right: 10px;
    background: #2c2b3e;
  }

   .teamImage{
    width: 70px;
    height: 70px
   }
   `;

const History = (user: any) => {
  const [information, setInformation] = useState<any[]>([]);
  const userId = user.user.uid;
  console.log(userId);

  useEffect(() => {
    const dbRef = ref(database, 'decisions');
    const userRef = child(dbRef, userId);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const decisions = Object.entries(data).map(([key, value]) => ({
          id: key,
          decision: value,
        }));
        setInformation(decisions);
      }
    });
  }, [userId]);


  const returnHome = () => {
    sessionStorage.setItem("location", "home");
    window.location.reload();
  }

  return (
    <Main className="history">
      <MainContent className="main-content">
        <ReturnHome>
          <div tabIndex={0} className="return" onClick={returnHome}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <g clip-path="url(#clip0_1_272)">
                <path d="M25.3125 15H4.6875" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.125 6.5625L4.6875 15L13.125 23.4375" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_1_272">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </ReturnHome>
        <div>
          <h1 className="title-history">History</h1>
          <p className="resume">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          {information.length > 0 ? (
            information.map((decision) => (
              <div key={decision.id} className="history-element">
                <span className="image-container">
                  <img src={`https://www.thesportsdb.com/images/media/team/badge/${decision.id}.png`} alt="history image" className="teamImage"></img>
                </span>
                <span className="text-container">{decision.decision === "cancel" ?
                  <div tabIndex={0} className="btn btn-cancel"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.998921 0.998837C1.59792 0.399837 2.56909 0.399837 3.16809 0.998837L7.86796 5.6987L12.5678 0.998837C13.1668 0.399838 14.138 0.399837 14.737 0.998837C15.336 1.59784 15.336 2.56901 14.737 3.16801L10.0371 7.86787L14.737 12.5677C15.336 13.1667 15.336 14.1379 14.737 14.7369C14.138 15.3359 13.1668 15.3359 12.5678 14.7369L7.86796 10.037L3.16809 14.7369C2.56909 15.3359 1.59792 15.3359 0.998921 14.7369C0.399921 14.1379 0.399921 13.1667 0.998921 12.5677L5.69879 7.86787L0.998921 3.16801C0.399921 2.56901 0.399921 1.59784 0.998921 0.998837Z" fill="white" />
                  </svg></div>
                  :
                  <div tabIndex={0} className="btn btn-heart"><svg xmlns="http://www.w3.org/2000/svg" width="38" height="35" viewBox="0 0 38 35" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M26.1913 0.300248C27.3413 0.300248 28.4895 0.462449 29.5812 0.828768C36.3079 3.01574 38.7318 10.3968 36.7071 16.8484C35.5589 20.1452 33.6817 23.1542 31.2232 25.6127C27.704 29.0207 23.8422 32.046 19.6851 34.6522L19.2295 34.9274L18.7556 34.634C14.584 32.046 10.7003 29.0207 7.14824 25.5945C4.70611 23.1359 2.82714 20.1452 1.66075 16.8484C-0.398654 10.3968 2.02525 3.01574 8.82492 0.790496C9.35344 0.608248 9.89836 0.480674 10.4451 0.409597H10.6638C11.1759 0.334875 11.6844 0.300248 12.1947 0.300248H12.3952C13.5433 0.334875 14.655 0.535348 15.7321 0.901667H15.8396C15.9125 0.936294 15.9672 0.974566 16.0037 1.00919C16.4064 1.13859 16.7873 1.28439 17.1518 1.48486L17.8444 1.79468C18.0117 1.88393 18.1996 2.0203 18.3619 2.13816C18.4647 2.21284 18.5574 2.28008 18.628 2.3232C18.6578 2.34075 18.688 2.3584 18.7185 2.37619C18.8748 2.46741 19.0375 2.56242 19.1748 2.66765C21.1996 1.12036 23.6581 0.282023 26.1913 0.300248ZM31.0389 13.4226C31.7861 13.4026 32.424 12.803 32.4787 12.0357V11.8188C32.5333 9.26553 30.9861 6.9528 28.6332 6.05979C27.886 5.80282 27.0659 6.20558 26.7925 6.97103C26.5374 7.73647 26.9383 8.57481 27.7038 8.84636C28.872 9.28375 29.6538 10.4337 29.6538 11.7077V11.7642C29.6192 12.1815 29.745 12.5843 30.0001 12.8941C30.2552 13.2039 30.638 13.3843 31.0389 13.4226Z" fill="white" />
                  </svg></div>

                }</span>
              </div>
            ))
          ) : (
            <div>Aún no tienes un historial</div>
          )}
        </div>
      </MainContent>
      <Navigation />
    </Main>
  );
};

export default History;
