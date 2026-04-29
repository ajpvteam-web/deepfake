import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping

print("Starting training...")

# ✅ Data augmentation (important)
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    zoom_range=0.2,
    horizontal_flip=True
)

val_datagen = ImageDataGenerator(rescale=1./255)

train_data = train_datagen.flow_from_directory(
    'dataset/train',
    target_size=(224,224),
    batch_size=16,
    class_mode='binary'
)

val_data = val_datagen.flow_from_directory(
    'dataset/valid',
    target_size=(224,224),
    batch_size=16,
    class_mode='binary'
)

print("Dataset loaded!")

# ✅ Pretrained base model
base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(224,224,3)
)

# Freeze base layers
base_model.trainable = False

# ✅ Custom head
x = base_model.output
x = layers.GlobalAveragePooling2D()(x)
x = layers.BatchNormalization()(x)
x = layers.Dense(128, activation='relu')(x)
x = layers.Dropout(0.5)(x)
output = layers.Dense(1, activation='sigmoid')(x)

model = models.Model(inputs=base_model.input, outputs=output)

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

print("Model ready!")

# ✅ Callbacks
checkpoint = ModelCheckpoint(
    'model/best_model.keras',
    monitor='val_accuracy',
    save_best_only=True,
    mode='max'
)

earlystop = EarlyStopping(
    monitor='val_loss',
    patience=3,
    restore_best_weights=True
)

# Training
model.fit(
    train_data,
    epochs=15,
    validation_data=val_data,
    callbacks=[checkpoint, earlystop]
)

# Optional fine-tuning (extra boost 🔥)
base_model.trainable = True

model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-5),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

print("Fine-tuning...")

model.fit(
    train_data,
    epochs=5,
    validation_data=val_data
)

# Save final
model.save('model/final_model.keras')

print("Done!")