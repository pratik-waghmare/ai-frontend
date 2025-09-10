import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react";

const MAX_FILE_SIZE = 500 * 1024;

interface FileUploadProps {
    onUpload: (value: string) => void
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

const FileUpload = ({ onUpload, isOpen, setIsOpen }: FileUploadProps) => {
    const [error, setError] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setError('File size should be less than 500kb');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            onUpload(event.target?.result as string);
        };
        reader.readAsText(file);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
        }}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsOpen(true)} className="cursor-pointer">Upload File</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <div className="grid w-full max-w-sm items-center gap-3 pt-4">
                        <label
                            htmlFor="appium-file"
                            className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md cursor-pointer text-center w-full h-[200px]"
                        >
                            <span className="text-sm text-gray-500">📂 Choose a file</span>
                            <Input id="appium-file" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                    {error && <p className="text-red-500 text-[12px] font-semibold">{error}</p>}
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default FileUpload