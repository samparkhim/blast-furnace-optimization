import pandas as pd

# Load dataset
df = pd.read_csv("../data/blast_furnace_data.csv")

# Fill missing values with mean
df.fillna(df.mean(), inplace=True)

# Check missing values again
print("\nMissing Values After Cleaning:")
print(df.isnull().sum())

# Save cleaned dataset
df.to_csv("../data/cleaned_blast_furnace_data.csv", index=False)

print("\nCleaned dataset saved successfully!")