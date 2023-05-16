# EDA Frontend Challenge - Spatiotemporal Catalog Search

> Spatiotemporal Catalog Search User Interface

## Getting Started

This project is built using Node.js v18.5. To get started, clone this repository then run

- `npm install`
- `npm start`

## How it works

This app simulates viewing satellite images captured within a certain user-specified geographical area. A user can input the west, south, east and north extends of their desired region, and search for all images in the catalogue that fall within that region. To make things a bit easier, the user can also query by the current map bounds.

When the user clicks "Search", a blue-rectangle showing their define region is drawn, along with polygons representing the areas of all found images. The sidebar is also populated with all the found images. The app simulates an API call that searches through the catalogue to find images whose bounds overlap the query region. A user can also select an image from the sidebar to highlight its location on the map.

## Mock Data

The data is generated using a python file, which attempts to make a grid with randomly offset squares and certain squares omitted. The images are fetched from a collection of aerial photographs in unsplash (closest thing to I could find to satellite imagery that was quickly available). I used the ["Explore New Satellite Imagery"](https://earth.google.com/web/@45.50739315,21.28122162,240.70432364a,615760.89757696d,35y,0h,0t,0r/data=Ci4SLBIgOGQ2YmFjYjU2ZDIzMTFlOThiNTM2YjMzNGRiYmRhYTAiCGxheWVyc18w) page from Google Earth as a reference for this app.

## Libraries Used

Besides React and MapBox GL, the following is a list of libraries used in this project:

- Emotion: CSS-in-JS (required by Mantine)
- Mantine: UI framework
- ReactQuery: API calls and management
- Tabler: icon pack
- Vite: tooling & builder

## Original Challenge Text

This is the text from the original challenge document:

### Background

Earth observation satellites capture images that are associated with a location and time. A list of these images are stored in a catalog that can be used for find available images.

### Problem Statement

Design and implement a web-based UI that can be used to search for images that lie in a user-specified geographical area. The search results should be shown on map.

> (BONUS) Store and display the location as a rectangle or polygon instead of a point. A library like turfjs can be used to find intersections.

### Additional Information

- The search area can be specified as a bounding box, a list of four numbers representing west, south, east and north extents of a rectangle
- Locations of images at a minimum should be a point (latitude, longitude) but as a bonus can also be a rectangle or polygon
- You can generate a small list of test data in the catalog, storing images or links to images is not required
- Feel free to use packages that you are comfortable with, at EarthDaily we use the following:
  - React for components
  - Mapbox GL JS for maps

### Expected Outputs

- Code
- Documentation to configure and run the development environment

### Evaluation Criteria

- Does the code meet the requirements?
- Is the code well-structured and documented?
- How easily can the code be run by someone reading the assignment?

### Logistics

- Do not use any proprietary code for this assignment, unless they are in the public domain or you own the rights
- You are expected to spend a maximum of 4 hours of active effort on this assignment
- Please email the solution to EarthDaily Analytics as soon as it is available, and no later than the day before the next scheduled interview
