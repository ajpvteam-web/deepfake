import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models

print("Starting training...")

# Data preprocessing
train_datagen = ImageDataGenerator(rescale=1./255)

train_data = train_datagen.flow_from_directory(
    'dataset/train',
    target_size=(128,128),
    batch_size=8,
    class_mode='binary'
)
print("Class mapping:", train_data.class_indices)
# exit()
val_data = train_datagen.flow_from_directory(
    'dataset/valid',
    target_size=(128,128),
    batch_size=8,
    class_mode='binary'
)

print("Dataset loaded successfully!")

# CNN Model
model = models.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(128,128,3)),
    layers.MaxPooling2D(2,2),

    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D(2,2),

    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

print("Model compiled!")

# Training
print("before fit")
model.fit(train_data, epochs=4, validation_data=val_data)
print("after fit")
# Save model
model.save('model/deepfake_model.h5')

print("Model saved successfully!")