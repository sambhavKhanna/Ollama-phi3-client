from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from diffusers import DiffusionPipeline
import torch
app = Flask(__name__)
CORS(app)

pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16, use_safetensors=True, variant="fp16")
pipe.to("cuda")

# if using torch < 2.0
# pipe.enable_xformers_memory_efficient_attention()


@app.get("/image-gen")
def generate_image():
    prompt = request.headers.prompt
    images = pipe(prompt=prompt).images[0]
    return jsonify({ 'image': images })

if __name__ == '__main__':  
   app.run()
