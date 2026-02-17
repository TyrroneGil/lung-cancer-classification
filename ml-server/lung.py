import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

class LungClassifier:
    def __init__(self):
        """
        Initialize the classifier with a saved model and class labels.
        """
        self.model_path = "lungClass.h5"
        self.class_labels = ["Cardiomegaly","Mass","Nodule","Pneumonia","Tuberculosis"]
        self.model = tf.keras.models.load_model(self.model_path)

    def preprocess_image(self, img_path, target_size=(224, 224)):
        """
        Load and preprocess an image for prediction.
        """
        img = image.load_img(img_path, target_size=target_size)
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0
        return img_array

    def predict(self, img_path):
        """
        Make a prediction on the given image and return percentages rounded to 2 decimals.
        """
        img_array = self.preprocess_image(img_path)
        predictions = self.model.predict(img_array)[0]

        predicted_index = np.argmax(predictions)
        predicted_label = self.class_labels[predicted_index]
        predicted_probability = round(float(predictions[predicted_index] * 100), 2)  # as percent

        # Build class probabilities dictionary as percent
        class_probabilities = {self.class_labels[i]: round(float(predictions[i] * 100), 2)
                               for i in range(len(self.class_labels))}

        return {
            "predicted_class": predicted_label,
            "accuracy": predicted_probability,  # in percent
            "class_probabilities": class_probabilities  # in percent
        }
