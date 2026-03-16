import numpy as np, pandas as pd, joblib, os
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

class TrainModel:
    def __init__(self, data_path, model_path):
        self.data_path = data_path
        self.model_path = model_path

    def load_data(self):
        # Load the dataset
        self.data = pd.read_csv(self.data_path)
        # Select numeric columns for features
        numeric_cols = ['quantity_in_stock', 'reorder_threshold']
        self.X = self.data[numeric_cols]
        # Create target: 1 if needs reordering (quantity <= threshold), 0 otherwise
        self.y = (self.data['quantity_in_stock'] <= self.data['reorder_threshold']).astype(int)

    def train_model(self):
        # Scale the features
        scaler = StandardScaler()
        self.X = scaler.fit_transform(self.X)
        # Initialize the Random Forest Classifier
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        # Fit the model to the data
        self.model.fit(self.X, self.y)

    def save_model(self):
        # Save the trained model to disk
        joblib.dump(self.model, self.model_path)

    def run(self):
        self.load_data()
        self.train_model()
        self.save_model()

if __name__ == "__main__":
    data_path = "C:\\Users\\allen\\Downloads\\Career\\SIDE\\Apps\\Hackathon Apps\\SupplAI Wise\\ai-ml\\data\\ai_predictions.csv"
    model_path = "C:\\Users\\allen\\Downloads\\Career\\SIDE\\Apps\\Hackathon Apps\\SupplAI Wise\\ai-ml\\models\\inventory_model.pkl"
    trainer = TrainModel(data_path, model_path)
    trainer.run()