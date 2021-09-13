import React,{ useState } from 'react';
import data from '../data/Data.json'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button } from 'react-bootstrap'
const MySwal = withReactContent(Swal)

const RentalReturn = ({ visible, close }) => {

  const [ code, setCode ] = useState('')
  const [ price, setPrice ] = useState(null)
  const [ type, setType] = useState(null)
  const [ input, setInput ] = useState(null)
  const [ period, setPeriod] = useState(null)
  const [ days, setDays ] = useState(null)
  const [ item, setItem ] = useState(null)

  const findSpecificProduct = (e) => {
    for(const x of data){
        if(x.code === e.target.value){
           setCode(x.code)
           setPrice(x.price)
           setType(x.type)
           setPeriod(x.minimum_rent_period)
           setDays(x.days)
           setItem(x.name)
        }
    } 
}

const computeReturnPrice =() =>{
  const discount = 0
  const maxDurability = 0;
  const discountFlag ='N'
  let milesUsed = input
  let dy = 0;
  let milesPerDay = 0

  if (discountFlag === 'Y'){
    if( days > period){
       discount = 0
    }
  }
    
  if(type === 'plain'){
         dy = (days * 1)
  } else if( type === 'meter'){
         dy = (days * 2)
         milesPerDay = days * 10
     if (milesUsed >10) {
         maxDurability = Math.ceil(milesUsed * 2 )
     }
  }

  const durability = dy + maxDurability
  let tp  =  milesPerDay + (milesUsed * days ) - discount
  return tp
}

const finalVal = computeReturnPrice(input)

const confirmReturn =() =>{
  MySwal.fire({  
    title: 
     <p> Your Total Price is : { finalVal } <br></br>
         Product Name : { item } <br></br>
         No of Days :{ days }
     </p>
     ,
    showDenyButton: true,  showCancelButton: true,  
    confirmButtonText: `Yes`,  
    denyButtonText: `No`,
  }).then((result) => {  
      if (result.isConfirmed) {    
        Swal.fire('Saved!', '', 'success')  
      } else if (result.isDenied) {    
        Swal.fire('Changes are not saved', '', 'info')  
     }
  });
}
const getInputValue =(e) => {
  setInput(e.target.value)
}
console.log('input valueee',input)
  return (
    <div>
    <div className="modal-wrapper">
      
          <div className="select-option">
            <select className="select"
             onClick={findSpecificProduct}>
                <option>Select a Product </option>   
              {data.map((sec)=>    
                 <option 
                  value = {sec.code}
                  >{sec.name}
                 </option>
                 )}
             </select> 
        </div>
           <div>
            <input onKeyUp={getInputValue} className='input-modal' type="text" placeholder="used milage"></input>
           </div>
           <hr></hr>
           <Button variant="secondary">No</Button>{' '}
           <Button onClick={confirmReturn} variant="success">Yes</Button> 
          </div>
    </div>
  )
};

export default RentalReturn