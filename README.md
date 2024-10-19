
# Text-to-ASL

## Problem Statement 🤔

In today's digital world, effective communication is essential for everyone, yet individuals who are deaf or hard of hearing often face barriers due to the lack of widespread accessibility solutions. American Sign Language (ASL) serves as a crucial bridge for the deaf community, but many platforms and tools are not optimized to support seamless ASL communication. This creates a communication gap between hearing and non-hearing individuals in various scenarios, from daily conversations to online meetings and educational settings.

The ASL project aims to address this gap by developing an intuitive, real-time American Sign Language translation application. Leveraging Natural Language Processing (NLP) techniques and Unity for sign language interpretation, this project translates spoken or written text into ASL, helping break down communication barriers and enabling more inclusive interactions across platforms.

## Approach 🛠️

To solve the problem of communication barriers between hearing and non-hearing individuals, this project utilizes a combination of sign language animations, an avatar, and real-time integration with video conferencing software.

- **Sign Language Animations**: A series of pre-made American Sign Language (ASL) animations are mapped to common words and phrases. 🖐️
- **Avatar Integration**: An avatar is used to play these animations, visually interpreting the spoken or written words in ASL during a video conference. 🎭
- **Speech Recognition and Closed Captioning**: Speech recognition is employed to capture and transcribe the spoken words in real-time, creating a corresponding closed caption for each utterance. 🗣️
- **Backend Mapping**: The recognized words are sent to the backend, where they are mapped to the appropriate ASL animations. 🔄
- **Animation Playback**: Once mapped, the avatar plays the animations in sync with the utterances, providing a real-time ASL translation of the conversation. 🖥️

This seamless integration allows for more inclusive communication by offering live ASL interpretation in video conferencing settings. 💬

## Tech Stack ⚙️

This project utilizes a diverse set of technologies to deliver real-time American Sign Language (ASL) translation within a video conferencing platform:

- **Unity & Blender**: Unity is used for 3D rendering and animation of the avatar, with animations designed in Blender. The final application is exported using Unity WebGL for browser-based execution. 🎮
- **WebGL Integration**: The Unity WebGL build is integrated into the frontend, which is developed using React, enabling seamless playback of animations. 🔗
- **Sentence Transformers**: Sentence transformers are employed to intelligently map spoken or written words to the correct ASL animation triggers. 🧠
- **Backend Communication**: After the appropriate trigger is determined using the sentence transformers, it is sent to Unity WebGL, which controls the avatar animation and ensures it plays correctly in the frontend. 🔧

This tech stack provides the framework for smooth, real-time ASL translations, making video conferencing more accessible. 🌍

## Intel Optimizations ⚡

This project utilizes the **Intel Extension for PyTorch** to optimize model performance and reduce latency in playing ASL animations. The extension enhances PyTorch’s performance on Intel hardware, particularly by optimizing the inference speed of the Sentence Transformer model used for mapping spoken words to ASL animation triggers. Here's how it contributes to improving the system:

- **Intel Extension for PyTorch**: This extension is specifically designed to optimize PyTorch models for Intel architectures, providing substantial performance improvements without requiring any changes to the original model code. By using just-in-time (JIT) compilation, it ensures that the PyTorch model can run efficiently on Intel CPUs. 💻
  
- **Inference Optimization**: The extension accelerates the inference process of the Sentence Transformer model. It leverages optimizations like **vectorization** and **multi-threading** to make the most of Intel’s CPU architecture, allowing the model to process spoken words faster and map them to corresponding animation triggers in less time. 🚀

- **Reduced Latency**: By utilizing these optimizations, the extension reduces the latency between recognizing speech and playing the ASL animations. The faster the model can map words to triggers, the quicker the avatar responds, ensuring real-time feedback in the video conferencing environment. ⏱️

- **Ease of Integration**: The Intel Extension for PyTorch integrates seamlessly into the project, requiring minimal changes to the existing PyTorch codebase. This makes it an ideal solution for improving performance without overhauling the entire architecture. 🔄

In summary, by using the Intel Extension for PyTorch, the project experiences faster model inference, reduced latency in animation playback, and overall smoother real-time ASL translations in video conferencing software. 🎉

## Project Screenshots 📸

![Screenshot 2024-10-19 113053](https://github.com/user-attachments/assets/db41e1b6-08aa-47e4-a000-c0f0bd27dfdf)
![Screenshot 2024-10-19 113111](https://github.com/user-attachments/assets/98403fee-720f-47a2-b36c-f0b4a49d3e5d)
![Screenshot 2024-10-19 113143](https://github.com/user-attachments/assets/a81db057-c9fd-438c-a33c-33909c4f6bb5)
![Screenshot 2024-10-19 113157](https://github.com/user-attachments/assets/6460cbef-5dec-4c6e-8595-93a2a1b492e0)
![Screenshot 2024-10-19 113344](https://github.com/user-attachments/assets/97cdc254-7526-4110-a3a7-e7d553d3dfab)
![Screenshot 2024-10-19 113504](https://github.com/user-attachments/assets/0829fb7c-436d-429e-8a82-7ddd78b9f992)
