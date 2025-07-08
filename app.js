const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const filterSelect = document.getElementById('filter');
const captureBtn = document.getElementById('capture');
const outputDiv = document.getElementById('output');

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Camera access error:", err);
  });

// Live filter on video
filterSelect.addEventListener('change', () => {
  video.style.filter = filterSelect.value;
});

// Capture image with applied filter and white background
captureBtn.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // ✅ Add white background to avoid transparent patch
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Apply filter and draw image
  ctx.filter = filterSelect.value;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert to image URL
  const imageURL = canvas.toDataURL('image/png');

  // Clear previous image & download button
  outputDiv.innerHTML = '';

  // Create and show captured image
  const img = document.createElement('img');
  img.src = imageURL;
  img.alt = 'Captured Photo';
  img.style.width = '100%';
  img.style.marginTop = '15px';
  img.style.borderRadius = '10px';
  img.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
  outputDiv.appendChild(img);

  // Create and show download button
  const downloadBtn = document.createElement('a');
  downloadBtn.href = imageURL;
  downloadBtn.download = 'my-photo.png';
  downloadBtn.textContent = '⬇️ Download';
  downloadBtn.style.display = 'inline-block';
  downloadBtn.style.marginTop = '10px';
  downloadBtn.style.padding = '10px 20px';
  downloadBtn.style.backgroundColor = '#4a90e2';
  downloadBtn.style.color = 'white';
  downloadBtn.style.textDecoration = 'none';
  downloadBtn.style.borderRadius = '8px';
  downloadBtn.style.fontWeight = '600';
  downloadBtn.style.boxShadow = '0 5px 10px rgba(0,0,0,0.15)';
  outputDiv.appendChild(downloadBtn);
});
