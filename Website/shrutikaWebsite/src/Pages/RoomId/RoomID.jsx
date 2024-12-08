import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCabinetData } from "../../service/cabinetServices/cabinetServices";
import { Link } from "react-router-dom";
const RoomID = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [cabinetData, setCabinetData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCabinetData = async () => {
      setLoading(true);
      try {
        let response = await getCabinetData(id);
        setLoading(false);
        setCabinetData(response.data || []);
      } catch (err) {
        setError(true);
        console.log("ERROR COMING FROM CABINET DATA", err);
      }
    };
    if (id) {
      fetchCabinetData();
    }
  }, [id]);

  console.log("cabinetData", cabinetData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className=" mx-auto gap-8  flex justify-center items-center h-screen">
      {/* <h1>Room {id}</h1> */}
      {cabinetData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4">
          {cabinetData.map((cabinet, index) => (
            <Link key={index} to={`/cabinate/${cabinet._id}`}>
              <div className="p-4 border rounded-lg active:bg-green-400 transition-all duration-300 bg-lime-400 cursor-pointer">
                <h2 className="text-center font-semibold">
                  {cabinet.cabinetName}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No cabinets found</p>
      )}
    </div>
  );
};

export default RoomID;
