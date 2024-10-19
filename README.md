# Text-to-ASL

## Problem Statement

In today's digital world, effective communication is essential for everyone, yet individuals who are deaf or hard of hearing often face barriers due to the lack of widespread accessibility solutions. American Sign Language (ASL) serves as a crucial bridge for the deaf community, but many platforms and tools are not optimized to support seamless ASL communication. This creates a communication gap between hearing and non-hearing individuals in various scenarios, from daily conversations to online meetings and educational settings.

The ASL project aims to address this gap by developing an intuitive, real-time American Sign Language translation application. Leveraging Natural Language Processing (NLP) techniques and Unity for sign language interpretation, this project translates spoken or written text into ASL, helping break down communication barriers and enabling more inclusive interactions across platforms.

## Approach

To solve the problem of communication barriers between hearing and non-hearing individuals, this project utilizes a combination of sign language animations, an avatar, and real-time integration with video conferencing software.

- **Sign Language Animations**: A series of pre-made American Sign Language (ASL) animations are mapped to common words and phrases.
- **Avatar Integration**: An avatar is used to play these animations, visually interpreting the spoken or written words in ASL during a video conference.
- **Speech Recognition and Closed Captioning**: Speech recognition is employed to capture and transcribe the spoken words in real-time, creating a corresponding closed caption for each utterance.
- **Backend Mapping**: The recognized words are sent to the backend, where they are mapped to the appropriate ASL animations.
- **Animation Playback**: Once mapped, the avatar plays the animations in sync with the utterances, providing a real-time ASL translation of the conversation.

This seamless integration allows for more inclusive communication by offering live ASL interpretation in video conferencing settings.

## Tech Stack

This project utilizes a diverse set of technologies to deliver real-time American Sign Language (ASL) translation within a video conferencing platform:

- **Unity & Blender**: Unity is used for 3D rendering and animation of the avatar, with animations designed in Blender. The final application is exported using Unity WebGL for browser-based execution.
- **WebGL Integration**: The Unity WebGL build is integrated into the frontend, which is developed using React, enabling seamless playback of animations.
- **Sentence Transformers**: Sentence transformers are employed to intelligently map spoken or written words to the correct ASL animation triggers.
- **Backend Communication**: After the appropriate trigger is determined using the sentence transformers, it is sent to Unity WebGL, which controls the avatar animation and ensures it plays correctly in the frontend.

This tech stack provides the framework for smooth, real-time ASL translations, making video conferencing more accessible.
