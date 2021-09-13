import React, { useState } from 'react'
import data from './data/Data.json'
import {Button, Modal } from 'react-bootstrap'
import BookRental from './components/BookRental'
import RentalReturn from './components/RentalReturn';

function App() {

  const [rentalShow, setRentalShow] = useState(false);
  const handleRentalClose = () => setRentalShow(false);
  const handleRentalShow = () => setRentalShow(true);

  const [returnShow, setReturnShow] = useState(false);
  const handleReturnClose = () => setReturnShow(false);
  const handleReturnShow = () => setReturnShow(true);
     
  const tableSearch = () => {

    let input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("searchTable");
    tr = table.getElementsByTagName("tr");

    for(let i =0; i<tr.length; i++){
       td = tr[i].getElementsByTagName("td")[1];
       if(td) {
           txtValue = td.textContent || td.innerText;
           if(txtValue.toUpperCase().indexOf(filter)> -1){
               tr[i].style.display = "";
           } else {
               tr[i].style.display = "none";
           }
       } 
    }
}
  return (
    <div>

    <div className="container">
      <header className='row center'>
        <h1>Rental Application</h1>
        </header>
     <main>

      <div className='row end'>
         <input className='input' onKeyUp={tableSearch} type='text' id="searchInput" placeholder='search by name'></input>
       </div>
       <div className='main row center'>
          <table id="searchTable" className='table' data-filter-control="true" data-show-search-clear-button='true'> 
             <thead>
               <th>SL.No. </th>
               <th>Name </th>
               <th>Type </th>
               <th>Availability </th>
               <th>Need Repair </th>
               <th>Durability </th>
               <th>Max.Durability </th>
               <th>Milage</th>
               <th>Price </th>
               <th>Min.Rent.Period</th>
             </thead>
             <tbody>
               {data.map((product,index) => {
                 return(
                  <tr key={product.code}> 
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.type}</td>
                  <td>{product.availability ? 'true' : 'false'} </td>
                  <td>{product.needing_repair ? 'true' : 'false'}</td>
                  <td>{product.durability}</td>
                  <td>{product.max_durability}</td>                  
                  <td>{product.mileage}</td>                 
                  <td>{product.price}</td>                 
                  <td>{product.minimum_rent_period}</td> 
                 </tr> 
                 )
               })}
            </tbody>
          </table>
         </div> 

         <div class="row">
          <div class="col text-center">
          <Button  onClick={handleRentalShow} variant="success">Book</Button>{' '}
          <Button onClick={handleReturnShow} variant="primary">Return</Button>
          </div>
        </div>

        <Modal show={rentalShow} onHide={handleRentalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book a product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <BookRental />   
         </Modal.Body>
        <Modal.Footer>
           <Button variant="primary" onClick={handleRentalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal> 
      

      <Modal show={returnShow} onHide={handleReturnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Return a product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <RentalReturn />   
         </Modal.Body>
        <Modal.Footer>
           <Button variant="primary" onClick={handleReturnClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

         </main>
       </div>
   </div>
  );
}

export default App;
