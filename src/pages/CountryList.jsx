import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import axios from 'axios';


function CountryList() {
    const [fileData, setFileData] = useState(null);

    // Function to handle file upload
    const handleFileUpload = (event) => {

        const file = event.target.files[0];
        console.log("file", file)
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            console.log(jsonData);
            setFileData(jsonData)
        };

        reader.readAsArrayBuffer(file);
    };


    const handleAPICall = () => {


  // URL to send the POST request
  const url = 'http://localhost:8000/v1/upload/countryList';

  // Data to be sent in the request body
  const requestData = {
    fileData
  };

  // Making a POST request using Axios
  axios.post(url, fileData)
    .then(response => {
      // Handle success response
      console.log('Response:', response.data);
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });

        // Your API calling function here
        console.log('API call function should be implemented here');
    };





    useEffect(() => { fileData?.length > 0 && console.log('fileData', fileData[0]) }, [fileData])

    return (
        <div>
            <h1 className="text-center text-3xl font-bold">Country List</h1>
            <div className="max-w-md ml-8 mr-auto my-8">
                {/* <input
                    type="file"
                    onChange={handleFileUpload}
                    className="border border-gray-300 py-2 px-4 w-full rounded-md mb-4"
                /> */}


                <div className="mb-4 flex w-full p-4 border-dashed rounded-lg border-2 border-sky-500">
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        className="border border-gray-300 py-2 px-4 w-full rounded-md mb-2"
                    />
                    <button
                        onClick={handleAPICall}
                        className="bg-pink-500 ml-4 hover:bg-pink-700 text-white font-bold h-12 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>



                {fileData && (
                    <table className="table-auto border border-gray-300 w-full">
                        <thead>
                            {/* <tr>
                                <th className="border border-gray-300 px-4 py-2">no</th>
                                <th className="border border-gray-300 px-4 py-2">name</th>
                                <th className="border border-gray-300 px-4 py-2">marketCap</th>
                                <th className="border border-gray-300 px-4 py-2">sector</th>
                                <th className="border border-gray-300 px-4 py-2">oneMonth</th>
                                <th className="border border-gray-300 px-4 py-2">threeMonth</th>
                                <th className="border border-gray-300 px-4 py-2">sixMonth</th>
                                <th className="border border-gray-300 px-4 py-2">oneWeek</th>
                                <th className="border border-gray-300 px-4 py-2">oneYear</th>
                                <th className="border border-gray-300 px-4 py-2">industry</th>
                                <th className="border border-gray-300 px-4 py-2">lossess</th>
                                <th className="border border-gray-300 px-4 py-2">gains</th>
                            </tr> */}
                            <tr>
                                {Object.keys(fileData[0]).map((key, index) => (
                                    <th key={index} className="border border-gray-800 px-4 py-2">
                                        {key}
                                    </th>
                                ))}
                            </tr>

                        </thead>
                        <tbody>
                            {/* <tr>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].No}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].Company}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].Country}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].Industry}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].Market Cap}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].P/E}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].sixMonth}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].oneWeek}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].oneYear}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].Price}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].Change}</td>
              <td className="border border-gray-300 px-4 py-2">{fileData[0].Volume}</td>
            </tr> */}

                            {fileData.map((item, index) => (
                                <tr key={index}>
                                    {Object.values(item).map((value, index) => (
                                        <td key={index} className="border border-gray-800 px-4 py-2">
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}


                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default CountryList


// {
//     "No.": 1,
//     "Ticker": "MSFT",
//     "Company": "Microsoft Corporation",
//     "Sector": "Technology",
//     "Industry": "Software - Infrastructure",
//     "Country": "USA",
//     "Market Cap": "3190.41B",
//     "P/E": "38.83",
//     "Price": "429.37",
//     "Change": "0.97%",
//     "Volume": "21,296,222"
// }

