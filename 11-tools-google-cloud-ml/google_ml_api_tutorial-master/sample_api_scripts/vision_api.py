#!/usr/bin/env python

import io
# sudo  pip -H  install --update  Pillow==5.2.0
from PIL import Image
from google.cloud import vision
from google.cloud.vision import types

# instantiate a client
vision_client = vision.ImageAnnotatorClient()

# images to annotate
img1_file = 'cat.png'
img2_file = 'sadpuppy_nocredits.png'
img3_file = 'pet-collage.jpg'
img4_file = 'yellow-chair.jpg'

# load and display images
img1 = Image.open(img1_file,'r')
img1
img2 = Image.open(img2_file,'r')
#img2.show()
img3 = Image.open(img3_file,'r')
#img3.show()
img4 = Image.open(img4_file,'r')
#img4.show()


# load image into memory
with io.open(img1_file, 'rb') as image_file:
	content = image_file.read()
	image = types.Image(content = content)

# label detection
response = vision_client.label_detection (image = image)
labels = response.label_annotations

# what does google vision api see?
print ('\nLABELS:\n')
for label in labels:
	print(label.description)


