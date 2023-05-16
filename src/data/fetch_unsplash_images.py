import requests
import json
import time
import os

PER_PAGE = 30  # max 30
MAX_PAGE = 10
UNSPLASH_KEY = os.getenv('UNSPLASH_KEY')
UNSPLASH_COLLECTION_ID = "1166960"

imgs = []
for page in range(1, MAX_PAGE + 1):
    print('Fetching page', page, end='...')
    res = requests.get(
        f'https://api.unsplash.com/collections/{UNSPLASH_COLLECTION_ID}/photos?per_page={PER_PAGE}&page={page}',
        headers={"Authorization": "Client-ID " + UNSPLASH_KEY})
    data = json.loads(res.text)

    for entry in data:
        imgs.append(entry["urls"]["thumb"])
    print(f' Loaded {len(data)} images.')

    # Throttle to prevent rate-limiting
    time.sleep(3)


with open('mock-image-urls.json', 'w') as fp:
    json.dump(imgs, fp)
