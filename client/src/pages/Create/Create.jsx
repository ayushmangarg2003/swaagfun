import React, { useState } from "react";
import preview from "../../assets/preview.png";
import FormField from "../../components/FormFeild/FormFeild";
import GeneratingLoader from "../../components/GeneratingLoader/GeneratingLoader";
import { useLocation } from 'react-router-dom';
import "./Create.css"
import { surpriseMePrompts } from "../../utils/constants";
import RadioCard from "../../components/RadioCard"
import {
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    Stepper,
    useRadioGroup,
} from '@chakra-ui/react';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import axios from 'axios';
import { backendLink } from "../../utils/details";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { saveAs } from 'file-saver';

const Create = () => {
    const storage = getStorage();

    const downloadImage = () => {
        console.log(form.photo);
        saveAs(form.photo[0], 'image.webp') // Put your image URL here.
    }

    // const convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result)
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error)
    //         }
    //     })
    // }

    const [userVerified, setUserVerified] = useState(false)
    const [user, setUser] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const location = useLocation();


    const upload = async () => {
        if (form.photo == null) {
            return;
        }
        try {
            const ref2 = ref(storage, `images/${userEmail}/${form.prompt}`)
            // const b64Img = await convertToBase64(form.photo)
            uploadBytes(ref2, form.photo)
        } catch (error) {
            console.log(error);
        }
    }


    const steps = [
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
    ]

    const [first, setFirst] = useState(true)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [fourth, setFourth] = useState(false)
    const [fifth, setFifth] = useState(false)

    const [imgSize, setImgSize] = useState('1:1')

    const [step, setStep] = useState(0)
    const [prompt, setPrompt] = useState(location.state.prompt)
    const [generatingImg, setGeneratingImg] = useState(false);

    const options = ['16:9', '1:1', '9:16']

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(true)
            setUserEmail(user.email)
            setUserVerified(user.emailVerified)
        } else {
            setUser(false)
        }
    });

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
        if (step == 3) {
            setFourth(false)
            setFifth(true)
        }
    }

    const getRandomPrompt = (prompt) => {
        const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
        const randomPrompt = surpriseMePrompts[randomIndex];
        if (randomPrompt === prompt) return getRandomPrompt(prompt)
        return randomPrompt;
    };



    const [form, setForm] = useState({
        prompt: prompt,
        photo: "",
    });


    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await axios.post(
                    `${backendLink}/api/v1/dalle`,
                    { prompt: form.prompt, size: imgSize },
                );
                setForm({ ...form, photo: response.data.photo })
                upload()
            } catch (error) {
                alert(error);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please Enter a Prompt')
        }
    }




    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt })
    }


    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'size',
        defaultValue: '1:1',
        onChange: setImgSize,
    })

    const group = getRootProps()

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
            <Stepper size={'sm'} index={step}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>
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
                                labelname="Choose an art style"
                                type="text"
                                name="artstyle"
                                placeholder="Painting, Sketch etc"
                                value={form.extra}
                                handleChange={(e) => setPrompt(prompt + e.target.value)}
                            />

                            <button type="button" onClick={changeStep} className="generate-btn">
                                {"Next"}
                            </button>
                        </>
                        : <></>
                }

                {
                    fifth ?
                        <>
                            <label className="sizeLabel">Choose Aspect Ratio of the image</label>

                            <div>
                                {options.map((value) => {
                                    const radio = getRadioProps({ value })
                                    return (
                                        <RadioCard key={value} {...radio}>
                                            {value}
                                        </RadioCard>
                                    )
                                })}
                            </div>

                            {userVerified ? (
                                <button type="button" onClick={generateImage} className="generate-btn">
                                    {generatingImg ? "Generating..." : "Generate"}
                                </button>
                            ) : (
                                <h1 className="warning">You Need to Verify Your Email To Generate</h1>
                            )}
                        </>
                        : <></>
                }

                <div className="photoParent">
                    {form.photo ? (
                        <>
                            <img src={form.photo} alt={form.prompt} />
                            <button className="downloadBtn" onClick={downloadImage}>Download</button>
                        </>
                    ) : (
                        <img src={preview} alt="Preview" className="preview" />
                    )}
                </div>
            </div>
            {
                generatingImg && (
                    <div>
                        <GeneratingLoader />
                    </div>
                )
            }
        </section>

    );
};

export default Create;