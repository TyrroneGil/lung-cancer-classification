import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import csv
app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "../public"  # Points to your React public folder
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

class Feedback(BaseModel):
    imageName: str
    prediction: str
    accuracy: float
    isCorrect: bool

CSV_FILE = "feedback.csv"

@app.post("/uploadImage")
async def uploadImage(image: UploadFile = File(...)):
    
    file_path = os.path.join(UPLOAD_FOLDER, image.filename)

    with open(file_path, "wb") as f:
        contents = await image.read()
        f.write(contents)

    print("Saved as:", file_path)

    return {
        "filename": image.filename,
        "saved_path": file_path
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
