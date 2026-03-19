// Certificate data
import type { ImageMetadata } from 'astro';

import html5Cert from '../assets/certificates/Zahid_Hasan_Introduction_to_HTML5_Certificate.png';
import cppCert from '../assets/certificates/Zahid_Hasan_Cpp_For_C_Programmers_Certificate.png';
import pythonEverybodyCert from '../assets/certificates/Zahid_Hasan_Programming_for_Everybody_Python_Certificate.png';
import pythonDataStructuresCert from '../assets/certificates/Zahid_Hasan_Python_Data_Structures_Certificate.png';
import tensorflowIntroCert from '../assets/certificates/Zahid_Hasan_Introduction_to_TensorFlow_Certificate.png';
import tensorflowCnnCert from '../assets/certificates/Zahid_Hasan_CNN_in_TensorFlow_Certificate.png';
import hfAgentsExcellenceCert from '../assets/certificates/Zahid_Hasan_Hugging_Face_Agents_Excellence_Certificate.png';
import semrushSeoCert from '../assets/certificates/Zahid_Hasan_Semrush_SEO_Crash_Course_Certificate.png';
import agenticAiCert from '../assets/certificates/Zahid_Hasan_Agentic_AI_Certificate.png';
import hfAgentsFundamentalsCert from '../assets/certificates/Zahid_Hasan_Hugging_Face_Fundamentals_of_Agents_Certificate.png';
import kaggleGenAiCert from '../assets/certificates/Zahid_Hasan_Kaggle_5_Day_Gen_AI_Intensive_Certificate.png';

export interface Certificate {
    title: string;
    issuer: string;
    date: string;
    image: ImageMetadata;
    verifyUrl?: string;
    alt?: string;
}

export const certificates: Certificate[] = [
    {
        title: 'Agentic AI',
        issuer: 'DeepLearning.AI',
        date: 'October 2025',
        image: agenticAiCert,
        verifyUrl: 'https://learn.deeplearning.ai/certificates/782',
        alt: 'Agentic AI Course Certificate awarded to Zahid Hasan by DeepLearning.AI',
    },
    {
        title: 'Fundamentals of Agents',
        issuer: 'Hugging Face',
        date: 'February 2025',
        image: hfAgentsFundamentalsCert,
        alt: 'Fundamentals of Agents Course Certificate awarded to Md. Zahid Hasan by Hugging Face',
    },
    {
        title: 'Hugging Face Agents Course (Excellence)',
        issuer: 'Hugging Face',
        date: 'May 2025',
        image: hfAgentsExcellenceCert,
        alt: 'Certificate of Excellence for Hugging Face Agents Course awarded to Md. Zahid Hasan',
    },
    {
        title: '5-Day Gen AI Intensive',
        issuer: 'Kaggle',
        date: 'April 2025',
        image: kaggleGenAiCert,
        alt: 'Kaggle 5-Day Gen AI Intensive Badge earned by Zahid Hasan',
    },
    {
        title: 'Convolutional Neural Networks in TensorFlow',
        issuer: 'DeepLearning.AI',
        date: 'March 2022',
        image: tensorflowCnnCert,
        verifyUrl: 'https://coursera.org/verify/XUA2GL6NAEAS',
        alt: 'Convolutional Neural Networks in TensorFlow Course Certificate awarded to Md. Zahid Hasan by DeepLearning.AI',
    },
    {
        title: 'Introduction to TensorFlow for AI, ML, and Deep Learning',
        issuer: 'DeepLearning.AI',
        date: 'March 2022',
        image: tensorflowIntroCert,
        verifyUrl: 'https://coursera.org/verify/JB9Q866LD23U',
        alt: 'Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning Certificate awarded to Md. Zahid Hasan by DeepLearning.AI',
    },
    {
        title: 'Python Data Structures',
        issuer: 'University of Michigan',
        date: 'July 2020',
        image: pythonDataStructuresCert,
        verifyUrl: 'https://coursera.org/verify/6GV86G3BWZMA',
        alt: 'Python Data Structures Course Certificate awarded to Md. Zahid Hasan by University of Michigan',
    },
    {
        title: 'Programming for Everybody (Getting Started with Python)',
        issuer: 'University of Michigan',
        date: 'June 2020',
        image: pythonEverybodyCert,
        verifyUrl: 'https://coursera.org/verify/H3DTFJB5JZY7',
        alt: 'Programming for Everybody (Getting Started with Python) Course Certificate awarded to Md. Zahid Hasan by University of Michigan',
    },
    {
        title: 'C++ For C Programmers, Part A',
        issuer: 'University of California, Santa Cruz',
        date: 'June 2020',
        image: cppCert,
        verifyUrl: 'https://coursera.org/verify/9UW3R2FEMCVS',
        alt: 'C++ For C Programmers, Part A Course Certificate awarded to Md. Zahid Hasan by University of California, Santa Cruz',
    },
    {
        title: 'Introduction to HTML5',
        issuer: 'University of Michigan',
        date: 'June 2020',
        image: html5Cert,
        verifyUrl: 'https://coursera.org/verify/LETRWQSWV4BN',
        alt: 'Introduction to HTML5 Course Certificate awarded to Md. Zahid Hasan by University of Michigan',
    },
    {
        title: 'Semrush SEO Crash Course with Brian Dean',
        issuer: 'Semrush Academy',
        date: 'February 2025',
        image: semrushSeoCert,
        alt: 'Semrush SEO Crash Course with Brian Dean Certificate awarded to Md. Zahid Hasan',
    },
];