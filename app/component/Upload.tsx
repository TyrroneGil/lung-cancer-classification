import Button from "./Button";
import { useState, useEffect } from "react";
import Card from "./Card";

export default function Upload() {
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
    setPreviewImage(response.imageUrl);
    setShowModal(true);
  };

  const handleFeedback = async (isCorrect: boolean) => {
    if (prediction) {
      try {
        await fetch("http://localhost:8000/saveFeedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageName: (image as File)?.name || "unknown",
            prediction: prediction.prediction,
            accuracy: prediction.accuracy,
            isCorrect,
          }),
        });

        fetchHistory();
      } catch (error) {
        console.error("Error sending feedback:", error);
      }
    }

    setShowModal(false);
    setPrediction(null);
    setImage("");
    setPreviewImage("");
  };

  return (
    <>
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10 text-center shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold">
          AI Lung Disease Classification
        </h1>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Upload chest X-ray images and receive AI-powered predictions
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* UPLOAD CARD */}
          <Card className="p-8 bg-white shadow-xl rounded-3xl border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Upload X-ray Image
            </h2>

            <div className="border-2 border-dashed border-blue-300 bg-blue-50/40 rounded-2xl p-6 transition hover:bg-blue-50">

              <div className="w-full h-72 flex items-center justify-center bg-white rounded-xl overflow-hidden shadow-inner border mb-6">
                <img
                  src={previewImage || "defualt-image.png"}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              {image === "" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
                />
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl shadow-lg hover:opacity-90 transition"
                >
                  Analyze Image
                </Button>
              )}
            </div>
          </Card>

          {/* HISTORY CARD */}
          <Card className="p-6 bg-white shadow-xl rounded-3xl border border-gray-100 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800">
              Classification History
            </h2>

            <div className="overflow-y-auto max-h-[500px] mt-6 rounded-xl border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-blue-50 sticky top-0 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Prediction</th>
                    <th className="px-4 py-3">Accuracy</th>
                    <th className="px-4 py-3">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-gray-400">
                        No history available.
                      </td>
                    </tr>
                  )}

                  {history.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <img
                          src={`images/${item.image}`}
                          alt={item.prediction}
                          className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                          onClick={() => setModalImage(item.image)}
                        />
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-800">
                        {item.prediction}
                      </td>

                      <td className="px-4 py-3 w-32">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.accuracy}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {item.accuracy}%
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            item.isCorrect
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

      {/* IMAGE PREVIEW MODAL */}
      {modalImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <button
              onClick={() => setModalImage(null)}
              className="mb-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <img
              src={`images/${modalImage}`}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* PREDICTION MODAL */}
      {showModal && prediction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Prediction Result
            </h3>

            <p className="text-gray-700 mb-4">
              The model predicts:
              <span className="block text-indigo-600 font-bold text-lg mt-2">
                {prediction.prediction} ({prediction.accuracy}%)
              </span>
            </p>

            <p className="mb-6 text-gray-600">
              Is this prediction correct?
            </p>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleFeedback(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
              >
                Yes
              </Button>
              <Button
                onClick={() => handleFeedback(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}