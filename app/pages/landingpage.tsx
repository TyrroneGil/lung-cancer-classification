import { MoveRight } from "lucide-react";

export default function LandingPage(){


    return(
        <>
        <div className="flex w-screen   h-min-screen items-center justify-center p-20 flex-col ">
            <p className="text-center"><span className="p-2 border rounded-full text-sm bg-blue-600 text-white border-transparent">Education Resource</span></p>
            <h1 className="text-center text-6xl font-bold my-4">Lung Disease Classification</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto text-center">
          Learn how artificial intelligence and machine learning help identify and classify lung diseases for better patient outcomes
        </p>
        <div className=" w-full flex justify-center-safe space-x-4">
            <button className=" w-auto p-3 py-2 text-2xl  bg-blue-500 text-white border-transparent rounded-[5px] hover:bg-blue-800"><a href="/home"><p className="flex justify-around items-center  w-full">Start Uploading <MoveRight /></p></a></button>
            <button className=" w-auto p-3 py-2 text-2xl  bg-white text-blue-700 border border-blue-700  rounded-[5px] "><a href="#diseases" className="flex justify-around items-center  w-full">Explore Diseases</a></button>
        </div>

        <div className="w-full flex justify-center-safe mt-10 space-x-5 ">
            <div className="card flex flex-col bg-white shadow-1xl p-8 border-blue-100 border-2 rounded-[15px] text-blue-700">
            <p className="text-center">15+</p>
            <p>Disease Types</p>
            </div>
            <div className="card flex flex-col bg-white shadow-1xl p-8 border-blue-100 border-2 rounded-[15px] text-blue-700">
            <p className="text-center">80%</p>
            <p>Accuracy</p>
            </div>
            <div className="card flex flex-col bg-white shadow-1xl p-8 border-blue-100 border-2 rounded-[15px] text-blue-700">
            <p className="text-center">AI-Powered</p>
            <p>Classification</p>
            </div>
        </div>

       
        </div>

         <section className="h-screen w-full bg-white" id="diseases">

        </section>
</>


        

    );
}