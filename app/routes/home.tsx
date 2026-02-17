import { useState, useEffect } from "react";
import Container from "~/component/Container";
import Card from "~/component/Card";
import Button from "~/component/Button";

export default function Home() {
  const [image, setImage] = useState<string | Blob>("");
  const [previewImage, setPreviewImage] = useState("");
  const [prediction, setPrediction] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const handleImageChange = (event: any) => {
    const file = event?.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
      setPrediction(null);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:8000/getFeedback");
      const data = await res.json();
      setHistory(data.data || []);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("image", image as Blob);
  const result = await fetch("http://localhost:8000/uploadImage", {
    method: "POST",
    body: formData,
  });
  const response = await result.json();

  setPrediction(response);
  setPreviewImage(response.imageUrl); // <-- Use the URL from backend
  setShowModal(true);
};


  const handleFeedback = async (isCorrect: boolean) => {
    console.log("User feedback:", isCorrect ? "Correct" : "Incorrect");

    if (prediction) {
      try {
        await fetch("http://localhost:8000/saveFeedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageName: (image as File)?.name || "unknown",
            prediction: prediction.prediction,
            accuracy: prediction.accuracy,
            isCorrect: isCorrect,
          }),
        });
        // Refresh history after saving
        fetchHistory();
      } catch (error) {
        console.error("Error sending feedback:", error);
      }
    }

    // reset states
    setShowModal(false);
    setPrediction(null);
    setImage("");
    setPreviewImage("");
  };

  return (
    <Container>
      {/* Header */}
      <div className="w-full py-6 text-center text-3xl font-bold text-gray-800">
        Lung Disease Classification
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Upload Card */}
        <div className="flex-1 flex justify-center">
          <Card className="p-6 bg-white w-1/2 shadow-2xl rounded-3xl transition-transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
              Upload X-ray Image
            </h2>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-3xl p-4 hover:border-blue-500 transition-all duration-300">
              <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden mb-4 shadow-inner">
                <img
                  src={previewImage || "/default-image.png"}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              {image === "" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:border file:p-2 file:rounded-full file:bg-blue-500 file:text-white hover:file:bg-blue-400 hover:file:text-black rounded-lg w-full"
                />
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl py-3 px-6 mt-2 w-full shadow-lg hover:shadow-xl transition-all"
                >
                  Submit
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* History Card */}
        <div className="flex-1 flex justify-center">
          <Card className="p-4 bg-white w-1/2 shadow-2xl rounded-3xl flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
              Classification History
            </h2>

            {/* Scrollable table container */}
            <div className="overflow-y-auto max-h-[500px] border-t border-gray-200 mt-2">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-blue-50 text-gray-700 uppercase text-xs tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Classification</th>
                    <th className="px-4 py-2">Accuracy</th>
                    <th className="px-4 py-2">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                        No feedback yet.
                      </td>
                    </tr>
                  )}

                  {history.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition duration-200">
                      <td className="px-4 py-2">
                        {/* Display the uploaded image if possible; fallback to a placeholder */}
                        <img
  src={`images/${item.image}` || "/default-image.png"}
  alt={item.prediction}
  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow cursor-pointer"
  onClick={() => setModalImage(item.image || "/default-image.png")}
/>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-800">
                        {item.prediction}
                      </td>
                      <td className="px-4 py-2 w-32">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.accuracy}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 mt-1 block">
                          {item.accuracy}%
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${item.isCorrect
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                            }`}
                        >
                          {item.isCorrect ? "Correct" : "Incorrect"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </Card>
        </div>
      </div>

{modalImage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-3xl shadow-2xl p-4 max-w-lg w-full relative">
      <button
        onClick={() => setModalImage(null)}
        className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full"
      >
        Close
      </button>
      <img
        src={`images/${modalImage}`}
        alt="Preview"
        className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
      />
    </div>
  </div>
)}
      {/* Modal */}
      
      {showModal && prediction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Prediction Result
            </h3>
            <p className="mb-4 text-gray-700">
              The model predicts:{" "}
              <span className="font-semibold text-blue-600">
                {prediction.prediction} {prediction.accuracy}%
              </span>
            </p>
            <p className="mb-4 text-gray-700">Is this prediction correct?</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleFeedback(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow-md"
              >
                Yes
              </Button>
              <Button
                onClick={() => handleFeedback(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow-md"
              >
                No
              </Button>
            </div>
            <Button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
