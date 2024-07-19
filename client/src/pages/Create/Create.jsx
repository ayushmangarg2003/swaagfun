import React, { useState } from "react";
import preview from "../../assets/preview.png";
import FormField from "../../components/FormFeild/FormFeild";
import Loader from "../../components/Loader/Loader";
import "./Create.css"
import { surpriseMePrompts } from "../../utils/constants";
import {
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react'
import axios from 'axios';

const Create = () => {

    const steps = [
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
    ]


    const [first, setFirst] = useState(true)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [fourth, setFourth] = useState(false)

    const [step, setStep] = useState(0)

    function changeStep() {
        setStep(step + 1)
        if (step == 0) {
            setFirst(false)
            setSecond(true)
        }
        if (step == 1) {
            setSecond(false)
            setThird(true)
        }
        if (step == 2) {
            setThird(false)
            setFourth(true)
        }
    }

    const getRandomPrompt = (prompt) => {
        const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
        const randomPrompt = surpriseMePrompts[randomIndex];
        if (randomPrompt === prompt) return getRandomPrompt(prompt)
        return randomPrompt;
    };

    const [promt, setPrompt] = useState("")
    const [form, setForm] = useState({
        prompt: promt,
        photo: "",
    });


    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                //Using AXIOS
                const response = await axios.post(
                    'http://localhost:8080/api/v1/dalle',
                    // 'https://swaagfun.onrender.com/api/v1/dalle',
                    { prompt: form.prompt },
                );
                setForm({ ...form, photo: `data:image/jpeg;base64,${response.data.photo}` })
            } catch (error) {
                alert(error);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please Enter a Prompt')
        }
    }


    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt })
    }


    return (
        <section className="create-parent">
            <div>
                <h1 className="create-heading">
                    Create
                </h1>
                <p className="create-title">
                    Create imaginative and visually stunning
                    images using AI and share them with community
                </p>
            </div>
            <Stepper index={step}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0'>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>

            <div className="create-form">
                {
                    first ?
                        <><FormField
                            labelname="Your Prompt"
                            type="text"
                            name="prompt"
                            placeholder="A Fish riding a horse with wings"
                            value={form.prompt}
                            handleChange={handleChange}
                            isSurpriseMe
                            handleSurpriseMe={handleSurpriseMe}
                        />
                            <button type="button" onClick={changeStep} className="generate-btn">
                                {"Next"}
                            </button>
                        </>
                        : <></>
                }
                {
                    second ?
                        <>
                            <FormField
                                labelname="Who's the star of your picture"
                                type="text"
                                name="star"
                                placeholder="A magical unicorn, a superhero, your favorite pet, a cool car, etc."
                                value={form.star}
                                handleChange={(e) => setPrompt(prompt + e.target.value)}
                            />
                            <button type="button" onClick={changeStep} className="generate-btn">
                                {"Next"}
                            </button>
                        </>
                        : <></>
                }
                {
                    third ?
                        <>
                            <FormField
                                labelname="Where's the action happening?"
                                type="text"
                                name="action"
                                placeholder=" Running super fast, flying high in the sky, having a party, discovering a secret treasure, etc."
                                value={form.action}
                                handleChange={(e) => setPrompt(prompt + e.target.value)}
                            />
                            <button type="button" onClick={changeStep} className="generate-btn">
                                {"Next"}
                            </button>
                        </>
                        : <></>
                }
                {
                    fourth ?
                        <>
                            <FormField
                                labelname="Any details to make your picture extra cool"
                                type="text"
                                name="extra"
                                placeholder="Bright, colorful, spooky, dark, a red hat."
                                value={form.extra}
                                handleChange={(e) => setPrompt(prompt + e.target.value)}
                            />

                            <button type="button" onClick={generateImage} className="generate-btn">
                                {generatingImg ? "Generating..." : "Generate"}
                            </button>
                        </>
                        : <></>
                }

                <div className="photoParent">
                    {form.photo ? (
                        <img src={form.photo} alt={form.prompt} />
                    ) : (
                        <img src={preview} alt="Preview" className="preview" />
                    )}
                    {
                        generatingImg && (
                            <div>
                                {/* <Loader /> */}
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default Create;