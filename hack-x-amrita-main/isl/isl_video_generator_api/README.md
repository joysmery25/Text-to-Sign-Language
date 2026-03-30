
# ISL Video Generator API

## Overview
This FastAPI project generates Indian Sign Language (ISL) videos from input text using NLP-based keyword extraction and video stitching.

---

## Project Structure

isl_video_generator_api/
│
├── main.py
├── sign_model.py
├── requirements.txt
├── sign_videos/   (Place your ISL word videos here)
└── README.md

---

## Setup Instructions

### 1. Create Virtual Environment (Optional)
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

### 2. Install Dependencies
pip install -r requirements.txt
python -m spacy download en_core_web_sm

### 3. Add ISL Videos
Place your word-level ISL videos inside:
sign_videos/

Example:
sign_videos/
    energy.mp4
    physics.mp4
    chemistry.mp4

### 4. Run Server
uvicorn main:app --host 0.0.0.0 --port 8080 --reload

---

## API Endpoint

POST http://localhost:8080/generateVideo

### Request Body (JSON)
{
    "text": "Energy is studied in physics"
}

### Response
{
    "message": "Video generated successfully",
    "output_file": "output_sign_video.mp4"
}

---

## Swagger UI
After running the server, open:
http://localhost:8080/docs

---

## Notes
- Ensure sign_videos folder exists.
- Video filenames must match keyword names.
- Expand dictionary to improve coverage.
