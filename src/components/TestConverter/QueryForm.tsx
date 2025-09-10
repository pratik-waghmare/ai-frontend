import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import FileUpload from "./FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { updateInput } from "@/app/dataStore";
import type { RootState } from "@/app/store";

type InputQuery = string;

export interface QueryFormProps {
  onSendHandler: (input: InputQuery) => void,
  disabled: boolean
}

const QueryForm = ({ onSendHandler, disabled }: QueryFormProps) => {
  const input = useSelector((state: RootState) => state.dataStore.input)
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeHandler = (value: string) => {
    dispatch(updateInput(value))
  }

  return (
    <div className="flex flex-col w-full gap-2 h-full">
      <Textarea placeholder="Type your message here." className="flex-1 high text-[14px] md:text-[16px]"
        value={input} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => changeHandler(e.target.value)} />

      <div className="flex gap-2">
        <FileUpload isOpen={isOpen} setIsOpen={setIsOpen} onUpload={(value: string) => {
          changeHandler(value)
          setIsOpen(false);
        }} />
        <Button onClick={() => {
          onSendHandler(input);
        }} className="cursor-pointer flex-1" disabled={disabled}>Send message</Button>
      </div>
    </div>
  )
}


export default QueryForm