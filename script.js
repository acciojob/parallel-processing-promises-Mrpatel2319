const outputDiv = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const button = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load an image and return a promise
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
}

// Function to handle the image download process
function downloadImages(images) {
  // Display loading spinner
  loadingDiv.style.display = "block";
  errorDiv.innerText = ""; // Clear previous errors
  outputDiv.innerHTML = ""; // Clear previous images

  // Use Promise.all to download all images in parallel
  Promise.all(images.map((image) => loadImage(image)))
    .then((loadedImages) => {
      // Hide the loading spinner
      loadingDiv.style.display = "none";

      // Display all the loaded images
      loadedImages.forEach((img) => {
        outputDiv.appendChild(img);
      });
    })
    .catch((error) => {
      // Hide the loading spinner
      loadingDiv.style.display = "none";

      // Display the error message
      errorDiv.innerText = error.message;
    });
}

// Add event listener to the button
button.addEventListener("click", () => {
  downloadImages(images);
});
