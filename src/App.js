import React, { useState, createContext } from 'react';

// React 好像有規定元件命名必須使用大寫
import MainContent from './MainContent';
import Footer from './Footer';
import logo from './logo.svg';
import './App.css';

// 在外部元件使用要匯出
export const UserContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState({
    account: 'EugenAchtzehn',
    password: 'myPassword@123',
    isValid: true,
  });

  const timeoutId = setTimeout(validationChange, 30000);
  function validationChange() {
    const switchedUserInfo = { ...userInfo, isValid: !userInfo.isValid };
    setUserInfo(switchedUserInfo);
  }
  console.log('timeoutId: ', timeoutId);

  return (
    <UserContext.Provider value={userInfo}>
      <div className="App">
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl text-red-700 font-bold">Hello React!</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="foo" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header> */}
        <main className="md:flex">
          <div className="bg-slate-700">
            <img src={logo} className="App-logo mx-auto" alt="logo" />
          </div>
          <MainContent></MainContent>
        </main>
        <Footer></Footer>
      </div>
    </UserContext.Provider>
  );
}

export default App;
