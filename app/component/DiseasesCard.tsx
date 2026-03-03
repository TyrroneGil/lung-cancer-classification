interface DiseaseProps {
    name: string
    description: string
    commonsymptoms: string[]
}

export default function DiseasesCard({
    name,
    description,
    commonsymptoms
}: DiseaseProps) {
    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {name}
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                {description}
            </p>

            {/* Symptoms Section */}
            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Common Symptoms
                </h3>

                <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                    {commonsymptoms.map((symptom, idx) => (
                        <li key={idx} className="leading-relaxed">
                            {symptom}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}