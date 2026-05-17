import pandas as pd
import joblib

# Load trained model
model = joblib.load("blast_furnace_model.pkl")

# Example furnace input
sample_data = {
    "blast_temp_C": [1150],
    "coke_rate_kg_per_t": [380],
    "pci_rate_kg_per_t": [145],
    "air_flow_Nm3_min": [5100],
    "top_gas_pressure_bar": [2.3],
    "moisture_g_Nm3": [18],
    "ore_grade_pct": [63],
    "burden_index": [1.1],
    "fuel_rate_kg_per_t": [690],
    "efficiency_score": [42]
}

# Convert to DataFrame
input_df = pd.DataFrame(sample_data)

# Predict
prediction = model.predict(input_df)

print(f"Predicted Hot Metal Output: {prediction[0]:.2f} TPD")