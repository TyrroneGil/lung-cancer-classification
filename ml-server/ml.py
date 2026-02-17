from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from lung import LungClassifier
from pydantic import BaseModel
import os
import csv

app = FastAPI()

class Feedback(BaseModel):
    imageName: str
    prediction: str
    accuracy: float
    isCorrect: bool

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

classifier = LungClassifier()
CSV_FILE = "feedback.csv"
UPLOAD_FOLDER = "../public/images"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
@app.post("/uploadImage")
async def uploadImage(image: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, image.filename)

    # Write file to public folder
    with open(file_path, "wb") as f:
        contents = await image.read()
        f.write(contents)

    result = classifier.predict(file_path)

    # Return the URL for React public access
    file_url = f"http://localhost:5173/{image.filename}"

    return {
        "prediction": result["predicted_class"],
        "accuracy": result["accuracy"],
        "imageUrl": file_url
    }

@app.post("/saveFeedback")
async def save_feedback(feedback: Feedback):
    file_exists = os.path.isfile(CSV_FILE)

    with open(CSV_FILE, mode="a", newline="") as f:
        writer = csv.writer(f)
        if not file_exists:
            # Write header if file does not exist
            writer.writerow(["Image", "Prediction", "Accuracy", "IsCorrect"])
        writer.writerow([feedback.imageName, feedback.prediction, feedback.accuracy, feedback.isCorrect])
    
    return {"status": "success"}

@app.get("/getFeedback")
async def get_feedback():
    if not os.path.isfile(CSV_FILE):
        return JSONResponse(content={"data": [], "message": "No feedback found"}, status_code=200)

    feedback_list = []

    with open(CSV_FILE, mode="r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Convert accuracy to float and isCorrect to bool
            feedback_list.append({
                "image": row.get("Image"),
                "prediction": row.get("Prediction"),
                "accuracy": float(row.get("Accuracy", 0)),
                "isCorrect": row.get("IsCorrect") == "True"
            })

    return {"data": feedback_list}