import React, {useEffect, useState} from 'react'
import {stringProps} from '../types'

export const Questionchat = ({text} : stringProps) => {
    const [totalQuestion, setTotalQuestion] = useState<any[]>()
    

    useEffect(() => {
        printText(text)
    }, [text])


    const printText = (text : string) => {
        if(text){
            let index = 0
            let question = text.split('')
            let stockQuestion : any[] = []
            const questionPrint = setInterval(() => {
                stockQuestion = [...stockQuestion, question[index]]
                setTotalQuestion([totalQuestion, stockQuestion])
                index++
                if(index === question.length){
                    clearInterval(questionPrint)
                    return(true)
                }
            }, 30)
        }
    }

    return(
        <div>
            <p className="questionPrint">{totalQuestion}</p>
        </div>
    )
}

export default Questionchat