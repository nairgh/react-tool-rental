import React,{ useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import data from '../data/Data.json'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button } from 'react-bootstrap'
const MySwal = withReactContent(Swal)

const BookRental = () => {
  
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());
  const [ code, setCode ] = useState('')
  const [ price, setPrice ] = useState(null)
  const [ item, setItem] = useState(null)

  const formatDate=(date)=> {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      return [ month,day,year].join('/');
  }

  const startDate = formatDate(selectedDateFrom)
  const endDate = formatDate(selectedDateTo)
  
  const findSpecificProduct = (e) => {
    for(const x of data){
        if(x.code === e.target.value){
           setCode(e.target.value);
           setPrice(x.price)
           setItem(x.name)
        }
    }
};

  const findDays =(startDate, endDate) => {
  const dt1 = new Date(startDate)
  const dt2 = new Date(endDate)
  var start = Math.floor(dt1.getTime() / (3600 * 24 * 1000)); //days as integer
  var end = Math.floor(dt2.getTime() / (3600 * 24 * 1000)); //days as integer 
  var daysDiff = end - start; // exact dates
  return daysDiff
}

const rentalDays = findDays(startDate, endDate);
const estPrice = (price * rentalDays)

const confirmRental =() =>{
  MySwal.fire({  
    title: 
    <p> Your Estimated Total is : { estPrice } <br></br>
        Product Name : { item } <br></br>
        No of Days :{ rentalDays }
    </p>,
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
  return (
         <div>
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

            <div className ="flex-container">
               <div><b>From :</b></div>
                  <div>
                      <DatePicker className='input-dt'
                      selected={selectedDateFrom} 
                      onChange={dateFrom => setSelectedDateFrom(dateFrom)}
                      dateFormat='dd/MM/yyyy'
                      minDate={new Date()}
                      showYearDropdown
                      scrollableMonthYearDropdown
                      />
                 </div>
               <div><b>To :</b></div>
               <div>
                    <DatePicker className='input-dt'
                        selected={selectedDateTo} 
                        onChange={dateTo => setSelectedDateTo(dateTo)}
                        dateFormat='dd/MM/yyyy'
                        minDate={new Date()}
                        showYearDropdown
                        scrollableMonthYearDropdown
                        />
               </div>
            </div>
              <div className="buttonContainer">
             <Button variant="secondary">No</Button>{' '}
             <Button onClick={confirmRental} variant="success">Yes</Button>
             </div>
            </div>
  )
};

export default BookRental