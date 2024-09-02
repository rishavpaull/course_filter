import React, { useEffect, useState } from "react";
import { apiUrl , filterData } from "./data";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

const App = () => {
  const [courses , setCourses] = useState(null);

  const[category , setCategory] = useState("All");

  const [loading , setLoading] = useState(true);

  const fetchdata = async () =>{
    setLoading(true);
    try{
      let res = await fetch(apiUrl);
      let output = await res.json();
      // console.log(output);
      setCourses(output.data);
      console.log(courses);
    }
    catch(error){
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  }
  
  useEffect( ()=>{
      fetchdata();
  } , [])

  return(
    <div className="flex flex-col min-h-screen bg-bgDark2">
      <div>
        <Navbar/>

      </div>

      <div className="bg-bgDark2">

        <div >
          <Filter filterdata = {filterData} category={category} setCategory={setCategory}></Filter>

        </div>

        <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
          {
            loading ? (<Spinner></Spinner>) : (<Cards courses={courses} category={category}></Cards>)
          }
        </div>

      </div>

      
    </div>
  )
};

export default App;
