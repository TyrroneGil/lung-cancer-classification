import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Container from "~/component/Container";
import NavigationBar from "~/component/NavigationBar";
import Card from "~/component/Card";
import Button from "~/component/Button";
import { useRef,useState } from "react";




export default function Home() {
const [image,setImage] = useState<string|Blob>('')
const [previewImage, setPreviewImage] = useState('')
const handleImageChange = (event:any)=>{
    const file = event?.target.files[0];
    if(file){
        setPreviewImage(URL.createObjectURL(file));
        setImage(file)
    }   
}

const handleSubmit = async()=>{
    const formData = new FormData();
    formData.append("image",image);
    const result = await fetch('http://localhost:8000/uploadImage',{
      method:'POST',
      body:formData
    })
    const response = await result.json()
    console.log(response)
}

  // 2. Function to handle the button click



    return(
        <Container>
            <div className="h-[20%] w-full flex items-center justify-center">
                Lung Disease Classification
            </div>
            <div className="h-[80%] w-full flex ">
                  <div className="  h-[100%] flex w-[50%] justify-center">
                <Card className="p-10 bg-white h-[90%] shadow-xl">
                    Upload Xray Image
                    <div className="border-dashed items-center hover:border-blue-400 border flex-col h-[90%] justify-center flex rounded-[15px] mt-4">
                        <div className="image h-3/4 w-3/4 border flex items-center justify-center rounded-xl">
                            <img src={previewImage == "" ? 'defualt-image.png' : previewImage} alt="" />                     
                        </div>
                        
                        {image === ''  ? (
                            <>
                             <input  className="file:border file:p-1 file:rounded-full file:bg-blue-400 file:text-white rounded-full border-blue-400 hover:file:bg-blue-200 hover:file:text-black   border p-1 m-1"  type="file" accept="image/*" onChange={handleImageChange} />
                            </>
                       
                        ) : (
                        <Button className="bg-blue-500 border-gray-50 hover:bg-blue-100 hover:text-black text-white rounded-[15px] w-[100px] h-[50px] mt-2" onClick={()=>{handleSubmit()}} >
                            Submit
                        </Button>
                        )}
                        
                    </div>
                </Card>
            </div>
           <div className="h-full flex w-1/2 justify-center">
  <Card className="p-6 bg-white h-[90%] w-full shadow-2xl rounded-2xl flex flex-col">
    
    {/* Title */}
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Classification History
    </h2>

    {/* Table Container */}
    <div className="overflow-y-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-sm text-left">
        
        {/* Table Header */}
        <thead className="bg-blue-50 text-gray-700 uppercase text-xs tracking-wider sticky top-0">
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Classification</th>
            <th className="px-6 py-3">Accuracy</th>
            <th className="px-6 py-3">Result</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200 bg-white">
          
          {/* Example Row */}
          <tr className="hover:bg-gray-50 transition duration-200">
            
            {/* Image */}
            <td className="px-6 py-4">
              <img
                src="/sample-spectrogram.png"
                alt="Spectrogram"
                className="w-16 h-16 object-cover rounded-lg shadow"
              />
            </td>

            {/* Classification */}
            <td className="px-6 py-4 font-medium text-gray-800">
              Murmur
            </td>

            {/* Accuracy */}
            <td className="px-6 py-4 w-48">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "87%" }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 mt-1 block">
                87%
              </span>
            </td>

            {/* Result Badge */}
            <td className="px-6 py-4">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                Needs Review
              </span>
            </td>

          </tr>

        </tbody>
      </table>
    </div>

  </Card>
</div>

            </div>
          
        </Container>
    );
}
