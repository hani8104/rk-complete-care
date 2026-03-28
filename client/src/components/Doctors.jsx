import React, { useState, useEffect } from 'react';
import { getDoctors } from '../services/api';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fallbackDoctors = [
        {
            _id: 'fallback-1',
            name: 'Dr. Piyush Sharma (PT)',
            qualification: 'MPT (Ortho & Sports)',
            designation: 'HOD – Dept. of Physiotherapy\nWelton Hospital, Jaipur',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
            specialty: 'Orthopaedic & Sports'
        },
        {
            _id: 'fallback-2',
            name: 'Dr. Soniya Pathak (PT)',
            qualification: 'BPT (CDNT, CCT)',
            designation: 'Consultant Physiotherapist',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
            specialty: 'Neuro & Pediatric'
        }
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await getDoctors();
                setDoctors(data && data.length > 0 ? data : fallbackDoctors);
            } catch {
                setDoctors(fallbackDoctors);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <section id="doctors" className="py-24 relative overflow-hidden bg-slate-900 border-t-4 border-blue-700">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="section-badge mx-auto bg-slate-800 border-slate-700 text-blue-400">
                        <i className="fa-solid fa-user-doctor"></i>
                        Our Experts · हमारे विशेषज्ञ
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mt-4">
                        Meet Our <span className="text-blue-500">Specialists</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto mt-4">
                        Highly qualified physiotherapists dedicated to your complete recovery
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center gap-8 flex-wrap">
                        {[1, 2].map(i => (
                            <div key={i} className="w-full max-w-sm bg-slate-800 rounded-2xl overflow-hidden animate-pulse">
                                <div className="h-80 bg-slate-700"></div>
                                <div className="p-8 space-y-3">
                                    <div className="h-5 bg-slate-700 rounded w-3/4 mx-auto"></div>
                                    <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8">
                        {doctors.map((doc, i) => (
                            <div key={doc._id}
                                className="group w-full max-w-sm bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:bg-slate-800/80 transition-all duration-300 shadow-xl">
                                {/* Image */}
                                <div className="h-80 relative overflow-hidden">
                                    <img
                                        src={doc.image}
                                        alt={doc.name}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => { e.target.src = 'https://placehold.co/400x320?text=Doctor'; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

                                    {/* Specialty badge */}
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-blue-700 rounded-lg text-white text-[10px] font-bold uppercase tracking-wider">
                                        {doc.specialty || 'Physiotherapy'}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-8 text-center">
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{doc.name}</h3>
                                    <p className="font-bold text-sm mb-3 text-blue-500 uppercase tracking-wide">{doc.qualification}</p>
                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{doc.designation}</p>

                                    <a href="tel:+918769556475"
                                        className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                                        <i className="fa-solid fa-calendar-check"></i>
                                        Book Appointment
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Doctors;
