import io
from PIL import Image

from google.cloud import vision
from google.cloud.vision import types

# instantiante a client
vision_client = vision.ImageAnnotatorClient()

#name of image file to annotate
file_name ='480w_s.jpg'
#file_name = 'ikhlaq-sidhu-2015.png?itok=nMiTIQXV'
#file_name = 'pupr.png'
img = Image.open(file_name)
img.show()


# load image into memory
with io.open(file_name, 'rb') as image_file:
	content = image_file.read()
	image = types.Image(content=content)

# perform label detection on image file
response = vision_client.label_detection (image=image)
labels = response.label_annotations

# what does google api see?
print('\mLABELS:\n')
for label in labels:           # iterating over object
	print(label.description)

print('\n\n HOW COOL IS THAT!!!!!!\n\n')

# other attributes?
#print(dir(labels) + '\n\n')
#print(dir(label) + '\n\n')

