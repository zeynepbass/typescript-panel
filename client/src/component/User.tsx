import React, { useState, useEffect, useRef } from "react";
import { TodoType } from "./todoGrup";
import { Item } from "./Item";
import axios from "axios";
import Chart from "react-apexcharts";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const User = () => {
  const [newTodo, setNewTodo] = useState({
    kullaniciAd: "",
    group: "",
    is: "",
  });
  const [veri, setVeri] = useState<TodoType[]>([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [group, setGroup] = useState({
    group: "",
  });
  const handleChange = (event: any) => {
    setGroup({ ...group, [event.target.name]: event.target.value }); // Event objesinden alınan değerle state güncelleniyor
  };
  const handleCheckboxChange = async (e: any, id: number) => {
    e.preventDefault();
    const isChecked = e.target.checked;
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
    if (isChecked) {
      try {
        await axios.delete(`http://localhost:9363/item/panel/${id}`);

        setItem((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    }
  };
  const [search, setSearch] = useState("");
  const [ınput, setInput] = useState(false);
  const handleInputChange = (event: any) => {
    setNewTodo({ ...newTodo, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9363/grup/panel", {
        ...newTodo,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [open, setOpen] = useState(false);
  const [items, setItem] = useState<Item[]>([]);
  const cancelButtonRef = useRef(null);
  const [data, setData] = useState<TodoType[]>([]);

  const fetchData = async () => {
    try {
      const [postData, userData] = await Promise.all([
        await axios
          .get("http://localhost:9363/item/panel")
          .then((response) => response.data),
        await axios
          .get("http://localhost:9363/post/panel")
          .then((response) => response.data),
      ]);
      setItem(postData);
      setData(userData);
    } catch (error) {
      console.log(error);
    }
  };
  const Grup = async () => {
    try {
      const response = await axios.get("http://localhost:9363/grup/panel");
      setVeri(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    Grup();
  }, []);

  const Work = [
    { work: "Electronic Care" },
    { work: "Forklif" },
    { work: "Machine Care" },
  ];
  const groupHandle = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9363/item/panel", {
        ...group,
      });
      setGroup({
        group: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const dataİs = veri.filter((item) => item.is === "Electronic Care");
  const electronicCareGroups = veri
    .filter((item) => item.is === "Electronic Care")
    .map((item) => item.group);
  const kullnıcı = veri
    .filter((item) => item.is === "Electronic Care")
    .map((item) => item.kullaniciAd);
  const kullnıcıT = veri
    .filter((item) => item.is === "Machine Care")
    .map((item) => item.kullaniciAd);
  const machine = veri
    .filter((item) => item.is === "Machine Care")
    .map((item) => item.group);
  const forklif = veri
    .filter((item) => item.is === "Forklif")
    .map((item) => item.group);
  const kullnıcıF = veri
    .filter((item) => item.is === "Forklif")
    .map((item) => item.kullaniciAd);
  return (
    <>
      <div className="container gap-3  border  border-slate-400 ">
        <div className="grid md:grid-cols-12 gap-3 ">
          <div className="col-span-2 p-2">
            <div className="flex justify-between pt-3">
              <p className="text-cyan-50">Group</p>

              <div className="flex">
                <img
                  src="./edit.png"
                  width={30}
                  height={30}
                  className=" p-2 cursor-pointer "
                  style={{ float: "right" }}
                  onClick={() => setOpen(true)}
                ></img>
                <img
                  src="./plus.png"
                  width={30}
                  height={30}
                  className=" p-2 cursor-pointer "
                  style={{ float: "right" }}
                  onClick={() => setInput(!ınput)}
                ></img>
              </div>
            </div>

            <form onSubmit={groupHandle}>
              <div className="flex">
                <input
                  type="text"
                  name="group"
                  value={group.group}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 pl-1  text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    ınput ? "" : "hidden"
                  }`}
                />
                <button
                  type="submit"
                  className={`rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    ınput ? "" : "hidden"
                  }`}
                >
                  +
                </button>
              </div>
            </form>

            <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              {items.map((item) => {
                return (
                  <div className="flex flex-col pb-3" key={item.group}>
                    <div className=" flex ">
                      <input
                        type="checkbox"
                        className={`mt-5 w-4 h-4 text-gray-300 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500`}
                        onChange={(e) => handleCheckboxChange(e, item._id)}
                      />
                      <dt className=" mt-4 ml-2 text-gray-500 md:text-lg dark:text-gray-400">
                        {item.group}
                      </dt>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="col-span-8 bg-gray-700 p-3 h-screen">
            <div className="p-4 mt-4">
              <h1 className="text-2xl text-center font-semibold mb-6 text-gray-50">
                Package status
              </h1>
              <div className="container">
                <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
                  <div className="flex md:contents">
                    <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                      <div className="h-full w-6 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-700 pointer-events-none"></div>
                      </div>
                      <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-700 shadow text-center">
                        <i className="fas fa-check-circle text-white"></i>
                      </div>
                    </div>

                    <div className="bg-gray-700 col-start-4 col-end-12 p-4 text-white rounded-xl my-4 mr-auto shadow-md w-full">
                      <h3 className="font-semibold text-lg mb-1 text-white">
                        {electronicCareGroups.join(" " + ",")}
                      </h3>
                      <p
                        className="leading-tight text-justify w-full "
                        style={{ color: "#67e8f9" }}
                      >
                        Electronic Care
                      </p>
                    </div>
                  </div>
                  <div className="flex md:contents">
                    <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                      <div className="h-full w-6 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-700 pointer-events-none"></div>
                      </div>
                      <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-700 shadow text-center">
                        <i className="fas fa-check-circle text-white"></i>
                      </div>
                    </div>

                    <div className="bg-gray-700 col-start-4 col-end-12 p-4 text-white rounded-xl my-4 mr-auto shadow-md w-full">
                      <h3 className="font-semibold text-lg mb-1 text-white">
                        {machine.join(" " + ",")}
                      </h3>
                      <p
                        className="leading-tight text-justify w-full "
                        style={{ color: "#67e8f9" }}
                      >
                        Machine Care
                      </p>
                    </div>
                    <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                      <div className="h-full w-6 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-700 pointer-events-none"></div>
                      </div>
                      <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-700 shadow text-center">
                        <i className="fas fa-check-circle text-white"></i>
                      </div>
                    </div>
                    <div className="bg-gray-700 col-start-4 col-end-12 p-4 text-white rounded-xl my-4 mr-auto shadow-md w-full">
                      <h3 className="font-semibold text-lg mb-1 text-white">
                        {forklif.length > 0 ? (
                          forklif.join(", ")
                        ) : (
                          <h1>No Data</h1>
                        )}
                      </h3>
                      <p
                        className="leading-tight text-justify w-full "
                        style={{ color: "#67e8f9" }}
                      >
                        Forklif
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container overflow-y-scroll max-h-[20vh]  ">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-1">
                <div className=" ">
                  <div className="bg-gray-800 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal ">
                    <div className="mb-8">
                      <p className="text-sm text-gray-600 flex items-center">
                        <svg
                          className="fill-current text-gray-500 w-3 h-3 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                        </svg>
                      </p>
                      <div className="text-gray-900 font-bold text-xl mb-2">
                        {electronicCareGroups.join(" " + ",")}
                      </div>
                      <p className="text-gray-700 text-base">
                        {kullnıcı
                          .map(
                            (item) =>
                              item.charAt(0).toUpperCase() + item.slice(1)
                          )
                          .join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm">
                        <p className="text-gray-900 leading-none">
                          Electronic Care
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div className="bg-gray-800 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal max-h-[50vh]">
                    <div className="mb-8">
                      <p className="text-sm text-gray-600 flex items-center">
                        <svg
                          className="fill-current text-gray-500 w-3 h-3 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                        </svg>
                      </p>
                      <div className="text-gray-900 font-bold text-xl mb-2">
                        {machine.join(" " + ",")}
                      </div>
                      <p className="text-gray-700 text-base">
                        {kullnıcıT
                          .map(
                            (item) =>
                              item.charAt(0).toUpperCase() + item.slice(1)
                          )
                          .join(",")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm">
                        <p className="text-gray-900 leading-none">
                          Machine Care
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div className="bg-gray-800 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal max-h-[50vh]">
                    <div className="mb-8">
                      <p className="text-sm text-gray-600 flex items-center">
                        <svg
                          className="fill-current text-gray-500 w-3 h-3 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                        </svg>
                      </p>
                      <div className="text-gray-900 font-bold text-xl mb-2">
                        {forklif.length > 0 ? (
                          forklif.join(", ")
                        ) : (
                          <h1>No Data</h1>
                        )}
                      </div>
                      <p className="text-gray-700 text-base">
                        {kullnıcıF
                          .map(
                            (item) =>
                              item.charAt(0).toUpperCase() + item.slice(1)
                          )
                          .join(",")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm">
                        <p className="text-gray-900 leading-none">Forklif</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="dark:bg-gray-800 w-100 h-8 col-span-5 ">
              <div className="flex justify-between pt-3">
                <p className="text-cyan-50">Users</p>
                <img
                  src="./plus.png"
                  width={30}
                  height={30}
                  className=" p-2 cursor-pointer "
                  style={{ float: "right" }}
                  onClick={() => setOpen(true)}
                ></img>
              </div>
            </div>
            <ul className="list-none pr-3">
              <input
                type="text"
                name="search"

                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="block w-full rounded-md border-0 pl-1 mt-3 bg-gray-900 text-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search"
              />

              <ul role="list" className="divide-y divide-gray-700">
                {data
                  .filter((memory) => {
                    if (search === "") {
                      return true; // Eğer arama yoksa, tüm verileri göster
                    } else if (
                      memory.kullaniciAd
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return true; // Eğer arama kelimesi başlık içinde bulunuyorsa, o veriyi göster
                    } else {
                      return false; // Eğer arama kelimesi başlık içinde bulunmuyorsa, o veriyi filtrele
                    }
                  })
                  .map((item) => (
                    <li
                      className="flex justify-between gap-x-6 py-5"
                      key={item._id}
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          className="h-4 w-4 flex-none rounded-full bg-gray-50"
                          src="User-avatar.svg.png"
                          alt=""
                        />

                        <div className="min-w-0 flex-auto">
                          <p className="text-xs  leading-2 text-gray-100">
                            {item.kullaniciAd} {item.kullaniciSoyad}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </ul>
          </div>
        </div>
      </div>

      <Transition.Root show={open}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-gra-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          User Grouping
                        </Dialog.Title>
                        <div className="mt-2">
                          <form onSubmit={handleFormSubmit}>
                            <div className="space-y-12">
                              <div className="border-b border-gray-900/10 pb-12 ">
                                <p className="mt-1 text-sm leading-6 text-white">
                                  Add user workgroups and user mappings.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                  <div className="sm:col-span-7">
                                    <div>
                                      <select
                                        id="country"
                                        name="group"
                                        autoComplete="country-name"
                                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={newTodo.group}
                                        onChange={handleInputChange}
                                      >
                                        <option value="United States">
                                          Items
                                        </option>
                                        {items.map((item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={item.group}
                                            >
                                              {item.group}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="sm:col-span-7">
                                    <div>
                                      <select
                                        id="country"
                                        name="kullaniciAd"
                                        autoComplete="country-name"
                                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={newTodo.kullaniciAd}
                                        onChange={handleInputChange}
                                      >
                                        <option value="United States">
                                          Users
                                        </option>
                                        {data.map((item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={item.kullaniciAd}
                                            >
                                              {item.kullaniciAd}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="sm:col-span-7">
                                    <div>
                                      <select
                                        id="country"
                                        name="is"
                                        autoComplete="country-name"
                                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={newTodo.is}
                                        onChange={handleInputChange}
                                      >
                                        <option value="United States">
                                          Work
                                        </option>
                                        {Work.map((item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={item.work}
                                            >
                                              {item.work}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default User;
