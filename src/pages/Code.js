import React, { useEffect } from 'react';
import "./style.css"; // import the external CSS file
// import img1 from './Ellipse 515.png';
// import img2 from './Icon.png';
import { Link } from 'react-router-dom';
function Code() {
  useEffect(() => {
    var form=document.querySelector('textarea');
    var simuler=document.getElementById('btn2');
    var compile=document.getElementById('btn1')
    let time_compile=0;
    let nb = 1;
    let time_simule=0;
    form.addEventListener('keydown', ()=>{
        let nb_lignes=document.createElement('div');
        nb++;

    })
    simuler.addEventListener('click',()=>
    {
        console.log(form.value);
        form.value='';
        // location.reload();
            checkorder();
    })
    compile.addEventListener('click',()=>
    {
       time_compile=Date.now();
       checkorder();
    })
    function checkorder()
    {
        if(time_compile>time_simule)
        {
            console.log('le code a été bien compilé');  
        }
        else
        {
       throw new Error('Veuillez compiler le code avant la simulation')   
        }
    }  }, []); // This empty array as a second argument ensures that the effect is only run once when the component mounts
    return(
      <div>
        <div className="mini_nav">
          <div className="side_bar"></div>
          <h1 style={{ display: "inline", marginTop: "15px",marginLeft:"60px" }}>Simulation</h1>
          <div className="icon">
            <span>
              {" "}
              {/* <img src={img2} style={{ height: "30px" }}/>{" "} */}
            </span>
            <span>
              {" "}
              {/* <img src={img1} alt="icon"  style={{ height: "30px" }}/>{" "} */}
            </span>
          </div>
        </div>
        <div className="buttons">
          <button className="button" id="btn1">
            Compiler
          </button>
          <button style={{position:'',bottom:""}} className="button" id="btn2">
          <a href='./Simulation' style={{ color:'white' }}> simuler {" > "}</a> 
          </button>
        </div>
        <br /> <br /> <br />
        <div className="container">
          <div style={{ width: "35%" }}></div>
          <textarea
            style={{ resize: "none", border: "2px solid #00A6FB" }}
            className="box"
            placeholder="Veuillez saisir votre code"
          ></textarea>
          <div style={{ width: "30%" }} className="container2">
            <button className="button" id="btn2">
              Sauvegarder
            </button>
            <button className="button" id="btn3">
              Exemples
            </button>
            <button className="button" id="btn4">
              Mes programmes
            </button>
          </div>
        </div>
        <br /> <br />
        <form id="myForm">
          <br />
        </form>
        <script src="myscripts.js"></script>      
      </div>
    );
}
export default Code;
