/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { Compile, Decoup,BinToMnem } from '../Logic/Logic/src/functions.js';
import "./Code.css"; // import the external CSS file
import Navbar from '../components/Navbar';
import Button from '../components/Buttonn'
import Side from '../components/side'
import next from '../Images/next.svg'
import { Link } from 'react-router-dom';
import Btn_simule from '../components/Btn_simuler2.js';

const ButoStyle={
  background: '#00A6FB',
position:'absolute',
width:'148px',
gridArea:'sauv'
}

function Code(props) {
  const [base,setBase]=useState("")
  // const handleClick1= (event)=>{
  //   if (event.target.textContent=="HEX") 
  //   {
  //     event.target.textContent="BIN"
  //   }
  //   else{event.target.textContent="HEX"}
  // }
    const [textareaValue, setTextareaValue] = useState("");
    const [textareaValue1, setTextareaValue1] = useState("");
    const handleTextareaChange = (event) => {
      setTextareaValue(event.target.value);
    };
    const handleTextareaChange1 = (event) => {
      setTextareaValue1(event.target.value);
    };
   
  useEffect(() => {
   //---------Loading the content of a file clicked"----------------
    console.log("buttonClicked:", localStorage.getItem("buttonClicked"));
    const storedTextareaValue = localStorage.getItem("filecodeHexa");
    const storedTitle = localStorage.getItem("title");
    console.log("storedTitle :",storedTitle);
    const storedTextareaValue1 = localStorage.getItem("filecodeMemo");
    const buttonClicked = localStorage.getItem("buttonClicked");
    if (buttonClicked === null) {
      localStorage.setItem("buttonClicked", "false");
    }
    if (buttonClicked === "true") {
      setTextareaValue(storedTextareaValue || "");
      setTextareaValue1(storedTextareaValue1 || "");
      console.log("ani ndkhol");
    }
    localStorage.setItem("buttonClicked", "false");


       //-----------------------------------------------------------------------------------------------//
              //--------------------------------------------------------------------------------\\
       //-----------------------------------------------------------------------------------------------//

  
  //  var simuler=document.querySelector('#btn2');
  //  let compiled=false;
  //  simuler.addEventListener('click',()=>
  //  {
  //   if(compiled===false)
  //   {
  //     localStorage.setItem("compiled", "false");
  //     throw new Error ('compile first');
  //   }
  //   else
  //   {
  //     localStorage.setItem("compiled", "true")
  //   }
  //  })
  

   let binary='';
    var codes=document.getElementsByTagName('textarea');
    let compiler=document.querySelector('.container2 .button');

    /*************************************    CONERSION EN BINAIRE   ************************/
    /***************************************************************************************/
    let mnemonique='';

    compiler.addEventListener('click',()=>
    {
      if(codes[0].value!=='' && codes[1].value!=='')
      {
      document.querySelector('#btn2').style.visibility='visible';
      }
      binary=codes[1].value.split('\n');
      if(codes[1].readOnly===false)
      {
        mnemonique = ''; // Reset the mnemonique variable
        for(let i=0;i<binary.length;i++)
        {
          binary[i]= parseInt(binary[i],16).toString(2);  
          if(binary[i].length<16)
          {
              binary[i]= binary[i].padStart(16,0);    
          }
        }
        for(let i=0;i<BinToMnem(binary).length;i++)
        {
          mnemonique+=BinToMnem(binary)[i] + '\n';
        }
        codes[0].value=mnemonique;
      }
    })
    
  

    
    /************************************************************************************************* */
/******************************************************** POP UP IN ****************************************************************** */

    document.querySelector('.buttons .button').addEventListener('click',()=>
    {
    document.querySelector('.body').classList.add('hide_bg');
    document.querySelector('#pop_up').style.visibility="visible";
    })
   document.querySelector('#submit').addEventListener('click',()=>
   {

    if (document.querySelector('.Title').value!=='')
    {
      document.querySelector('#pop_up').style.visibility="hidden";
      document.querySelector('.body').classList.remove('hide_bg');
      // document.querySelector('.Title').value='';
    }
   }
   );
   document.querySelector('.Title').addEventListener('input', ()=>
   {
   
   })


 /************************************************************************************************* */
/**************************************************************************************************/


  codes[0].addEventListener('click', () => 
  {

    if( codes[1].value!=='' ) 
    {
      // codes[0].readOnly = true;
      codes[1].readOnly = false;
      codes[0].readOnly = true;
    }

    else  
     {
      codes[0].readOnly = false;
      codes[1].readOnly = true;
    }

  })
  codes[1].addEventListener('click', () => 
  {
  if(codes[0].value!=='' ) 
  {
    codes[1].readOnly=true;
    codes[0].readOnly = false;
  }
  else
  {
    codes[1].readOnly = false;
    codes[0].readOnly = true;    
  }
  }) 
  
  }, []); // This empty array as a second argument ensures that the effect is only run once when the component mounts
  

  const saveFile = (textareaValue, textareaValue1) => {
    console.log(textareaValue);
    console.log(textareaValue1);
    localStorage.setItem('textareaValue', textareaValue);
    localStorage.setItem('textareaValue1', textareaValue1);
    const storedTitle = localStorage.getItem("title");
  
    // check if the storedTitle is "ET"
    if (storedTitle === "ET" || storedTitle === "OU" || storedTitle === "NON" || storedTitle === "ADD" || storedTitle === "SUB"|| storedTitle === "DIV"|| storedTitle === "BCV" || storedTitle === "LOOP" || storedTitle === "PERMUT" || storedTitle === "SHIFT LEFT"|| storedTitle === "SHIFT RIGHT") 
    {
      return;
    }
  
    const file = {
      "title": storedTitle, 
      "codeHexa": textareaValue,
      "codeMemo": textareaValue1,
    };
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log('currentUser:', storedUser);
    console.log('currentUser_id:', storedUser._id);
    const storedCodeId = localStorage.getItem("storedCode.id");
    console.log("storedCode.id:",storedCodeId);
  
    // Check if there is already a code with the same title for the current user
    axios
      .get(`/users/${storedUser._id}/codes/${storedCodeId}`)
      .then((response) => {
        const existingCode = response.data.title === file.title ? response.data : undefined;
        let exist = false;
        if (existingCode !== undefined) {
          exist = true;
        }
        console.log ("existingCode:", existingCode);
  
        if (exist === true) {
          axios
            .put(`/users/${storedUser._id}/codes/${storedCodeId}`, file)
            .then((response) => {
              console.log("API call successful:", response);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          axios
            .post(`/users/${storedUser._id}/codes`, file)
            .then((response) => {
              console.log("API call successful:", response);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        axios
          .post(`/users/${storedUser._id}/codes`, file)
          .then((response) => {
            console.log("API call successful:", response);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };

  
    return(
      <div >
        <div className='body'>
          <Navbar label="Simulation" />
        <br></br>         <br></br>
        <br></br>
        <div className='hugecontainer'>
       <div className='Bigcontainer'>
       {/* buttons in top *************** */}
        <div className="buttons">
        <Button className='sauvegarder1' text="Sauvegarder" style={ButoStyle} onClick={() => saveFile(textareaValue,textareaValue1)} ></Button>
        <Button link="/files" text="Fichiers" style={{background:'#F8F9FA',color:'#023047',position:'absolute',width:'148px',gridArea:'exem'}}></Button>
        </div>
        {/**************************/} 
   <div className="container">
         {/* <Side className="textarea" textareaValue={textareaValue} handleTextareaChange={handleTextareaChange}></Side> */}
      <div>
      <div className='blue_box'> fzejsn </div>
           <textarea className="textarea" placeholder='Veuillez saisir le code en mnémonique'></textarea>
         </div>
      <div>
         <div className='blue_box'>
      <div className='hex'>Hex</div>          </div>  <textarea className="textarea" placeholder='Veuillez saisir le code en Hexa'></textarea>
         </div>         {/* <div className="base" >HEX</div> */}
         {/* <Side className="textarea" textareaValue={textareaValue1} handleTextareaChange={handleTextareaChange1}></Side> */}
        
           </div>             
             </div>      
        <script src="myscripts.js"></script>      
      </div>
    
      <div className="container2">    
      <Button onClick={props.handleClick} id="btn1" text="Compiler" style={{ fontSize: '16px', background: '#F8F9FA', color: '#023047',border:'1px solid #00A6FB',padding: '12px 24px'}}></Button>
      <Link to="/code/Simulation">
        <div id="btn2" onClick={props.handleToggle}>
          Simuler
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.454505 1.2045C0.893845 0.765165 1.60616 0.765165 2.0455 1.2045L8.0455 7.2045C8.48483 7.64384 8.48483 8.35616 8.0455 8.7955L2.0455 14.7955C1.60616 15.2348 0.893845 15.2348 0.454505 14.7955C0.015165 14.3562 0.015165 13.6438 0.454505 13.2045L5.65901 8L0.454505 2.7955C0.015165 2.35616 0.015165 1.64384 0.454505 1.2045Z" fill="#F8F9FA"/>
  </svg>
  
        </div></Link>

{/* <Btn_simule></Btn_simule>       */}
      </div>
          <div className='compiled' >
          </div>
          <br></br>
          <hr>
          </hr>
       
          </div>
          <div id='pop_up'>
          <textarea className='Title' placeholder='Veuillez entrez le titre du programme' >
           </textarea>
           <br></br>
           <button id='submit'> 
               Soumettre
           </button>
          </div>
           </div>
         
    );
}
export default Code;