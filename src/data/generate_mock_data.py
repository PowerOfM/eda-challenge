import json
import math
from random import random
import uuid

# Load images generated from fetch_unsplash_images
mock_imgs = []
last_img_index = 0
with open('./mock-image-urls.json') as fp:
    mock_imgs = json.load(fp)

LAT_MIN = 48.9
LAT_MAX = 49.6
LNG_MIN = -122.0
LNG_MAX = -125.5

STEP = 0.04
ADJ_RNG = 0.01
RM_RNG = 0.3

# Split the area into a grid of similar sized rectangles
output = []
for i in range(math.floor((LAT_MAX - LAT_MIN)/STEP)):
    for j in range(math.floor((LNG_MAX - LNG_MIN)/-STEP)):
        # Skip x% of the time
        if (random() < RM_RNG):
            continue

        # Create bbox with random adjustment
        s = LAT_MIN + STEP * i + (random() * 2 * ADJ_RNG - ADJ_RNG)
        n = s + STEP + (random() * ADJ_RNG)
        w = LNG_MIN - STEP * j - (random() * 4 * ADJ_RNG - ADJ_RNG)
        e = w - STEP - (random() * ADJ_RNG)

        data = {"id": str(uuid.uuid4()), "bbox": [
            w, s, e, n], "url": mock_imgs[last_img_index]}
        last_img_index = (last_img_index + 1) % len(mock_imgs)
        output.append(data)

# Save as JSON array
with open('mock-data.json', 'w') as fp:
    json.dump(output, fp)
