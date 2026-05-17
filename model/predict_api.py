import sys
import json
import os
import pandas as pd
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

output_model = joblib.load(
    os.path.join(BASE_DIR, "blast_furnace_model.pkl")
)

efficiency_model = joblib.load(
    os.path.join(BASE_DIR, "efficiency_model.pkl")
)

input_data = json.loads(sys.argv[1])

# Remove efficiency if frontend accidentally sends it
input_data.pop("efficiency_score", None)

input_df = pd.DataFrame([input_data])

output_prediction = output_model.predict(input_df)[0]
efficiency_prediction = efficiency_model.predict(input_df)[0]

print(json.dumps({
    "predicted_output": round(float(output_prediction), 2),
    "predicted_efficiency": round(float(efficiency_prediction), 2)
}))