import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTestimonials } from '../services/api';

const fallbackTestimonials = [
    {
        _id: 'f1',
        name: "Rahul Verma",
        location: "Jaipur",
        message: "Dr. Piyush is amazing. My back pain is completely gone after just 5 sessions. The clinic environment is very soothing.",
        rating: 5,
        isReviewLink: true
    },
    {
        _id: 'f2',
        name: "Priya Singh",
        location: "Jhotwara",
        message: "Best physiotherapy center in Jhotwara. Dr. Soniya was very patient with my mother's knee rehabilitation.",
        rating: 5,
        isReviewLink: true
    },
    {
        _id: 'f3',
        name: "Amit Kumar",
        location: "Vidhyadhar Nagar",
        message: "Highly professional staff and advanced equipment. I recovered from my sports injury much faster than expected.",
        rating: 5,
        isReviewLink: true
    },
    {
        _id: 'f4',
        name: "Sneha Gupta",
        location: "Vaishali Nagar",
        message: "The post-surgery care I received here was exceptional. They really care about your recovery journey.",
        rating: 5,
        isReviewLink: true
    },
    {
        _id: 'f5',
        name: "Your Experience Matters",
        location: "Rate us on Google",
        message: "Had a great experience? We'd love to hear from you! Click below to share your feedback.",
        rating: 5,
        isReviewLink: true
    }
];

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState(fallbackTestimonials);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await getTestimonials();
                if (data && data.length > 0) {
                    setTestimonials(data);
                }
            } catch (err) {
                console.error('Could not fetch testimonials, using fallback data.');
            }
        };
        fetchTestimonials();
    }, []);

    // Auto-rotate timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="py-24 relative overflow-hidden bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="section-badge mx-auto">
                        <i className="fa-solid fa-star"></i>
                        Patient Stories · मरीज़ों की राय
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 mt-4">
                        What Our <span className="text-blue-700">Patients Say</span>
                    </h2>
                    <div className="flex justify-center gap-3 flex-wrap mt-8">
                        <a href="https://g.page/r/CXkFsimafLKiEAE/review" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-100">
                            <i className="fa-brands fa-google"></i> Review us on Google
                        </a>
                        <a href="https://g.page/r/CXkFsimafLKiEAE" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all text-slate-700">
                            <i className="fa-solid fa-star text-amber-500"></i> See all reviews
                        </a>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Carousel Container */}
                    <div className="relative min-h-[300px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                                className="bg-slate-50 rounded-2xl border border-slate-100 w-full md:w-5/6 mx-auto text-center p-10 md:p-12 relative"
                            >
                                <i className="fa-solid fa-quote-left text-5xl absolute top-8 left-8 text-slate-200"></i>

                                <div className="text-lg mb-6 flex justify-center gap-1 text-amber-500">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <i key={i} className="fa-solid fa-star"></i>
                                    ))}
                                </div>

                                <p className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed font-medium italic">
                                    "{testimonials[currentIndex].message || testimonials[currentIndex].text}"
                                </p>

                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center text-xl text-white font-bold bg-blue-700 shadow-sm">
                                        {testimonials[currentIndex].name.charAt(0)}
                                    </div>
                                    <h5 className="mb-0 font-bold text-lg text-slate-900">{testimonials[currentIndex].name}</h5>
                                    <span className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">{testimonials[currentIndex].location}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <button onClick={prevTestimonial} className="hidden md:flex absolute top-1/2 -left-12 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 transition-all items-center justify-center text-slate-400 hover:text-blue-700 hover:border-blue-200">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button onClick={nextTestimonial} className="hidden md:flex absolute top-1/2 -right-12 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 transition-all items-center justify-center text-slate-400 hover:text-blue-700 hover:border-blue-200">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>

                    {/* Indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-blue-700' : 'bg-slate-200 w-2'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
