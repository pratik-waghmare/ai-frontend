import { useState } from "react"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../ui/resizable"
import useDrizzConverter from "@/hooks/useDrizzConverter"
import QueryForm from "./QueryForm"
import DrizzLanguage from "./DrizzLanguage"
import useIsMobile from "@/hooks/useIsMobile"

export type Description = string;

export interface ResponseData {
    title: string
    description: Description[]
}

const TestConverter = () => {
    const { sendMessage, isLoading } = useDrizzConverter();
    const isMobile = useIsMobile();
    const [data, setData] = useState([]);

    const onSendHandler = async (input: string) => {
        const data = await sendMessage(input);
        setData(data);
    }

    return (
        <div className="h-[100dvh] p-4 text-[14px] md:text-[16px]">
            <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>
                <ResizablePanel className="h-full py-4 md:p-4">
                    <QueryForm onSendHandler={onSendHandler} disabled={isLoading} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="h-full py-4 md:p-4">
                    {isLoading ? <DrizzLanguage.Skeleton /> : <DrizzLanguage data={data} />}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default TestConverter