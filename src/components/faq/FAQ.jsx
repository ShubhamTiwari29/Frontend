import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
    const faqs = [
        {
            question: 'What types of frames do you offer?',
            answer: 'We offer a variety of frames, including wood, metal, and custom options to fit your style and decor.'
        },
        {
            question: 'How do I upload my picture for framing?',
            answer: 'You can easily upload your picture through our Upload Picture button on the homepage. Follow the prompts to select your frame style and size.'
        },
        {
            question: 'What is the turnaround time for my order?',
            answer: 'Typically, orders are processed within 5-7 business days. You will receive an email notification once your order is shipped.'
        },
        {
            question: 'Can I return or exchange my frame?',
            answer: 'Yes, we accept returns or exchanges within 30 days of purchase. Please ensure the item is in its original condition.'
        },
        {
            question: 'Do you offer discounts for bulk orders?',
            answer: 'Yes, we provide discounts for bulk orders. Please contact our customer service for more details.'
        },
        {
            question: 'How do I care for my framed pictures?',
            answer: 'To keep your framed pictures looking their best, avoid direct sunlight and dust them regularly with a soft, dry cloth.'
        },
    ];

    // State to track which question is open
    const [openIndex, setOpenIndex] = useState(null);

    // Function to toggle the open question
    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 md:mx-1 mx-2 bg-blue-50 ">
            <h2 className="text-center text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="max-w-2xl mx-auto px-2 shadow-lg bg-white rounded-lg">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b py-4 px-2 cursor-pointer" onClick={() => toggleQuestion(index)}>
                        <div className="border-b py-4 cursor-pointer flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{faq.question}</h3>
                            <div className="ml-4">
                                {openIndex === index ? (
                                    <FaMinus className="text-gray-600" />
                                ) : (
                                    <FaPlus className="text-gray-600" />
                                )}
                            </div>
                        </div>
                        {openIndex === index && (
                            <p className="text-gray-700 mt-2">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
