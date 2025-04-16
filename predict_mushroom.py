import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler

# Load the trained model
model = joblib.load("mushroom_model.pkl")

# Define the scaler (same one used during training)
scaler = StandardScaler()

# Input features (example: odor, gill-color, spore-print-color, ...)
# Change this to the values you get from the form
input_data = np.array([[1, 2, 3, 0, 1, 4, 0]])

# Standardize the input data
input_data_scaled = scaler.fit_transform(input_data)

# Predict using the model
prediction = model.predict(input_data_scaled)

# Display the result
if prediction == 1:
    print("Yay! The mushroom is edible. You’re safe to eat it!")
else:
    print("Oops! Don’t eat that. It’s poisonous and dangerous to your health!")

