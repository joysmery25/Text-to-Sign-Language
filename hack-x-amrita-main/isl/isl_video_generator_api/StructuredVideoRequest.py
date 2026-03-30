from pydantic import BaseModel

class StructuredVideoRequest1(BaseModel):
    subject: str
    topic: str
    sub_topic: str
    content: str