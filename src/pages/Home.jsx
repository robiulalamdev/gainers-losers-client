import { useMemo, useState } from "react";
import { countryName, tableData } from "../utils/data";
import { FadeLoader } from "react-spinners";

const Home = () => {
  const [storedData, setStoredData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [permit, setPermit] = useState(true);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState({
    column: null,
    ascending: true,
  });

  const sever_url = import.meta.env.VITE_SERVER_URL;

  const handleSort = (columnName) => {
    setSortOrder((prevState) => ({
      column: columnName,
      ascending: prevState.column === columnName ? !prevState.ascending : true,
    }));
  };

  const sortedTableData = () => {
    const { column, ascending } = sortOrder;
    if (column) {
      return [...tableData].sort((a, b) => {
        if (a[column] === b[column]) {
          return 0;
        }
        return ascending ? a[column] - b[column] : b[column] - a[column];
      });
    }
    return tableData;
  };

  const refetch = async () => {
    setIsLoading(true);
    fetch(`${sever_url}/gain-losses`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.data?.length > 0) {
          setData(data?.data?.data);
          setStoredData(data?.data?.data);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useMemo(() => {
    if (permit) {
      refetch();
      setPermit(false);
    } else {
      return () => {};
    }
    return () => {};
  }, []);

  const handleFilter = async (index) => {
    setSelectedCountryIndex(index);
    setIsLoading(true);
    if (index === 0) {
      setData(storedData);
      setIsLoading(false);
    }
    if (index === 1) {
      const result = await storedData?.filter(
        (item) => item?.Country === "USA"
      );
      setData(result);
    }
    if (index === 2) {
      const result = await storedData?.filter(
        (item) => item?.Country !== "USA"
      );
      setData(result);
    }
    setIsLoading(false);
  };

  return (
    <div className="home py-14">
      <div className="max-w-[1620px] mx-auto px-6">
        <div className="country pb-10">
          <h2 className="text-2xl font-semibold capitalize text-[#191E29] pb-6">
            Country
          </h2>
          <ul>
            {countryName.map((countryData, index) => (
              <li key={index} className="pb-4 flex items-center gap-2">
                <input
                  id={countryData}
                  type="radio"
                  name="countrySelection"
                  checked={index === selectedCountryIndex}
                  onChange={() => handleFilter(index)}
                  className="mr-2 form-radio w-[14px] h-[14px] cursor-pointer appearance-none rounded-full border-2 border-gray-[#73C2FB] checked:bg-[#73C2FB] checked:border-transparent checked:ring-2 checked:ring-[#73C2FB] checked:ring-offset-2 checked:ring-opacity-50"
                />
                <label
                  htmlFor={countryData}
                  className="uppercase text-base font-semibold text-[#191E29] cursor-pointer"
                >
                  {countryData}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="font-bold text-2xl text-[#191E29] pb-10">
          Companies ranked by market cap gains and losses in billions USD
        </h2>
        <div className="table_wrapper">
          <div className="w-full shadow-customShadow rounded-[8px] bg-white">
            <div className="border-gray-200 w-full bg-white rounded-[8px] overflow-auto no_scrollbar max-h-[800px] ">
              <table className="w-full leading-normal no_scrollbar">
                <thead className="  px-6 py-4  hover:cursor-pointer uppercase ">
                  <tr>
                    <th
                      scope="col"
                      className="text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">No.</span>
                    </th>
                    <th
                      scope="col"
                      className="text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">Name</span>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("marketCap")}
                      className="whitespace-nowrap text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">Market Cap</span>
                      <div className="inline-block">
                        <div
                          className="filter-asc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            marginBottom: "1px",
                            borderBottom: "5px solid rgb(204, 204, 204)",
                          }}
                        ></div>
                        <div
                          className="filter-desc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "5px solid rgb(204, 204, 204)",
                            marginTop: "1px",
                          }}
                        ></div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">Industry</span>
                    </th>
                    <th
                      scope="col"
                      className="text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">Sector</span>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("oneDay")}
                      className="whitespace-nowrap text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">1 Day</span>
                      <div className="inline-block">
                        <div
                          className="filter-asc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            marginBottom: "1px",
                            borderBottom: "5px solid rgb(204, 204, 204)",
                          }}
                        ></div>
                        <div
                          className="filter-desc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "5px solid rgb(204, 204, 204)",
                            marginTop: "1px",
                          }}
                        ></div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("oneWeek")}
                      className="whitespace-nowrap text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">1 Week</span>
                      <div className="inline-block">
                        <div
                          className="filter-asc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            marginBottom: "1px",
                            borderBottom: "5px solid rgb(204, 204, 204)",
                          }}
                        ></div>
                        <div
                          className="filter-desc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "5px solid rgb(204, 204, 204)",
                            marginTop: "1px",
                          }}
                        ></div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("oneMonth")}
                      className="whitespace-nowrap text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">1 Month</span>
                      <div className="inline-block">
                        <div
                          className="filter-asc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            marginBottom: "1px",
                            borderBottom: "5px solid rgb(204, 204, 204)",
                          }}
                        ></div>
                        <div
                          className="filter-desc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "5px solid rgb(204, 204, 204)",
                            marginTop: "1px",
                          }}
                        ></div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("threeMonth")}
                      className="whitespace-nowrap text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">3 Months</span>
                      <div className="inline-block">
                        <div
                          className="filter-asc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            marginBottom: "1px",
                            borderBottom: "5px solid rgb(204, 204, 204)",
                          }}
                        ></div>
                        <div
                          className="filter-desc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "5px solid rgb(204, 204, 204)",
                            marginTop: "1px",
                          }}
                        ></div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("sixMonth")}
                      className="whitespace-nowrap text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">6 Months</span>
                      <div className="inline-block">
                        <div
                          className="filter-asc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            marginBottom: "1px",
                            borderBottom: "5px solid rgb(204, 204, 204)",
                          }}
                        ></div>
                        <div
                          className="filter-desc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "5px solid rgb(204, 204, 204)",
                            marginTop: "1px",
                          }}
                        ></div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("oneYear")}
                      className="whitespace-nowrap text-white text-base font-bold py-4 lg:py-8 px-6 bg-[#73C2FB] text-left capitalize "
                    >
                      <span className="pr-2">1 Year</span>
                      <div className="inline-block">
                        <div
                          className="filter-asc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            marginBottom: "1px",
                            borderBottom: "5px solid rgb(204, 204, 204)",
                          }}
                        ></div>
                        <div
                          className="filter-desc"
                          style={{
                            width: "0px",
                            height: "0px",
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "5px solid rgb(204, 204, 204)",
                            marginTop: "1px",
                          }}
                        ></div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((tableItem, index) => (
                    <tr
                      className="hover:bg-gray-100 hover:cursor-pointer"
                      key={index}
                    >
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p className="text-sm font-medium text-[#191E29]">
                          {index + 1}
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p className="text-sm font-medium text-[#191E29] uppercase">
                          {tableItem.Ticker}
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p
                          className={`${
                            tableItem["Market Cap"] <= 0
                              ? "text-[#EB0B0B]"
                              : "text-[#191E29]"
                          } text-sm font-medium `}
                        >
                          {parseFloat(tableItem["Market Cap"]).toFixed(2)} B
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p className="text-sm font-medium text-[#191E29]">
                          {tableItem.Industry}
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p className="text-sm font-medium text-[#191E29]">
                          {tableItem.Sector}
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p
                          className={`${
                            tableItem.oneDay <= 0
                              ? "text-[#EB0B0B]"
                              : "text-[#191E29]"
                          } text-sm font-medium `}
                        >
                          {tableItem.oneDay.toFixed(2)} B
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p
                          className={`${
                            tableItem.oneWeek <= 0
                              ? "text-[#EB0B0B]"
                              : "text-[#191E29]"
                          } text-sm font-medium `}
                        >
                          {tableItem.oneWeek.toFixed(2)} B
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p
                          className={`${
                            tableItem.oneMonth <= 0
                              ? "text-[#EB0B0B]"
                              : "text-[#191E29]"
                          } text-sm font-medium `}
                        >
                          {tableItem.oneMonth.toFixed(2)} B
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p
                          className={`${
                            tableItem.threeMonth <= 0
                              ? "text-[#EB0B0B]"
                              : "text-[#191E29]"
                          } text-sm font-medium `}
                        >
                          {tableItem.threeMonth.toFixed(2)} B
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p
                          className={`${
                            tableItem.sixMonth <= 0
                              ? "text-[#EB0B0B]"
                              : "text-[#191E29]"
                          } text-sm font-medium `}
                        >
                          {tableItem.sixMonth.toFixed(2)} B
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-3 lg:py-5 px-6 border-b border-gray-200">
                        <p
                          className={`${
                            tableItem.oneYear <= 0
                              ? "text-[#EB0B0B]"
                              : "text-[#191E29]"
                          } text-sm font-medium `}
                        >
                          {tableItem.oneYear.toFixed(2)} B
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {isLoading && (
                <div className="w-full h-[500px] flex justify-center items-center">
                  <FadeLoader color="#36d7b7" speedMultiplier={2} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
