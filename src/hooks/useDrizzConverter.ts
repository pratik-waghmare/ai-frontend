import { BACKEND_URL } from "@/constants/urls";
import { useEffect, useState } from "react";

const useDrizzConverter = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const sendMessage = async (input: string) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "code": input
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            setIsLoading(true);
            setError(null);

            const data = await fetch(`${BACKEND_URL}/api/translate`, requestOptions).then(res => res.json());
            return JSON.parse(data.data.choices[0].message.content);
        } catch (err) {
            console.error(err)
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { }, []);

    return { sendMessage, isLoading, error };
}

export default useDrizzConverter;