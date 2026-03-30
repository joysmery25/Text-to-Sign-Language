import os
import uvicorn
import time
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sign_model import SignLanguageModel
from moviepy import VideoFileClip, concatenate_videoclips

# Global Lock
is_generating = False

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
GENERATED_DIR = os.path.join(BASE_DIR, "generated_videos")
os.makedirs(GENERATED_DIR, exist_ok=True)

app.mount("/generated_videos", StaticFiles(directory=GENERATED_DIR), name="generated_videos")

model = SignLanguageModel()

class VideoTopicRequest(BaseModel):
    topic: str

@app.get("/")
def root():
    return {"status": "online"}

@app.post("/generate-video")
def generate_video_simple(request: VideoTopicRequest):
    global is_generating
    if is_generating:
        return {"status": "busy", "message": "Server is busy rendering another video"}
    
    is_generating = True
    print(f"--- STARTING FAST GENERATION ---")
    
    clips = []
    try:
        # SPEED TRICK: Only process the first 2 sentences for instant results
        text = request.topic.split('.')
        sentences = [s.strip() for s in text if s.strip()][:2]
        
        for sentence in sentences:
            print(f"Processing: {sentence[:30]}...")
            sentence_clips = model.get_clips(sentence)
            if sentence_clips:
                clips.extend(sentence_clips)

        if not clips:
            return {"status": "failed", "message": "No signs found in dataset"}

        # Use a timestamped filename to force browser to refresh the video
        filename = f"out_{int(time.time())}.mp4"
        temp_path = os.path.join(BASE_DIR, filename)
        final_path = os.path.join(GENERATED_DIR, filename)

        print("Stitching and writing video...")
        final_clip = concatenate_videoclips(clips, method="chain")
        
        # Optimize for Windows speed
        final_clip.write_videofile(
            temp_path, 
            codec="libx264", 
            audio=False, 
            logger=None, 
            preset="ultrafast"
        )
        
        final_clip.close()
        for c in clips: c.close()

        if os.path.exists(temp_path):
            os.replace(temp_path, final_path)

        video_url = f"http://localhost:8000/generated_videos/{filename}"
        print(f"SUCCESS! URL: {video_url}")
        return {"status": "success", "video_url": video_url}

    except Exception as e:
        print(f"ERROR: {str(e)}")
        for c in clips: 
            try: c.close()
            except: pass
        return {"status": "error", "message": str(e)}
    finally:
        is_generating = False

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)