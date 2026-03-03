import type { Diseases } from "./type"


 export const Disease = [
   {
    name: "Atelectasis",
    description: "Atelectasis is the partial or complete collapse of a lung or a section (lobe) of a lung, leading to reduced or absent gas exchange.",
    commonsymptoms: [
        "Shortness of breath",
        "Rapid breathing",
        "Chest pain",
        "Cough",
        "Low oxygen saturation"
    ]
},
{
    name: "Cardiomegaly",
    description: "Cardiomegaly refers to an enlarged heart, usually detected through chest imaging, and is often a sign of an underlying heart condition.",
    commonsymptoms: [
        "Shortness of breath",
        "Fatigue",
        "Swelling in legs or ankles",
        "Irregular heartbeat",
        "Chest discomfort"
    ]
},
{
    name: "Emphysema",
    description: "Emphysema is a chronic lung condition where the air sacs (alveoli) are damaged, causing difficulty in breathing and reduced oxygen exchange.",
    commonsymptoms: [
        "Chronic cough",
        "Shortness of breath",
        "Wheezing",
        "Chest tightness",
        "Frequent respiratory infections"
    ]
},
{
    name: "Mass",
    description: "A lung mass is an abnormal growth in the lung that is larger than 3 cm and may be benign or malignant.",
    commonsymptoms: [
        "Persistent cough",
        "Chest pain",
        "Unexplained weight loss",
        "Coughing up blood",
        "Shortness of breath"
    ]
},
{
    name: "Nodule",
    description: "A lung nodule is a small, round or oval-shaped growth in the lung, usually less than 3 cm in size, which may be benign or malignant.",
    commonsymptoms: [
        "Often asymptomatic",
        "Persistent cough",
        "Chest discomfort",
        "Shortness of breath"
    ]
},
{
    name: "Pneumonia",
    description: "Pneumonia is an infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus.",
    commonsymptoms: [
        "Fever",
        "Cough with phlegm",
        "Shortness of breath",
        "Chest pain when breathing",
        "Fatigue"
    ]
},
{
    name: "Pneumothorax",
    description: "Pneumothorax is a condition where air enters the space between the lung and chest wall, causing the lung to collapse.",
    commonsymptoms: [
        "Sudden chest pain",
        "Shortness of breath",
        "Rapid heart rate",
        "Fatigue",
        "Bluish skin (in severe cases)"
    ]
}

] satisfies Diseases[]