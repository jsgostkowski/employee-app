import React, { useState, useEffect } from "react";
import axios from "axios";

export const Employess = () => {
  const [employee, setEmployee] = useState<any>([]);
  const [records, setRecords] = useState(10);
  const [startId, setStartId] = useState(1);
  const [filteredResult, setFilteredResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadMore = () => {
    setRecords(records + 10);
  };
  const searchItems = (firstName: any) => {
    setSearchTerm(firstName);
    if (searchTerm !== "") {
      const filteredData = employee.filter((item: any) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredResults(filteredData);
      console.log(searchTerm);
      console.log(filteredData);
    } else {
      setFilteredResults(employee);
    }
  };
  useEffect(() => {
    axios
      .get(
        "https://hub.dummyapis.com/employee?noofRecords=" +
          records +
          "&idStarts=" +
          startId
      )
      .then((res) => {
        setEmployee(res.data);
        console.log(res.data);
      });
  }, [records]);

  return (
    <>
      <div>
        <input
          placeholder="search"
          onChange={(e) => searchItems(e.target.value)}
        ></input>

        {searchTerm.length > 1
          ? filteredResult.map((e: any) => {
              return (
                <div>
                  <ul key={e.id}>
                    <li>{e.firstName}</li>
                  </ul>
                </div>
              );
            })
          : employee.map((item: any) => {
              return (
                <ul key={item.id}>
                  <li>{item.firstName}</li>
                </ul>
              );
            })}
      </div>
      <button onClick={loadMore}>LodaMore</button>
    </>
  );
};
