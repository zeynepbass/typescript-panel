import React from "react";
import axios from "axios";
import { TodoType } from "./todo";

import TableTwo from "./TableTwo.js";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
const Table = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState<TodoType[]>([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [end, setEnd] = useState<any>({});

  const [newTodo, setNewTodo] = useState({
    kullaniciAd: "",
    kullaniciSoyad: "",
    kullaniciEmail: "",
    yasadigiSehir: "",
    adress: "",
    city: "",
    province: "",
    postaCode: "",
    planing: null,
  });

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setNewTodo({ ...newTodo, [name]: value });
  };
  const handleDateChange = (date:any) => {
   const formattedDate: any = format(date, "yyyy-MM-dd");
      
    setNewTodo({ ...newTodo, planing: formattedDate });


  };

  const [open, setOpen] = useState(false);

  // const cancelButtonRef =useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9363/post/panel");
      setData(response.data.slice(0, 5)); // slice işlemini burada gerçekleştirin
      console.log(data);
      
      const lastItem = response.data[response.data.length - 1]; // Son elemanı al
      setEnd(lastItem); // Inputlara yerleştir
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  });

  const handleCheckboxChange = async (e:any, id:number) => {
    const isChecked = e.target.checked;
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
    if (isChecked) {
      try {
        await axios.delete(`http://localhost:9363/post/panel/${id}`);
        // Silinen öğeyi filtreleyerek veriyi güncelle
        setData((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    }
  };

  const Click = () => {
    setOpen(true); // Formun temizlendiğini işaretlemek için setOpen(true) kullanılabilir
  };

  const handleFormSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9363/post/panel", {
        ...newTodo,
      });

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
          planing: null,
        });
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

  return (
    <>
      <form>
        <div className="grid grid-cols-1 p-4 bg-gray-800">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Personal Formation
            </h2>
            <p className="mt-1 text-sm leading-6 text-white">Finally, data.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6  text-white"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    value={end.kullaniciAd}
                    id="first-name"
                    className=" pl-1 bg-gray-800 text-gray-300 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6  text-white"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    value={end?.kullaniciSoyad}
                    id="last-name"
                    className=" pl-1 bg-gray-800 text-gray-300 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6  text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={end?.kullaniciEmail}
                    type="email"
                    className="  pl-1 bg-gray-800 text-gray-300 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 mt-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6  text-white"
                >
                  Country
                </label>
                <div className=" sm:col-span-1">
                  <input
                    id="email"
                    name="email"
                    value={end?.yasadigiSehir}
                    type="email"
                    className="  pl-1 bg-gray-800 text-gray-300 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
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
                    value={end?.adress}
                    className="
                 pl-1 bg-gray-800 text-gray-300
                block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-3 sm:col-start-1">
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
                    value={end?.city}
                    id="city"
                    className=" pl-1 bg-gray-800 text-gray-300 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={end?.province}
                    name="region"
                    id="region"
                    className="  pl-1 bg-gray-800 text-gray-300 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    value={end?.postaCode}
                    className=" pl-1 bg-gray-800 text-gray-300 block w-full rounded-md border-0 py-1.5 text-gray-800shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Planing Start
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    value= {new Date(end.createdAt).toLocaleString()}
                    className=" pl-1 bg-gray-800 text-gray-300 block w-full rounded-md border-0 py-1.5 text-gray-800shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="dark:bg-gray-800 w-100 h-8 col-span-5 ">
        <img
          src="./plus.png"
          width={30}
          height={30}
          className=" pr-2 cursor-pointer "
          style={{ float: "right" }}
          onClick={Click}
        ></img>
      </div>
      <div className="w-full md:max-w-full overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800 ">
        <thead className="text-xs text-gray-300 uppercase bg-white  dark:bg-gray-800 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
            <th scope="col" className="px-6 py-3">
              Firstname
            </th>
            <th scope="col" className="px-6 py-3">
              Lastname
            </th>

            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Operations
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <input
                  type="checkbox"
                  className={`mt-5 w-4 h-4 text-gray-300 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500`}
                  onChange={(e) => handleCheckboxChange(e, item._id)}
                />

                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-white"
                >
                  {item.kullaniciAd}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-white"
                >
                  {item.kullaniciSoyad}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-white"
                >
                  {item.kullaniciEmail}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-white"
                >
                  {item.yasadigiSehir}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-white"
                >
                  {item.planing !== null ?
                   new Date(item.planing).toLocaleString(): <h1>
                   not registered</h1>
                   }
                  
                </td>
                <td className="row px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-white">
                  <img
                    src="./view.png"
                    width={20}
                    height={20}
                    className="float-left pr-2 cursor-pointer"
                    onClick={() => Navigate(`/detail/${item._id}`)}
                  ></img>
                  <img
                    src="./edit.png"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  ></img>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          // initialFocus={cancelButtonRef}

          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 "
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-dark-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className=" sm:items-stretch">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="mt-2">
                          <form onSubmit={handleFormSubmit}>
                            <div className="space-y-12">
                              <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-white">
                                  Personal Information
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-white">
                                  Use a permanent address where you can receive
                                  mail.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="first-name"
                                      className="block text-sm font-medium leading-6 text-white"
                                    >
                                      First name
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        type="text"
                                        id="first-name"
                                        autoComplete="given-name"
                                        name="kullaniciAd"
                                        value={newTodo.kullaniciAd}
                                        onChange={handleInputChange}
                                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>

                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="last-name"
                                      className="block text-sm font-medium leading-6 text-white"
                                    >
                                      Last name
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        type="text"
                                        name="kullaniciSoyad"
                                        value={newTodo.kullaniciSoyad}
                                        id="last-name"
                                        autoComplete="family-name"
                                        onChange={handleInputChange}
                                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>

                                  <div className="sm:col-span-6">
                                    <label
                                      htmlFor="email"
                                      className=" block text-sm font-medium leading-6 text-white"
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
                                        autoComplete="email"
                                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>

                                  <div className="sm:col-span-7">
                                    <label
                                      htmlFor="country"
                                      className="block text-sm font-medium leading-6 text-white"
                                    >
                                      Country
                                    </label>
                                    <div className="mt-2 ">
                                      <select
                                        id="country"
                                        name="yasadigiSehir"
                                        value={newTodo.yasadigiSehir}
                                        onChange={handleInputChange}
                                        autoComplete="country-name"
                                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      >
                                        <option value="United States">
                                          United States
                                        </option>
                                        <option value="Canada">Canada</option>
                                        <option value="Mexico">Mexico</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-full">
                              <label
                                htmlFor="street-address"
                                className="block text-sm font-medium leading-6 text-white"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  id="street-address"
                                  name="adress"
                                  value={newTodo.adress}
                                  onChange={handleInputChange}
                                  className="pl-1  block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-white"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="city"
                                  value={newTodo.city}
                                  onChange={handleInputChange}
                                  className=" pl-1  block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="region"
                                className="block text-sm font-medium leading-6 text-white"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="province"
                                  value={newTodo.province}
                                  onChange={handleInputChange}
                                  className=" pl-1 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium leading-6 text-white"
                              >
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="number"
                                  name="postaCode"
                                  value={newTodo.postaCode}
                                  onChange={handleInputChange}
                                  className=" pl-1 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium leading-6 text-white"
                              >
                                Planning Date
                              </label>
                              <div className="mt-2">
                                <DatePicker
                                  selected={newTodo.planing}
                                  onChange={handleDateChange}
                                  className=" pl-1 block w-full  rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 
                                />
                              </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 float-end">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      exit the screen
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <TableTwo />
    </>
  );
};

export default Table;
