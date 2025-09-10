import type { ResponseData } from "."

interface DrizzLanguageProps {
    data: ResponseData[]
}

const DrizzLanguage = ({ data }: DrizzLanguageProps) => {
    return (
        <div className="p-4 border-1 rounded-[4px] h-full">
            <h3 className="font-bold mb-4 text-[18px]">Drizz Language</h3>
            <div>{data.map((step: ResponseData) => <div key={step.title} className="my-2">
                <p className={`${step.title === 'Error' ? 'text-red-500' : ''} font-semibold`}>{step.title}</p>
                <div className="ml-4">{step.description.map(text => <p key={text}>{text}</p>)}</div>
            </div>)}</div>
        </div>
    )
}

DrizzLanguage.Skeleton = () => {
    return (
        <div className="p-4 border rounded-[4px] h-full">
            <h3 className="font-bold mb-4">Drizz Language</h3>
            <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                        {/* Fake title */}
                        <div className="h-4 bg-gray-300 rounded w-1/3" />
                        {/* Fake description lines */}
                        <div className="ml-4 space-y-1">
                            <div className="h-3 bg-gray-200 rounded w-2/3" />
                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DrizzLanguage