import React, { useState, useEffect } from 'react';

function MainContent() {
  const initialFarmObj = {
    owner: 'Johnson',
    area: 50,
    horseNum: 3,
    sheepNum: 15,
    cowNum: 4,
  };
  const [color, setColor] = useState('red');
  const [marriage, setMarriage] = useState(false);
  const [farmObj, setFarmObj] = useState(initialFarmObj);
  // setting up a loading message...
  const [loading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState([]);
  // const [fetchData, setFetchData] = useState({
  //   results: [{ name: { title: '', first: '', last: '' } }],
  // });

  useEffect(() => {
    // 元件掛載後再取得資料
    fetch('https://randomuser.me/api/')
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

  function filteringFetchData(fetchData) {
    // console.log(fetchData);
    const randomName = fetchData.results[0].name;
    const randomNameFull = `${randomName.title} ${randomName.first} ${randomName.last}`;
    return randomNameFull;
  }

  return (
    <div className="w-full">
      {loading ? (
        <div className="api_section">Loading...</div>
      ) : (
        <div className="api_section flex justify-center py-2">
          <div className="max-w-sm rounded overflow-auto shadow-lg bg-amber-100">
            <img className="block mx-auto my-2" src={fetchData.results[0].picture.large} alt="portrait " />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{filteringFetchData(fetchData)}</div>
              <p className="text-gray-700 text-base">
                Street:{' '}
                {String(fetchData.results[0].location.street.name) +
                  ', ' +
                  String(fetchData.results[0].location.street.number)}
              </p>
              <p className="text-gray-700 text-base">City: {String(fetchData.results[0].location.city)}</p>
              <p className="text-gray-700 text-base">State: {String(fetchData.results[0].location.state)}</p>
              <p className="text-gray-700 text-base">Country: {String(fetchData.results[0].location.country)}</p>
            </div>
            {/* <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
            </div> */}
          </div>
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
            const newHorseNum = event.target.value;
            const newFarmObj = { ...farmObj, horseNum: newHorseNum };
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
        <input type="checkbox" id="marriageStatus" className="ms-2" onClick={() => setMarriage(!marriage)} />
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
    </div>
  );
}

export default MainContent;
