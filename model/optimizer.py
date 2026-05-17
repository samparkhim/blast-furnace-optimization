import pandas as pd
import joblib
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load models
output_model = joblib.load(
    os.path.join(BASE_DIR, "blast_furnace_model.pkl")
)

efficiency_model = joblib.load(
    os.path.join(BASE_DIR, "efficiency_model.pkl")
)

# Current furnace conditions
current_data = {
    "blast_temp_C": 1100,
    "coke_rate_kg_per_t": 420,
    "pci_rate_kg_per_t": 150,
    "air_flow_Nm3_min": 5000,
    "top_gas_pressure_bar": 2.2,
    "moisture_g_Nm3": 20,
    "ore_grade_pct": 62,
    "burden_index": 1.0,
    "fuel_rate_kg_per_t": 700
}

best_output = 0
best_config = None

# Optimization search
for temp in range(1050, 1251, 25):
    for coke in range(350, 451, 10):

        test_data = current_data.copy()

        test_data["blast_temp_C"] = temp
        test_data["coke_rate_kg_per_t"] = coke

        input_df = pd.DataFrame([test_data])

        predicted_output = output_model.predict(input_df)[0]

        if predicted_output > best_output:
            best_output = predicted_output
            best_config = test_data.copy()

# Predict optimized efficiency
optimized_df = pd.DataFrame([best_config])

optimized_efficiency = efficiency_model.predict(optimized_df)[0]

# Return JSON
print(json.dumps({
    "best_output": round(float(best_output), 2),
    "optimized_efficiency": round(float(optimized_efficiency), 2),
    "recommended_parameters": best_config
}))


