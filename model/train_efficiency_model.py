import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load dataset
df = pd.read_csv("../data/cleaned_blast_furnace_data.csv")

# Features
X = df.drop(["hot_metal_tpd", "efficiency_score"], axis=1)

# Target
y = df["efficiency_score"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Save
joblib.dump(model, "efficiency_model.pkl")

print("Efficiency model trained successfully!")