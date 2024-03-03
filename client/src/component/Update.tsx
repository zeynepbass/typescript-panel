import React, { useEffect, useState } from "react";
import axios from "axios";
import { TodoType } from "./todo";
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
const Updated = () => {
  const { id } = useParams();

  const [newTodo, setNewTodo] = useState({
    kullaniciAd: "",
    kullaniciSoyad: "",
    kullaniciEmail: "",
    yasadigiSehir: "",
    adress: "",
    city: "",
    province: "",
    postaCode: "",
    planingEnd: null,
  });

  const fetchData = async () => {
    try {
      await axios
        .get(`http://localhost:9363/post/detay/${id}`)
        .then((response) => {
          setNewTodo(response.data);

        });
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, [id])

  const handleInputChange = (e:any) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value })

  }
  const handleDateChange = (date: any) => {
    const formattedDate: any = format(date, "yyyy-MM-dd");

    setNewTodo({ ...newTodo, planingEnd: formattedDate });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:9363/post/duzenle/${id}`, newTodo
        
      );

      if (response.status === 200) {
        setNewTodo({
          kullaniciAd: "",
          kullaniciSoyad: "",
          kullaniciEmail: "",
          yasadigiSehir: "",
          adress: "",
          city: "",
          province: "",
          postaCode: "",
          planingEnd: null,
        });
        Navigate("/")
      } else {
        console.error(
          "Failed to make POST request. Server responded with status:",
          response.status
        );
      }

    } catch (error) {
      console.log(error);
    }
  };
const Navigate=useNavigate();
  return (
    <>
 
        <div className="space-y-10 p-4 bg-gray-800">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Personal InhtmlFormation
            </h2>
            <p className="mt-1 text-sm leading-6 text-white">
              Use a permanent address where you can receive mail.
            </p>
            <form  onSubmit={handleFormSubmit}>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6  text-white"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="kullaniciAd"
                      onChange={handleInputChange}
                      value={newTodo.kullaniciAd}
                  
                      id="first-name"
                      className="block w-full rounded-md border-0 py-1.5 bg-gray-800 text-gray-400 pl-1 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6  text-white"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="kullaniciSoyad"
                      onChange={handleInputChange}
                      value={newTodo.kullaniciSoyad}
                    
                      id="last-name"
                      className="block w-full rounded-md border-0 py-1.5 bg-gray-800 text-gray-400 pl-1 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6  text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="kullaniciEmail"
                      value={newTodo.kullaniciEmail}
                      onChange={handleInputChange}
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 bg-gray-800 text-gray-400 pl-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6  text-white"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="yasadigiSehir"
                      value={newTodo.yasadigiSehir}
                      onChange={handleInputChange}
                      autoComplete="country-name"
                      className="  pl-1 bg-gray-800 text-gray-300  block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3 ">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6  text-white"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="adress"
                      value={newTodo.adress}
                      onChange={handleInputChange}
                      className="
                 pl-1 bg-gray-800 ring-gray-500
                block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>

                <div className="sm:col-span-3 ">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6  text-white"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      value={newTodo.city}
                      onChange={handleInputChange}
                      id="city"
                      className="block w-full rounded-md border-0 py-1.5 bg-gray-800 text-gray-400 pl-1 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6  text-white"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="province"
                      value={newTodo.province}
                      onChange={handleInputChange}
                      id="region"
                      className="block w-full rounded-md border-0 py-1.5 bg-gray-800 text-gray-400 pl-1 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postaCode"
                      value={newTodo.postaCode}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-1.5 bg-gray-800 text-gray-400 pl-1 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Quitting Job
                  </label>

                  <DatePicker
                    selected={newTodo.planingEnd}
                    onChange={handleDateChange}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 bg-gray-800 text-gray-400 pl-1 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="sm:col-span-1 w-full mt-8">
                  <button
               
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

    </>
  );
};

export default Updated;
