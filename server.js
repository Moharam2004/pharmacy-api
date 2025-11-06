const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const branches = [
  { name: "Nour Pharmacy - Smouha", lat: 31.200, lng: 29.932 },
  { name: "Nour Pharmacy - Maadi", lat: 29.960, lng: 31.270 },
  { name: "Nour Pharmacy - Heliopolis", lat: 30.090, lng: 31.320 },
   { name: "Nour Pharmacy - Sidi Bishr 1", lat: 31.240, lng: 30.000 },
   { name: "Nour Pharmacy - Miami 1", lat: 31.250, lng: 30.020 },
   { name: "Nour Pharmacy - Al-Asafra Bahri", lat: 31.255, lng: 30.035},
   { name: "Nour Pharmacy - Gianaclis", lat:31.218, lng: 29.965 },
   { name: "Nour Pharmacy - Moharram Bek", lat: 31.192, lng: 29.904 },
   { name: "Nour Pharmacy - El-Qabari", lat: 31.160, lng: 29.870 },
   { name: "Nour Pharmacy - Al-Mandara", lat: 31.270, lng: 30.060},
   { name: "Nour Pharmacy - Bakos", lat: 31.200, lng: 29.950 },
   { name: "Nour Pharmacy - El-Ameriya", lat: 30.930, lng: 29.740 },
   { name: "Nour Pharmacy - Nasr City", lat: 30.054, lng: 31.334 },
];

function getNearestBranch(lat, lng) {
  let nearest = null;
  let minDist = Infinity;
  for (const b of branches) {
    const dist = Math.sqrt((b.lat - lat) ** 2 + (b.lng - lng) ** 2);
    if (dist < minDist) {
      minDist = dist;
      nearest = b;
    }
  }
  return nearest;
}

app.post("/nearest-branch", (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) return res.status(400).json({ error: "Missing location" });

  const branch = getNearestBranch(lat, lng);
  res.json({ nearest: branch });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
