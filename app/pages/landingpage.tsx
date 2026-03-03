import { MoveRight } from "lucide-react";
import { useEffect } from "react";
import DiseasesCard from "~/component/DiseasesCard";
import { Disease } from "~/const";

export default function LandingPage() {
    useEffect(() => {}, []);

    return (
        <>
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            {/* Decorative Blur Circles */}
<div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
<div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <span className="px-4 py-1 text-sm bg-blue-600 text-white rounded-full mb-6 shadow">
                    Education Resource
                </span>

                <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-900 leading-tight">
                    Lung Disease Classification
                </h1>

                <p className="text-base md:text-xl text-gray-600 mt-6 max-w-3xl text-center">
                    Learn how artificial intelligence and machine learning help identify 
                    and classify lung diseases for better patient outcomes.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <a
                        href="/home"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md"
                    >
                        Start Uploading <MoveRight size={20} />
                    </a>

                    <a
                        href="#diseases"
                        className="flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-xl text-lg font-medium hover:bg-blue-50 transition duration-300"
                    >
                        Explore Diseases
                    </a>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full max-w-4xl">
                    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                        <p className="text-3xl font-bold text-blue-600">15+</p>
                        <p className="text-gray-600 mt-2">Disease Types</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                        <p className="text-3xl font-bold text-blue-600">80%</p>
                        <p className="text-gray-600 mt-2">Model Accuracy</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                        <p className="text-3xl font-bold text-blue-600">AI-Powered</p>
                        <p className="text-gray-600 mt-2">Classification</p>
                    </div>
                </div>

            </section>

            {/* DISEASE SECTION */}
            <section
                id="diseases"
                className="py-20 px-6 bg-gray-50"
            >
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
<div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="max-w-6xl mx-auto text-center relative">
    <div className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
        AI Medical Insights
    </div>

    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
        Common Lung Diseases
    </h2>

    <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>

    <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-base md:text-lg">
        Understanding the different types of lung diseases is crucial for early detection 
        and effective treatment.
    </p>
</div>

                {/* Cards Grid */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {Disease.map((elements, index) => (
                        <DiseasesCard
                            key={index}
                            name={elements.name}
                            description={elements.description}
                            commonsymptoms={elements.commonsymptoms}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}