import os
import spacy
import difflib
import logging
from moviepy import VideoFileClip, concatenate_videoclips

# Configure logging for missing words
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)

class SignLanguageModel:
    def __init__(self):
        self.video_folder = r"C:\Users\ADILAKSHMI\Downloads\archive (1)\dataset\SL"
        self.nlp = spacy.load("en_core_web_sm")
        self.available_words = set(os.listdir(self.video_folder)) if os.path.exists(self.video_folder) else set()

    def preprocess_text(self, text):
        return text.lower()

    def extract_keywords(self, text):
        doc = self.nlp(text)
        return [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]

    def fetch_video_clips(self, keywords):
        clips = []
        # Optimization: Limit total clips to 12 for a smooth, fast-loading video
        for word in keywords[:12]: 
            word_folder = os.path.join(self.video_folder, word)
            if word not in self.available_words:
                closest = difflib.get_close_matches(word, self.available_words, n=1, cutoff=0.6)
                if closest:
                    word_folder = os.path.join(self.video_folder, closest[0])
                else:
                    continue

            if os.path.exists(word_folder):
                for file in os.listdir(word_folder):
                    if file.endswith(".mp4"):
                        try:
                            # Use smaller buffering for faster loading
                            clip = VideoFileClip(os.path.join(word_folder, file))
                            clips.append(clip)
                            break
                        except:
                            continue
        return clips

    def get_clips(self, text):
        return self.fetch_video_clips(self.extract_keywords(self.preprocess_text(text)))

    def generate_video(self, clips, output_path):
        """
        Generate video from clips by concatenating sequentially (no overlay).
        
        Key Points:
        - Clips are processed in order and appended to list (no manual positioning)
        - No CompositeVideoClip used
        - No set_start() calls
        - Simple sequential concatenation with method="compose"
        - Debug prints show clip durations to verify sequence
        
        Returns:
        - True if video generated successfully
        - Raises ValueError if no valid clips available
        """
        if not clips:
            logger.warning("No clips provided to generate_video()")
            raise ValueError("No clips provided")

        TARGET_FPS = 24
        TARGET_HEIGHT = 720
        MIN_CLIP_DURATION = 0.1
        processed_clips = []
        skipped_count = 0

        print("\n=== VIDEO GENERATION DEBUG ===")
        print(f"Total input clips: {len(clips)}")

        try:
            for idx, clip in enumerate(clips):
                try:
                    # Validate clip exists
                    if clip is None:
                        logger.warning(f"Clip {idx}: Skipped (None object)")
                        skipped_count += 1
                        continue
                    
                    # Validate duration
                    if not hasattr(clip, 'duration') or clip.duration is None:
                        logger.warning(f"Clip {idx}: Skipped (no duration)")
                        skipped_count += 1
                        try:
                            clip.close()
                        except:
                            pass
                        continue
                    
                    # Skip zero-length clips
                    if clip.duration < MIN_CLIP_DURATION:
                        logger.warning(f"Clip {idx}: Skipped (duration {clip.duration}s < {MIN_CLIP_DURATION}s)")
                        skipped_count += 1
                        try:
                            clip.close()
                        except:
                            pass
                        continue
                    
                    # Set FPS for consistency
                    normalized = clip.set_fps(TARGET_FPS)
                    
                    # Resize to consistent height (maintains aspect ratio)
                    resized = normalized.resize(height=TARGET_HEIGHT)
                    
                    # Validate final clip
                    if not hasattr(resized, 'duration') or resized.duration < MIN_CLIP_DURATION:
                        logger.warning(f"Clip {idx}: Skipped (post-processing validation failed)")
                        skipped_count += 1
                        try:
                            resized.close()
                        except:
                            pass
                        continue
                    
                    # Add to list for sequential concatenation
                    processed_clips.append(resized)
                    
                    # DEBUG: Print clip duration and resolution
                    print(f"Clip {idx}: Added | Duration: {resized.duration:.3f}s | Resolution: {resized.w}x{resized.h}")
                    
                except Exception as e:
                    # Continue pipeline on any error
                    logger.warning(f"Clip {idx}: Skipped (error: {str(e)[:50]})")
                    skipped_count += 1
                    try:
                        clip.close()
                    except:
                        pass
                    continue

            # Ensure at least one valid clip exists
            if not processed_clips:
                logger.error(f"Cannot generate video: all {len(clips)} clips were skipped or invalid")
                raise ValueError("No valid clips could be processed. Verify dataset and clip integrity.")

            logger.info(f"Processing complete: {len(processed_clips)}/{len(clips)} clips processed ({skipped_count} skipped)")
            print(f"Processed clips: {len(processed_clips)}")
            print(f"Skipped clips: {skipped_count}")

            # Concatenate clips sequentially without overlay
            # method="compose" stacks clips without animation timing
            print("\nConcatenating clips sequentially...")
            final_clip = concatenate_videoclips(processed_clips, method="compose")

            # Ensure final video has correct FPS
            final_clip = final_clip.set_fps(TARGET_FPS)

            # DEBUG: Print final video duration
            print(f"Final video duration: {final_clip.duration:.3f}s")
            print(f"Final video resolution: {final_clip.w}x{final_clip.h}")

            # Create output directory if needed
            output_dir = os.path.dirname(output_path)
            if output_dir and not os.path.exists(output_dir):
                os.makedirs(output_dir, exist_ok=True)

            # Export video with simple settings
            print(f"\nExporting to: {output_path}")
            final_clip.write_videofile(
                output_path,
                codec="libx264",
                fps=TARGET_FPS,
                bitrate="5000k",
                audio=False
            )

            logger.info(f"Video successfully generated: {output_path}")
            print(f"✓ Video export complete!")
            print("=== DEBUG END ===\n")

            # Cleanup final clip
            try:
                final_clip.close()
            except:
                pass
            
            return True

        except ValueError as ve:
            logger.error(f"Video generation failed: {str(ve)}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise

        finally:
            # Cleanup all processed clips
            for c in processed_clips:
                try:
                    c.close()
                except:
                    pass
            
            # Cleanup original clips
            for c in clips:
                try:
                    c.close()
                except:
                    pass