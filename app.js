const express = require("express");
const path = require("path");
const { PythonShell } = require("python-shell");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend"))); // ✅ Serve frontend

app.post("/predict", (req, res) => {
  const inputValues = Object.values(req.body);
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: __dirname,
    args: inputValues
  };

  PythonShell.run("predict_mushroom.py", options, function (err, results) {
    if (err) return res.send("Error occurred");

    const prediction = results[0];

    let resultHTML = `
      <div class="result-box">
        <h2>${prediction === "edible" ? "Yayyy! 🎉 It's edible!" : "Oops! ⚠️ It's poisonous!"}</h2>
        <p>${prediction === "edible" ? "Happy eating and enjoy!" : "Don't eat that. It's dangerous to your health!"}</p>
        <br>
        <button onclick="window.location.href='check-eligibility.html'">Go Back</button>
      </div>
    `;

    res.send(`
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          ${resultHTML}
        </body>
      </html>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
