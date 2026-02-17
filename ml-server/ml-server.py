import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

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
