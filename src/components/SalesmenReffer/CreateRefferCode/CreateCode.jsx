import React, { useState } from 'react'
import "./CreateCode.css"
import { Button, Input } from '@chakra-ui/react'
import { addDoc, collection, query } from 'firebase/firestore'
import { db } from 'Config'

const CreateCode = () => {
    //state variables
    const [location, setLocation] = useState("")
    const [franchise, setFranchise] = useState("")
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [address, setAddress] = useState("")
    const [adhaar, setAdhaar] = useState("")
    const [bankName, setBankName] = useState("")
    const [accName, setAccName] = useState("")
    const [accNumber, setAccNumber] = useState("")
    const [ifsc, setIfsc] = useState("")

    //create data
    const createData = async() => {
        const user = collection(db, "salesmen")
        try{
            await addDoc(user, {
                // location:location,
                // franchise:franchise,
                // code:code,
                salemenid:location+franchise+code,
                name:name,
                phonenumber:number,
                salesmenaddress:address,
                aadharnumber:adhaar,
                bankname:bankName,
                accountholdername:accName,
                accountnumber:accNumber,
                ifsc:ifsc
            })
            window.location.reload()
        }
        catch(err){
            console.error(err)
        }
    }

    
  return (
    <div className="create-code">
        <div className="create-input">
            <p>ANS</p>
            <Input style={{border: "1px solid #000", width:"28%"}} placeholder='Location' onChange={(e) => setLocation(e.target.value)}/>
            <Input style={{border: "1px solid #000", width:"28%"}} placeholder='Franchise/Salespartner' onChange={(e) => setFranchise(e.target.value)}/>
            <Input style={{border: "1px solid #000", width:"28%"}} placeholder='Code' onChange={(e) => setCode(e.target.value)}/>
        </div>

        <div className="create-personal">
            <h2>Personal Details</h2>
            <form>
                <div className="details-row">
                <Input type="text" placeholder='Name' style={{width:"40%", border:"1px solid #000"}} onChange={(e) => setName(e.target.value)}/>
                <Input type="number" placeholder='Phone Number'style={{width:"40%", border:"1px solid #000"}} onChange={(e) => setNumber(e.target.value)}/>
                </div>

                <div className="details-row" style={{marginTop:"20px"}}>
                <Input type="text" placeholder='Address' style={{width:"40%", border:"1px solid #000"}} onChange={(e) => setAddress(e.target.value)}/>
                
                <Input type="number" placeholder='Aadhar Number'style={{width:"40%", border:"1px solid #000"}} onChange={(e) => setAdhaar(e.target.value)}/>
                </div>
            </form>
        </div>

        <div className="create-bank">
            <h2>Bank Details</h2>
            <form>
            <div className="details-row">
                <Input type="text" placeholder='Bank Name' style={{width:"40%", border:"1px solid #000"}} onChange={(e) => setBankName(e.target.value)}/>
                <Input type="text" placeholder='Account Holder Name'style={{width:"40%", border:"1px solid #000"}} onChange={(e) => setAccName(e.target.value)}/>
                </div>

                <div className="details-row" style={{marginTop:"20px"}}>
                <Input type="number" placeholder='Account Number' style={{width:"40%", border:"1px solid #000"}} onChange={(e) => setAccNumber(e.target.value)}/>
                <Input type="text" placeholder='IFSC'style={{width:"40%", border:"1px solid #000"}} onChange={(e) => setIfsc(e.target.value)}/>
                </div>
            </form>
        </div>

        <div className="create-button">
            <Button onClick={createData}>Create</Button>
        </div>
    </div>
  )
}

export default CreateCode