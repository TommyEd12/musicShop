import { useContext } from "react";
import { Context } from "../main";

export function useAppContext(){
    const context = useContext(Context)
    if (context === undefined){
        throw new Error("You must provide a context")
    }
    return context
}