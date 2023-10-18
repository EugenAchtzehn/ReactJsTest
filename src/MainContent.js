import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './App';

function MainContent() {
  const initialFarmObj = {
    Owner: 'Smith',
    Horse: 3,
    Sheep: 15,
    Cattle: 4,
  };
  const [color, setColor] = useState('red');
  const [marriage, setMarriage] = useState(false);
  const [farmObj, setFarmObj] = useState(initialFarmObj);
  // setting up a loading message...
  const [loading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState([]);

  // 由外層元件傳入
  const userInfo = useContext(UserContext);

  // const [fetchData, setFetchData] = useState({
  //   results: [{ name: { title: '', first: '', last: '' } }],
  // });

  useEffect(() => {
    // 元件掛載後再取得資料
    fetch('https://randomuser.me/api/?results=10')
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setFetchData(result); // 更新 fetchData 以保存取得的資料
        setLoading(false); // 有設定 loading 狀態的時候可用
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // 有設定 loading 狀態的時候可用
      });
  }, []); // 第二個參數設為空陣列，以確保只在元件掛載時呼叫一次

  function selectOnChange(event) {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    // console.log('select value changes...');
  }

  // 塞入一個 results 陣列中的物件
  function Card({ data }) {
    return (
      <div className="w-full md:w-1/2 lg:w-1/4 px-2">
        <div className="h-full py-2 rounded shadow-lg bg-amber-100">
          <img className="block mx-auto my-2" src={data.picture.large} alt="portrait " />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {`
              ${String(data.name.title)} ${String(data.name.first)} ${String(data.name.last)}
            `}
            </div>
            <p className="text-gray-700 text-base">
              Street:
              {`
              ${String(data.location.street.name)} ${String(data.location.street.number)}
            `}
            </p>
            <p className="text-gray-700 text-base">City: {data.location.city}</p>
            <p className="text-gray-700 text-base">State: {String(data.location.state)}</p>
            <p className="text-gray-700 text-base">Country: {String(data.location.country)}</p>
          </div>
          {/* <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
        </div> */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {loading ? (
        <div className="api_section">Loading...</div>
      ) : (
        <div className="api_section flex flex-wrap items-stretch justify-center py-2 gap-y-3">
          {fetchData.results.map((item) => (
            <Card key={item.login.uuid} data={item} />
          ))}
        </div>
      )}

      <div className="farm_section">
        {JSON.stringify(farmObj)}
        <input
          type="number"
          className="block mx-auto py-2 px-3"
          id="setFarmHorse"
          placeholder="設定馬的數量"
          onChange={(event) => {
            console.log(event.target.value);
            const newHorseNum = Number(event.target.value);
            const newFarmObj = { ...farmObj, Horse: newHorseNum };
            setFarmObj(newFarmObj);
            // setFarmObj()
          }}
        />
      </div>
      <p>My favorite color is {color}!</p>
      <button
        type="button"
        className="border border-blue-200 bg-blue-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-blue-300 focus:outline-none focus:shadow-outline"
        onClick={() => setColor('blue')}
      >
        Blue
      </button>
      <button
        className="border border-pink-200 bg-pink-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-pink-300 focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => setColor('pink')}
      >
        Pink
      </button>
      <div>
        <label htmlFor="marriageStatus">Toggle Marriage Status:</label>
        <input
          type="checkbox"
          id="marriageStatus"
          className="ms-2"
          onClick={() => setMarriage(!marriage)}
        />
        <p>Marriage State Now: {JSON.stringify(marriage)}</p>
      </div>
      <select
        id="countySelect"
        onChange={(event) => selectOnChange(event)}
        className="bg-gray-50 border border-gray-300 text-gray-900 mx-auto my-3 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={'Taiwan'}>Taiwan</option>
        <option value={'USA'}>USA</option>
        <option value={'Japan'}>Japan</option>
      </select>
      <div>
        <h3>useContext 取得 App.js 的授權訊息：</h3>
        userInfo isValid: {String(userInfo.isValid)}
      </div>
    </div>
  );
}

export default MainContent;
