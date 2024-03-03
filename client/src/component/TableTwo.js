import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const TableTwo = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [dizi, setDizi] = useState([]);
  const [series, setSeries] = useState([]);
  const [serie, setSerie] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9363/post/panel");
      setTable(response.data);
      setData(response.data);
      
      // Kullanıcı adları ve posta kodlarını alarak options ve series'i güncelle
      const kullaniciAdListesi = response.data.map(item => item.planing);
      const veri=kullaniciAdListesi.length;
      const postaKodListesi = response.data.filter(item => item.planingEnd !== null);
      const data=postaKodListesi.length;
      const seriesData = [{ name: "planing end", data: [data] }];
      const serieData = [{ name: "planing start", data: [veri] }];

      setSeries(seriesData);
      setSerie(serieData);

      // dizi state'ini güncelle
      setDizi([...seriesData, ...serieData]);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ["",""] // Başlangıçta boş olarak ayarlayın, veriler geldiğinde güncellenecek
    }
  });



  return (
    <>
        <Chart
              options={options}
              series={dizi}
              type="bar"
              width="500"
            />
    </>
  );
};
export default TableTwo;
