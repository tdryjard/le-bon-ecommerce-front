import React, { useState, useEffect } from 'react'
import { Questionchat } from '../questionBlock/QuestionChat';
import cross from './cross.png'
import logo from './logo.png'
import reload from './reload.png'
import back from './back.png'
import { useForm } from "react-hook-form";
import { PropsArea } from '../types'
import './FormContact.css'
import './ChatBotArea.css'

export const Sortouch = ({ userId, modelId, active }: PropsArea) => {
    const [containers, setContainers] = useState<any[]>()
    const [cardsQuest, setCardsQuest] = useState<any[]>()
    const [cardsRes, setCardsRes] = useState<any[]>()
    const [cardsCategory, setCardsCategory] = useState<any[]>()
    const [responseSelect, setResponseSelect] = useState(0)
    const [storageContainers, setStorageContainers] = useState<any[]>()
    const [responseSelected, setResponseSelected] = useState<any[]>()
    const [pair, setPair] = useState(false)
    const [cardsQuestFilter, setCardsQuestFilter] = useState([])
    const [chatActive, setChatActive] = useState(false)
    const [textIcon, setTextIcon] = useState(true)
    const [posted, setPosted] = useState(false)
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [load, setLoad] = useState(false)
    const [color, setColor] = useState()
    const [lastResponse, setLastResponse] = useState<any>()
    const [beforeSelect, setBeforeSelect] = useState<any[]>()
    const [search, setSearch] = useState<string[]>()

    const headRequest: any = {
        'Content-Type': 'application/json',
        'Acces-Control-Allow-Origin': { origin }
    }

    function validateEmail(email: string) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validatePhone = (phone: string) => {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        return re.test(phone)
    }

    const takePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
    }

    const takeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    function getCurrentDate(separator: any) {

        const newDate: any = new Date()
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }

    useEffect(() => {
        if (active) setChatActive(true)
    }, [active])

    const searching = (e: React.ChangeEvent<HTMLInputElement>) => {
        const word = e.target.value
        const wordSplit = word.toLowerCase().split('')
        const resReturn: any[] = []
        if (wordSplit.length > 2) {
            fetch(`https://sortouch-back.herokuapp.com/api/chatbot/response/findAll/${userId}/${modelId}`)
                .then(res => res.json())
                .then(res => {
                    for (let i = 0; i < res.length; i++) {
                        const resSplit = res[i].content.split('')
                        let nbEgale = 0
                        let nbLetter = 0
                        for (let iWord = 0; iWord < wordSplit.length; iWord++) {
                            for (let iRes = 0; iRes < resSplit.length; iRes++) {
                                if (wordSplit[iWord] === resSplit[iRes]) {
                                    nbLetter++
                                    iWord++
                                    if (nbLetter > 3) resReturn.push(res[i])
                                } else {
                                    if (nbLetter > 0) iRes--
                                    nbLetter = 0
                                }
                            }
                        }
                        if (nbEgale > 0 && resReturn[resReturn.length - 1] && (resReturn[resReturn.length - 1].id !== res[i].id)) resReturn.push(res[i])
                        nbEgale = 0
                    }
                    const sortResult = resReturn.filter((item: any, pos: any) => {
                        return resReturn.indexOf(item) === pos;
                    })
                    if (resReturn.length > 0) setSearch(sortResult)
                })
        }
        if (wordSplit.length === 0) setSearch([])
    }

    const sendMail = async (categoryId: any) => {
        const date = getCurrentDate(' ')
        const dateChar = date.toString()
        if (!validateEmail(email)) {
            alert('email non valide')
        } else if (!validatePhone(phone)) {
            alert('numéro de téléphone non valide')
        } else {
            const result = await fetch(`https://sortouch-back.herokuapp.com/api/chatbot/mail/create`, {
                method: 'POST',
                headers: headRequest,
                body: JSON.stringify({
                    phone: phone,
                    email: email,
                    message: message,
                    category_id: categoryId,
                    model_id: modelId,
                    user_id: userId,
                    view: 0,
                    date: dateChar
                })
            });
            const result2 = await fetch(`https://sortouch-back.herokuapp.com/api/chatbot/contact/create`, {
                method: 'POST',
                headers: headRequest,
                body: JSON.stringify({
                    phone: phone,
                    email: email,
                    category_id: categoryId,
                    model_id: modelId,
                    user_id: userId
                })
            });
            if (result && result2) {
                setPosted(true)
                setTimeout(() => {
                    reloadFunction(true)
                }, 4000)
            }
        }
    }

    useEffect(() => {
        if (userId && modelId) {
            printContainers()
        }
    }, [userId, modelId, responseSelect, chatActive])

    useEffect(() => {
        setTimeout(() => {
            setTextIcon(false)
        }, 6000)
    }, [])


    const printContainers = async () => {
        if (lastResponse !== responseSelect) {
            try {
                fetch(`https://sortouch-back.herokuapp.com/api/chatbot/container/findAll/${userId}/${responseSelect}/${modelId}`)
                    .then(res => res.json())
                    .then(res => {
                        if (beforeSelect && containers && beforeSelect[0] !== 0) {
                            if (beforeSelect && beforeSelect[0] === 0) setBeforeSelect([])
                            let resResult = res.filter((res: any) => res.response_id !== null)
                            setContainers(resResult)
                            takeCard(resResult)
                        } else {
                            if (beforeSelect && beforeSelect[0] === 0) setBeforeSelect([])
                            setContainers(res)
                            takeCard(res)
                        }
                    })
                setLastResponse(responseSelect)

            } catch (error) {
                console.log(error)
            }
        }
    }

    const takeCard = async (res: any) => {
        let stock: any[] = []
        for (let i = 0; i < res.length + 3; i++) {
            if (res[i]) {
                let result: any[] = []
                if (res[i].content_type === "question") {
                    const resNoJson = await fetch(`https://sortouch-back.herokuapp.com/api/chatbot/relation/findCardQuestion/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = [`none`]
                stock = [...stock, result]
                setCardsQuest(stock)
            }
        }
        let stockRes: any[] = []
        for (let i = 0; i < res.length + 3; i++) {
            if (res[i]) {
                let result = []
                if (res[i].content_type === "response") {
                    const resNoJson = await fetch(`https://sortouch-back.herokuapp.com/api/chatbot/relation/findCardResponse/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = [`none`]
                stockRes = [...stockRes, result]
                setCardsRes(stockRes)
            }
        }
        let stockCategory: any[] = []
        for (let i = 0; i < res.length + 3; i++) {
            if (res[i]) {
                let result = []
                if (res[i].content_type === "category") {
                    const resNoJson = await fetch(`https://sortouch-back.herokuapp.com/api/chatbot/relation/findCardCategory/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = [`none`]
                stockCategory = [...stockCategory, result]
                setCardsCategory(stockCategory)
            }
        }
        setLoad(false)
    }

    const selectResponse = async function (cardId: any, index: any, search: any) {
        if (search) setSearch([])
        setPair(!pair)
        const stockContainers = containers
        const numberCard = cardId
        const containerIndex = index + 1
        let stockSelect = beforeSelect
        if (stockSelect) stockSelect.push(numberCard)
        setBeforeSelect(stockSelect)
        setResponseSelect(numberCard)



        if (responseSelected) responseSelected.length = cardId
        if (stockContainers) stockContainers.length = containerIndex


        let stockResponseSelected = ([responseSelected, numberCard])
        if(cardsRes){
            for (let a = 0; a < cardsRes.length; a++) {
                if (cardsRes![a].length) {
                    for (let b = 0; b < cardsRes![a].length; b++) {
                        for (let c = 0; c < stockResponseSelected.length; c++) {
                            const nbRes = cardsRes![a].filter((card: any) => stockResponseSelected.includes(card.id))
                            if (nbRes.length > 1) {
                                for (let i = 0; i < stockResponseSelected.length; i++) {
                                    for (let a = 0; a < nbRes.length - 1; a++) {
                                        if (nbRes[a].id === (stockResponseSelected[i])) {
                                            stockResponseSelected.splice(i, 1)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        setResponseSelected(stockResponseSelected)

        setStorageContainers(stockContainers)

        if (stockContainers) {
            printContainers()
        }
    }


    const activeChat = () => {
        setChatActive(true)
    }

    const reloadFunction = (isPost: any) => {
        if ((responseSelect && responseSelect !== 0) || search!.length > 0) {
            setContainers([])
            setCardsQuest([])
            setCardsRes([])
            setCardsCategory([])
            setResponseSelect(0)
            setStorageContainers([])
            setResponseSelected([])
            setCardsQuestFilter([])
            setSearch([])
        }
        if (isPost === true) setPosted(false)
    }



    const getColor = async () => {
        const resFind = await fetch(`https://sortouch-back.herokuapp.com/api/model/findAll/${userId}`, {
            method: 'GET',
            headers: headRequest
        })
        const resFindJson = await resFind.json()
        if (resFindJson.length > 0) {
            const resFindSort = await resFindJson.filter((res: any) => res.id === modelId)
            if (resFindSort) {
                setColor(resFindSort[0].color)
            }
        }
    }

    useEffect(() => {

    }, [color])

    let width = '90%'
    let height = '93%'
    let bottom = '2.5%'
    if (window.innerWidth > 1000) {
        width = '420px'
        height = '75%'
        bottom = '8%'
    }

    let containerChatbot = {}

    if (chatActive) {
        containerChatbot = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            height: height,
            width: width,
            position: 'fixed',
            bottom: bottom,
            right: '4%',
            borderRadius: '15px',
            boxShadow: '0px 0px 15px #b8b8b8',
            background: 'rgb(255, 255, 255)',
            zIndex: '1000'
        }
    }

    const backResponse = () => {
        if (beforeSelect) {
            setResponseSelect(beforeSelect[beforeSelect.length - 2])
            const stockSelect = beforeSelect
            let res = stockSelect.slice(0, -1)
            if (res.length === 0) res[0] = 0
            setBeforeSelect(res)
        }
    }

    let class1 = ''
    let class2 = ''
    if (!chatActive) class1 = "containerIconChat"
    else class2 = "divRelativeSortouch"


    return (
        <div className={class1} style={containerChatbot}>
            {chatActive &&
                <div className="headChatbot">
                    <img onClick={() => { setChatActive(!chatActive) }} alt="close sortouch" src={cross} className="crossChatbot" />
                    <img onClick={reloadFunction} alt="reload sortouch" src={reload} className="reloadChatbot" />
                    <img src={back} className="backIconSortouch" onClick={backResponse} />
                    <a target="__blank" rel="noopener" href="https://sortouch.com" className="sortouch">Sortouch</a>
                </div>}
            {!load && !search ?
                <div className={chatActive ? "contentChatbot" : "contentIcon"}>
                    <div className={class2}>
                        {!chatActive ?
                            <div className="contentIcon">
                                {textIcon &&
                                    <div className="contentTextIconChat">
                                        <p onClick={activeChat} className="textIconCard"><Questionchat text={"Aidez moi à vous guider !"} /></p>
                                    </div>}
                                <img alt="icon chat" onClick={activeChat} src={logo} className="iconChat" />
                            </div>
                            : chatActive && posted === false &&
                            Array.isArray(containers) &&
                            containers.map((container, index) => {
                                return (
                                    <div className={container.content_type === "question" ? "contentLittleQuestChat" : container.content_type === "response" ? "contentResponseChat" : "contentLittleDestinationChat"}>
                                        {cardsQuest && Array.isArray(cardsQuest[index]) && cardsQuest[index] !== "none" && container.content_type === "question" &&
                                            cardsQuest[index].map((card: any) => {
                                                return (
                                                    Array.isArray(cardsQuest[cardsQuest.length - 2]) && cardsQuest[cardsQuest.length - 2][0].id === card.id ?
                                                        <div id={`questionSortouch${index}`} className="contentQuestChat">
                                                            <img alt="sortouch" src={logo} className="logoChat" />
                                                            <Questionchat text={card.content} />
                                                        </div>
                                                        :
                                                        <div id={`questionSortouch${index}`} className="contentQuestChat">
                                                            <img alt="sortouch" src={logo} className="logoChat" />
                                                            <p className="textQuest">{card.content}</p>
                                                        </div>
                                                )
                                            })}
                                        {cardsRes && Array.isArray(cardsRes[index]) && cardsRes[index] !== "none" && container.content_type === "response" &&
                                            cardsRes[index].map((card: any) => {
                                                return (
                                                    <div onClick={() => { selectResponse(card.id, index, false); setLoad(true) }} className='containerCardResponse'>
                                                        <p id={`container${index}`} className="textCardResChat">{card.content}</p>
                                                    </div>)
                                            })
                                        }
                                        {cardsCategory && Array.isArray(cardsCategory[index]) && cardsCategory[index] !== "none" && container.content_type === "category" &&
                                            cardsCategory[index].map((card: any) => {
                                                return (
                                                    <form className="containerLittleFormChatbot">
                                                        <input onChange={takeEmail} type="text" className="inputFormChat" placeholder="email" />
                                                        <input onChange={takePhone} type="text" className="inputFormChat" placeholder="numéro de téléphone" />
                                                        <textarea className="inputMessageFormChatbot" placeholder="message" onChange={(e) => { setMessage(e.target.value) }} />
                                                        <button onClick={() => { sendMail(card.id) }} type="submit" className="sendFormChatbot">Envoyer !</button>
                                                    </form>
                                                )
                                            })}
                                    </div>
                                )
                            })}
                        {posted &&
                            <div className="containerTextePosted">
                                <p className="textPosted">Merci !</p>
                            </div>}
                    </div>
                </div>
                : load ?
                    <div className={chatActive ? "contentChatbot" : "contentIcon"}>
                        {!chatActive ?
                            <div className="contentIcon">
                                {textIcon &&
                                    <div className="contentTextIconChat">
                                        <p onClick={activeChat} className="textIconCard"><Questionchat text={"Prenez contact avec moi !"} /></p>
                                    </div>}
                                <img alt="icon chat" onClick={activeChat} src={logo} className="iconChat" />
                            </div>
                            : chatActive && posted === false &&
                            <div className="containerChargementSortouch">
                                <span className="pointChargementSortouch" />
                                <span className="pointChargementSortouch2" />
                                <span className="pointChargementSortouch3" />
                            </div>}
                    </div>
                    : search!.length > 0 &&
                    <div className={chatActive ? "contentChatbot" : "contentIcon"}>
                        {search!.map((response: any, index) => {
                            return (
                                <div onClick={() => { selectResponse(response.id, index, true); setLoad(true) }} className='containerCardResponse'>
                                    <p id={`container${index}`} className="textCardResChat">{response.content}</p>
                                </div>)
                        })}
                    </div>}
            {chatActive && containers![containers!.length - 1] && containers![containers!.length - 1].content_type !== "category" &&
                <input placeholder="Rechercher" className="inputSearchSortouch" onChange={searching} />}
        </div >
    )
}