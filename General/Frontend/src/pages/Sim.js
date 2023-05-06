import React, { createElement, useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import Code from './Code';
import { createRoot } from 'react-dom/client';
import Simulation from './Simulation';
import Navbar from '../components/Navbar';
import Button from '../components/Buttonn'
import Side from '../components/side'
import next from '../Images/next.svg'
import { Link } from 'react-router-dom';
import { RimEual1, RimToUc } from '../ComponentsArchi/yellow';
import ReactDOM from 'react-dom';
import Mot16 from '../Logic/Logic/src/Mot16.js';
import Flags from '../Logic/Logic/src/Flags.js';
import Instructions from '../Logic/Logic/src/Instructions';
import ACC from '../Logic/Logic/src/Registres/ACC.js';
import BX from '../Logic/Logic/src/Registres/BX.js';
import DX from '../Logic/Logic/src/Registres/DX.js';
import CX from '../Logic/Logic/src/Registres/CX.js';
import SI from '../Logic/Logic/src/Registres/SI.js';
import RI from '../Logic/Logic/src/Registres/RI.js';
import RIM from '../Logic/Logic/src/Registres/RIM.js';
import RAM from '../Logic/Logic/src/Registres/RAM.js';
import CO from '../Logic/Logic/src/Registres/CO.js';
import bus_adresses from '../Logic/Logic/src/bus_adresse.js';
import bus_donnees from '../Logic/Logic/src/bus_donnes.js';
import memoire from '../Logic/Logic/src/memoire.js';
import Pile from '../Logic/Logic/src/Pile.js';
import UAL from '../Logic/Logic/src/UAL.js';
import UniteCommandes from '../Logic/Logic/src/UNiteCommandes.js';
import mot_mem from '../Logic/Logic/src/mot_mem.js';
import Machine from '../Logic/Logic/src/Machine.js';
import "../ComponentsArchi/Light.css"
import { CoRam } from '../ComponentsArchi/yellow';
import { BinToMnem, Compile, Coprnd, Decoup, reg } from '../Logic/Logic/src/functions.js';
import ACCUal from '../ComponentsArchi/LightACCUal';
import { render } from 'react-dom';
import LightCoRam from '../ComponentsArchi/LightCoRam';
import LightRimEual1 from '../ComponentsArchi/LightRimEual1';
import LightRimUc from '../ComponentsArchi/LightRimUc';
import { MyFun } from '../ComponentsArchi/yellow';
export function Sim() {
    /// initialisation des instances de classes
    const mot16 = new Mot16("0000000000000000");
    const mot = new Mot16("0000000000000111");
    const flags = new Flags(new Mot16("0000000000000000"));
    const Acc = new ACC(mot);
    const bx = new BX(new Mot16("0000000000000000"));
    const dx = new DX(new Mot16("0000000000000000"));
    const cx = new CX(new Mot16("0000000000000000"));
    const si = new SI(new Mot16("0000000000000000"));
    const ri = new RI(new Mot16("0000000000000000"));
    const rIM = new RIM(new Mot16("0000000000000000"));
    const rAM = new RAM(new Mot16("0000000000000000"));
    const co = new CO(new Mot16("0000000000000000"));
    const busAdr = new bus_adresses("0000000000000000");
    const busData = new bus_donnees("0000000000000000");
    let arr1 = []
    const pile = new Pile(arr1, 0)
    const ual1 = new Mot16("0000000000000000")
    const ual2 = new Mot16("0000000000000000")
    const uAl = new UAL(ual1, ual2);
    const uc = new UniteCommandes(null, null, null, null)
    let mem = new Array(65536)
    let [Memoire, setMemoire] = useState(new memoire(mem))

    let [machine, setMachine] = useState(new Machine(uc, Acc, ri, si, dx, bx, co, cx, rIM, rAM, busAdr, busData, flags, uAl, Memoire, pile))

    //const UC = new UniteCommandes(null, null, null, null);     
    for (let index = 0; index < mem.length; index++) {
        mem[index] = new mot_mem(index, "0000000000000000")
    }
    //*************************************************************************** */
    const [showPageOne, setShowPageOne] = useState(false); // to determine which page to show
    const [comp, setComp] = useState(false) // yo determine if code is compiled or no

    const ramm = useRef("0000")
    const rimm = useRef("0000")
    const rii = useRef("0000")
    const ual = useRef("0000")
    const uall = useRef("0000")
    const acc = useRef(Acc.value.hexa)
    const si1 = useRef("0000")
    const dx1 = useRef("0000")
    const bx1 = useRef("0000")
    const cx1 = useRef("0000")
    const flags1 = useRef("0000")
    const pile1 = useRef([])
    const [time, setTime] = useState(1000)
    const timeRef = useRef(0);
    const coo = useRef("0000")
    const table = useRef([])
    const tableR = useRef([])
    const tableR2 = useRef([])
    const tableR3 = useRef([])
    const tableAc = useRef([])
    const tableUal = useRef([])
    const tableUal2 = useRef([])
    const tableSi = useRef([])
    const tableDx = useRef([])
    const tableBx = useRef([])
    const tableCx = useRef([])
    const tableFlags = useRef([])
    const tablePile = useRef([])
    let [fo, setFo] = useState("0000")//poyr co
    let [fo1, setFo1] = useState("0000")//pour ram
    let [fo2, setFo2] = useState("0000")//pour rim
    let [fo3, setFo3] = useState("0000")//pour ual
    let [fo4, setFo4] = useState(Acc.value.hexa)//pour acc
    let [fo5, setFo5] = useState("0000")//pour ual
    let [fo6, setFo6] = useState("0000")//pour uall
    let [fo7, setFo7] = useState("0000")//pour si
    let [fo8, setFo8] = useState("0000")//pour dx
    let [fo9, setFo9] = useState("0000")//pour bx  
    let [fo10, setFo10] = useState("0000")//pour cx
    let [fo11, setFo11] = useState("0000")//pour flags
    let [fo12, setFo12] = useState([])//pour pile
    const [coor, setCoor] = useState([]);
    const myRef = useRef(null);
    const myRef1 = useRef(null);
    const [element, setElement] = useState([])
    const elem = useRef([])
    const pos = useRef({ x: 0, y: 0 })
    const tabPos = useRef([])
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const pos1 = useRef({ x: 0, y: 0 })
    const tabPos1 = useRef([])
    const [position1, setPosition1] = useState({ x: 0, y: 0 })
    const addChildComponent = (here) => {
        elem.current.push(here)
        setElement(elem.current)
    };
    const HandleClick = (event) => {
        let phrases = Compile(Decoup(document.querySelector('textarea').value))
        setComp(true)
        let adr = 0
        let arr = []

        for (let index = 0; index < phrases.length; index++) {
            const element = phrases[index]
            if (Array.isArray(element)) {
                for (let i = 0; i < element.length; i++) {
                    let value = element[i];
                    hexx.push(parseInt(value, 2).toString(16).padStart(4, "0"))
                    setHexx(hexx)
                    const motmem = new mot_mem(adr, value)
                    arr.push(motmem)
                    adr = adr + 1
                }
            }
            else {
                arr.push(new mot_mem(adr, element))
                hexx.push(parseInt(element, 2).toString(16).padStart(4, "0"))
                setHexx(hexx)
                adr = adr + 1
            }
        }
        for (let index = 0; index < hexx.length; index++) {
            const element = hexx[index];
            hexx[index] = element.split("")
        }
        setHexx(hexx)
        mem.splice(0, arr.length, ...arr)
        let Mem = new memoire(mem)
        setMemoire(Mem)
        setMachine(new Machine(uc, Acc, ri, si, dx, bx, co, cx, rIM, rAM, busAdr, busData, flags, uAl, Memoire, pile))
        console.log(machine)
        console.log(hexx)
    }
    /*********************************************** */
    const Traiter = (Machine) => {
        let Co = Machine.CO
        let busAdr = Machine.bus_adresse
        let busData = Machine.bus_donnes
        let Mem = Machine.memoire
        var RI = Machine.RI
        let here
        let som = 0
        // treating instructions from ADD to CMP in UAL
        /****************************************** */
        if (parseInt(Machine.UC.Cop, 2) < 2 || parseInt(Machine.UC.Cop, 2) == 4 || (parseInt(Machine.UC.Cop, 2) >= 6 && parseInt(Machine.UC.Cop, 2) <= 10)) {
            Machine.UAL.UAL2 = Mode[parseInt(Machine.UC.Mod, 2)](Machine, Machine.UC.reg, Machine.UC.C, time).value
            Machine.UAL.UAL1 = Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]].value
           
            tableUal.current.push(Machine.UAL.UAL1.hexa)
           
                
                let x12 = myRef1.current.getBoundingClientRect().left;//x1 we get actual position of the element
                let y12 = myRef1.current.getBoundingClientRect().top;//y1 we get actual position of the element
                let x22 = document.querySelector('.RegToBusDonnees .triangleHaut').getBoundingClientRect().left;
                let y22 = document.querySelector('.RegToBusDonnees .triangleHaut').getBoundingClientRect().top;
                
                tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
                setTimeout(() => {
                    
                    pos1.current = tabPos1.current.shift()//we get the first element of the array
                    setPosition1(pos1.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    
                    myRef1.current.style.opacity = '60%'
                }, timeRef.current);
                timeRef.current += 500

                
                y22 = document.querySelector('.RimBusDonnees .rectangle').getBoundingClientRect().top;
                
                tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
                setTimeout(() => {
                    
                    pos1.current = tabPos1.current.shift()//we get the first element of the array
                    setPosition1(pos1.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                
                x22 = document.querySelector('.EualsBusDonnees .triangleHaut').getBoundingClientRect().left;
                
                tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
                setTimeout(() => {
                    
                    pos1.current = tabPos1.current.shift()//we get the first element of the array
                    setPosition1(pos1.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 1000
                
                y22 = document.querySelector('.BusEuals').getBoundingClientRect().top;
                
                tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
                setTimeout(() => {
                    
                    pos1.current = tabPos1.current.shift()//we get the first element of the array
                    setPosition1(pos1.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                x22 = document.querySelector('#Eual1 #eual2').getBoundingClientRect().left;
               
                
                tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
                setTimeout(() => {
                   
                    pos1.current = tabPos1.current.shift()//we get the first element of the array
                    setPosition1(pos1.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 1000
            
                setTimeout(() => {
                  document.querySelector('.Eual1').classList.add('boxShadowBlue');
                  
                  
                ual.current = tableUal.current.shift()
                
                setFo5(ual.current)
                  //document.querySelector('#Eual2').classList.add('boxShadowBlue');
                }, timeRef.current);
                    timeRef.current += 800
                setTimeout(() => {
                  document.querySelector('.Eual1').classList.remove('boxShadowBlue');
                 
                  //document.querySelector('#Eual2').classList.remove('boxShadowBlue');
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                  
                  myRef1.current.style.opacity='0%'
                }, timeRef.current);  
            
            timeRef.current += 1000

            setTimeout(() => {
                // here.className = "Eual"
                // here = document.querySelector("#Eual1")
                // here.className = "Eual"
                here = document.querySelector(".UAL")
                here.className = "UAL boxShadowBlue"
            }, timeRef.current)
            timeRef.current += 1000
            setTimeout(() => {
                here.className = "UAL"}, timeRef.current)
            timeRef.current += 1000
            Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]].value = new Mot16(Machine.UAL.executer(Machine.UC.Coprnd[parseInt(Machine.UC.Cop, 2)], Machine.Flags))
            tableAc.current.push(Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]].value.hexa)
            setTimeout(() => {
                acc.current = tableAc.current.shift()
                setFo4(acc.current)
            }, timeRef.current)
            timeRef.current += 1000

        }
        else if (parseInt(Machine.UC.Cop, 2) == 2 || parseInt(Machine.UC.Cop, 2) == 3 || parseInt(Machine.UC.Cop, 2) == 5) {

            Machine.UAL.UAL1 = Mode[parseInt(Machine.UC.Mod, 2)](Machine, Machine.UC.reg, Machine.UC.C).value
            Machine.UAL.UAL2 = Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]].value

            Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]].value = new Mot16(Machine.UAL.executer(Machine.UC.Coprnd[parseInt(Machine.UC.Cop, 2)], Machine.Flags))
            let mM = new mot_mem(Machine.RAM.value.entier, new Mot16("0000000000000000"))
            if (parseInt(Machine.UC.Mod, 2) == 1 || parseInt(Machine.UC.Mod, 2) == 2 || parseInt(Machine.UC.Mod, 2) >= 4) {
                Instructions.MOV(Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]], mM, Machine)
            }
        }
        else if (parseInt(Machine.UC.Cop, 2) == 11) {
            Machine.UAL.UAL2 = Mode[parseInt(Machine.UC.Mod, 2)](Machine, Machine.UC.reg, Machine.UC.C).value
            Machine.UAL.UAL1 = Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]].value
            Machine.UAL.executer(Machine.UC.Coprnd[parseInt(Machine.UC.Cop, 2)], Machine.Flags)
        }
        //***************************************************** */
        //treating RAZ
        else if (parseInt(Machine.UC.Cop, 2) == 12) {
            Instructions.RAZ(Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]].value, Machine.Flags)
        }
        //***************************************************** */
        // treating instructions from SHL to ROR 
        else if (parseInt(Machine.UC.Cop, 2) >= 13 && parseInt(Machine.UC.Cop, 2) < 17) {
            let i = new Mot16(Machine.UC.C.padStart(16, "0"))
            Machine.UAL.UAL2 = i
            Machine.UAL.UAL1 = Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]].value
            Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]].value = new Mot16(Machine.UAL.executer(Machine.UC.Coprnd[parseInt(Machine.UC.Cop, 2)], Machine.Flags))
        }
        //***************  LOOP UNTIL CX==0 ***************** */
        else if (parseInt(Machine.UC.Cop, 2) == 17) {
            let op = Mode[0](Machine, Machine.UC.reg, Machine.UC.C).value
            if (Machine.CX.value.entier == 0) {
                //Co.incCO()
            } else {
                const flags = new Flags(new Mot16("0000000000000000"))
                Co.value = new Mot16(Instructions.DEC(op, flags))
                Machine.CX.DecCX()
            }
        }
        /** BCV */
        else if (parseInt(Machine.UC.Cop, 2) == 18) {
            let op2 = Mode[0](Machine, Machine.UC.reg, Machine.UC.C).value
            let op1 = parseInt(Machine.UC.C, 2)
            if (Instructions.BCV(op1, Machine.Flags)) {
                Co.value = new Mot16(Instructions.DEC(op2, new Flags(new Mot16("0000000000000000"))))
            }
        }
        /**BCF */
        else if (parseInt(Machine.UC.Cop, 2) == 19) {
            let op2 = Mode[0](Machine, Machine.UC.reg, Machine.UC.C).value
            let op1 = parseInt(Machine.UC.C, 2)
            if (Instructions.BCF(op1, Machine.Flags)) {
                Co.value = new Mot16(Instructions.DEC(op2, new Flags(new Mot16("0000000000000000"))))
            }
        }
        else if (parseInt(Machine.UC.Cop, 2) == 20) {
            Machine.ACC = Instructions.ENT(Machine.Flags)
        }
        else if (parseInt(Machine.UC.Cop, 2) == 21) {
            Instructions.SOR(Machine.ACC.value)
        }
        /**MOV */
        else if (parseInt(Machine.UC.Cop, 2) == 22) {
            Instructions.MOV(Mode[parseInt(Machine.UC.Mod, 2)](Machine, Machine.Machine.UC.reg, Machine.UC.C), Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]], Machine)

        }
        else if (parseInt(Machine.UC.Cop, 2) == 23) {
            Instructions.CHM(Mode[parseInt(Machine.UC.Mod, 2)](Machine, Machine.UC.reg, Machine.UC.C).value, Machine)
        }
        else if (parseInt(Machine.UC.Cop, 2) == 24) {
            Instructions.RGM(Mode[parseInt(Machine.UC.Mod, 2)](Machine, Machine.UC.reg, Machine.UC.C).value, Machine)
        }
        /**PUSH/POP */
        else if (parseInt(Machine.UC.Cop, 2) == 25) {
            let op = Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]].value
            Instructions.PUSH(Machine.pile, op)
        }
        else if (parseInt(Machine.UC.Cop, 2) == 26) {
            let op = Machine[Machine.UC.reg[parseInt(Machine.UC.R1, 2)]]
            Machine.bus_donnes.transferer(Instructions.POP(Machine.pile), op)
        }

    }
    /***********************************888888888888888 */
    let Mode = [function Imm(Machine, reg, C, time, elements) {
        var Co = Machine.CO
        var busAdr = Machine.bus_adresse
        var busData = Machine.bus_donnes
        var Mem = Machine.memoire
        var RI = Machine.RI
        let blue
        let som = 0
        Co.incCO()//incrementer le compteur ordinal
        table.current.push(Co.value.hexa)
                console.log(table.current)
                setTimeout(() => {
                    coo.current = table.current.shift()
                    setFo(coo.current)
                    blue = document.querySelector(".Co")
                    console.log(blue)
                    blue.className = "Co boxShadowBlue"
                }, timeRef.current)
                timeRef.current += 500

                machine.bus_adresse.transferer(Machine.CO, Machine.RAM)//co->RAM
                tableR.current.push(Machine.RAM.value.hexa)
                
                //******************************88 */
                let x1 = myRef.current.getBoundingClientRect().left;//x1 we get actual position of the element
                let y1 = myRef.current.getBoundingClientRect().top;//y1 we get actual position of the element
                let x2 = document.querySelector('.BusCo .rectangle').getBoundingClientRect().left;//destination position
                let y2 = document.querySelector('.BusCo .triangleHaut').getBoundingClientRect().top;//destination position
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    myRef.current.style.opacity = '60%'
                }, timeRef.current);
                timeRef.current += 500
                setTimeout(() => {
                    blue.className = "Co"
                }, timeRef.current)
                timeRef.current += 500
                y2 = document.querySelector('.CoToRam .rectangle').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1+10 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()
                    setPosition(pos.current)
                }, timeRef.current);
                timeRef.current += 800
                x2 = document.querySelector('.CoToRam .triangleDroit').getBoundingClientRect().left;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1+10 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()
                    setPosition(pos.current)
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    document.querySelector('.RAM').classList.add('boxShadowBlue');
                    ramm.current = tableR.current.shift()
                    setFo1(ramm.current)
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    document.querySelector('.RAM').classList.remove('boxShadowBlue');
                    myRef.current.style.opacity = '0%'
                }, timeRef.current);
                timeRef.current += 800
                
                setTimeout(() => {
                    // blue.className = "RAM"
                    blue = document.querySelector(".Memoire")
                    blue.className = "Memoire boxShadowBlue"
                }, timeRef.current)
                timeRef.current += 500
                machine.memoire.lecture(Machine.RAM, Machine.RIM)//lecture 
                tableR2.current.push(Machine.RIM.value.hexa)
                setTimeout(() => {
                    blue.className = "Memoire"
                    blue = document.querySelector(".rim")
                    blue.className = "rim boxShadowBlue"
                    rimm.current = tableR2.current.shift()
                    setFo2(rimm.current)
                }, timeRef.current)
                timeRef.current += 800
                //*************************************** */
                 x1 = myRef.current.getBoundingClientRect().left;
                 y1 = myRef.current.getBoundingClientRect().top;
                 console.log(myRef.current)
                 x2 = document.querySelector('.RimToRi .rectangle').getBoundingClientRect().left;
                y2 = document.querySelector('.RimToRi .triangleHaut').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    myRef.current.style.opacity = '60%'
                }, timeRef.current);
                timeRef.current += 800
                // y2 = document.querySelector('.RimBusRi .rectangle').getBoundingClientRect().top
                // tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    blue.className = "rim"
                    // pos.current = tabPos.current.shift()//we get the first element of the array
                    // setPosition(pos.current)//we set the position of the element
                }, timeRef.current);    
                timeRef.current += 1000
                tableUal2.current.push(Machine.RIM.value.hexa)
           
           
                x2 = document.querySelector('.RimToRi .rectangle').getBoundingClientRect().left;
                y2 = document.querySelector('.RimToRi .triangleHaut').getBoundingClientRect().top;
                
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    myRef.current.style.opacity = '60%'
                   
                }, timeRef.current);
                timeRef.current += 500

                y2 = document.querySelector('.RimBusDonnees .rectangle').getBoundingClientRect().top;
               
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                }, timeRef.current);
                timeRef.current += 800
                x2 = document.querySelector('.EualsBusDonnees .rectangle').getBoundingClientRect().left;
                
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
               
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                   
                }, timeRef.current);
                timeRef.current += 1000
                y2 = document.querySelector('.BusEuals .rectangle').getBoundingClientRect().top;
                
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                }, timeRef.current);
                timeRef.current += 800
                
                x2 = document.querySelector('#Eual2 #eual2').getBoundingClientRect().left
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                   
                }, timeRef.current);
                timeRef.current += 1000
            
                setTimeout(() => {
                  //document.querySelector('.Eual1').classList.add('boxShadowBlue');
                  document.querySelector('.Eual2').classList.add('boxShadowBlue');
                  //ual.current = Machine.UAL.UAL2.hexa
                uall.current = tableUal2.current.shift()
                setFo6(uall.current)
                
                  
                }, timeRef.current);
                    timeRef.current += 800
                setTimeout(() => {
                  document.querySelector('.Eual2').classList.remove('boxShadowBlue');
                  
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                  myRef.current.style.opacity='0%'
                  
                }, timeRef.current);  
            
            timeRef.current += 1000
        return Machine.RIM //retourner la valeur de l'adresse du compteur ordinal
    }, function Drct(Machine, reg, C) {
        var Co = Machine.CO
        var busAdr = Machine.bus_adresse
        var busData = Machine.bus_donnes
        var Mem = Machine.memoire
        var RI = Machine.RI
        Co.incCO()
        table.current.push(Co.value.hexa)
                console.log(table.current)
                setTimeout(() => {
                    coo.current = table.current.shift()
                    setFo(coo.current)
                    blue = document.querySelector(".Co")
                    console.log(blue)
                    blue.className = "Co boxShadowBlue"
                }, timeRef.current)
                timeRef.current += 500

                machine.bus_adresse.transferer(Machine.CO, Machine.RAM)//co->RAM
                tableR.current.push(Machine.RAM.value.hexa)
                
                //******************************88 */
                let x1 = myRef.current.getBoundingClientRect().left;//x1 we get actual position of the element
                let y1 = myRef.current.getBoundingClientRect().top;//y1 we get actual position of the element
                let x2 = document.querySelector('.BusCo .rectangle').getBoundingClientRect().left;//destination position
                let y2 = document.querySelector('.BusCo .triangleHaut').getBoundingClientRect().top;//destination position
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    myRef.current.style.opacity = '60%'
                }, timeRef.current);
                timeRef.current += 500
                setTimeout(() => {
                    blue.className = "Co"
                }, timeRef.current)
                timeRef.current += 500
                y2 = document.querySelector('.CoToRam .rectangle').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1+10 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()
                    setPosition(pos.current)
                }, timeRef.current);
                timeRef.current += 800
                x2 = document.querySelector('.CoToRam .triangleDroit').getBoundingClientRect().left;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1+10 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()
                    setPosition(pos.current)
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    document.querySelector('.RAM').classList.add('boxShadowBlue');
                    ramm.current = tableR.current.shift()
                    setFo1(ramm.current)
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    document.querySelector('.RAM').classList.remove('boxShadowBlue');
                    myRef.current.style.opacity = '0%'
                }, timeRef.current);
                timeRef.current += 800
                
                setTimeout(() => {
                    // blue.className = "RAM"
                    blue = document.querySelector(".Memoire")
                    blue.className = "Memoire boxShadowBlue"
                }, timeRef.current)
                timeRef.current += 500
                machine.memoire.lecture(Machine.RAM, Machine.RIM)//lecture 
                tableR2.current.push(Machine.RIM.value.hexa)
                setTimeout(() => {
                    blue.className = "Memoire"
                    blue = document.querySelector(".rim")
                    blue.className = "rim boxShadowBlue"
                    rimm.current = tableR2.current.shift()
                    setFo2(rimm.current)
                }, timeRef.current)
                timeRef.current += 500
                setTimeout(() => {
                    document.querySelector('.rim').classList.remove('boxShadowBlue');}, timeRef.current);
        busData.transferer(Machine.RIM, busAdr)
        
        x2 = document.querySelector('.RimToRi .rectangle').getBoundingClientRect().left;
      y2 = document.querySelector('.RimToRi .triangleHaut').getBoundingClientRect().top;
      tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
      setTimeout(() => {
        pos.current = tabPos.current.shift()//we get the first element of the array
        setPosition(pos.current)//we set the position of the element
    }, timeRef.current);
    timeRef.current += 500
    setTimeout(() => {
        myRef.current.style.opacity = '60%'
    }, timeRef.current);
      y2 = document.querySelector('.RimBusDonnees .rectangle').getBoundingClientRect().top;
      tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
      setTimeout(() => {
        pos.current = tabPos.current.shift()//we get the first element of the array
        setPosition(pos.current)//we set the position of the element
    }, timeRef.current);
    timeRef.current += 500

      x2 = document.querySelector('.RimBusDonnees').getBoundingClientRect().left;
      tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
      setTimeout(() => {
        pos.current = tabPos.current.shift()//we get the first element of the array
        setPosition(pos.current)//we set the position of the element
    }, timeRef.current);
    timeRef.current += 500

      x2 = document.querySelector('.RamBusDonnees .rectangle').getBoundingClientRect().left;
      tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
      setTimeout(() => {
        pos.current = tabPos.current.shift()//we get the first element of the array
        setPosition(pos.current)//we set the position of the element
    }, timeRef.current);
    timeRef.current += 500

      y2 = document.querySelector('.CoToRam .rectangle').getBoundingClientRect().top;
      tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
      setTimeout(() => {
        pos.current = tabPos.current.shift()//we get the first element of the array
        setPosition(pos.current)//we set the position of the element
    }, timeRef.current);
    timeRef.current += 500

      x2 = document.querySelector('.CoToRam .triangleDroit').getBoundingClientRect().left;
      tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
      setTimeout(() => {
        pos.current = tabPos.current.shift()//we get the first element of the array
        setPosition(pos.current)//we set the position of the element
    }, timeRef.current);
    timeRef.current += 500
    busAdr.transferer(busAdr, Machine.RAM)
    tableR.current.push(Machine.RAM.value.hexa)
      setTimeout(() => {
        document.querySelector('.RAM').classList.add('boxShadowBlue');
        ramm.current = tableR.current.shift()
                    setFo1(ramm.current)
      }, timeRef.current);
        timeRef.current += 500
      setTimeout(() => {
        document.querySelector('.RAM').classList.remove('boxShadowBlue');
      }, timeRef.current);
        //timeRef.current += 800
      setTimeout(() => {
        myRef.current.style.opacity='0%'
      }, timeRef.current);  
      Mem.lecture(Machine.RAM, Machine.RIM)
       timeRef.current += 500
       setTimeout(() => {
        // blue.className = "RAM"
        blue = document.querySelector(".Memoire")
        blue.className = "Memoire boxShadowBlue"
    }, timeRef.current)
    timeRef.current += 500
    machine.memoire.lecture(Machine.RAM, Machine.RIM)//lecture 
    tableR2.current.push(Machine.RIM.value.hexa)
    setTimeout(() => {
        blue.className = "Memoire"
        blue = document.querySelector(".rim")
        blue.className = "rim boxShadowBlue"
        rimm.current = tableR2.current.shift()
        setFo2(rimm.current)
    }, timeRef.current)
    timeRef.current += 500
    setTimeout(() => {
        document.querySelector('.rim').classList.remove('boxShadowBlue');}, timeRef.current);
        tableUal2.current.push(Machine.RIM.value.hexa)
           
           
                 x2 = document.querySelector('.RimToRi .rectangle').getBoundingClientRect().left;
                 y2 = document.querySelector('.RimToRi .triangleHaut').getBoundingClientRect().top;
                
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    myRef.current.style.opacity = '60%'
                   
                }, timeRef.current);
                timeRef.current += 500

                y2 = document.querySelector('.RimBusDonnees .rectangle').getBoundingClientRect().top;
               
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                }, timeRef.current);
                timeRef.current += 800
                x2 = document.querySelector('.EualsBusDonnees .rectangle').getBoundingClientRect().left;
                
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
               
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                   
                }, timeRef.current);
                timeRef.current += 1000
                y2 = document.querySelector('.BusEuals .rectangle').getBoundingClientRect().top;
                
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                }, timeRef.current);
                timeRef.current += 800
                
                x2 = document.querySelector('#Eual2 #eual2').getBoundingClientRect().left
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                   
                }, timeRef.current);
                timeRef.current += 1000
            
                setTimeout(() => {
                  
                  document.querySelector('.Eual2').classList.add('boxShadowBlue');
                  
                uall.current = tableUal2.current.shift()
                setFo6(uall.current)
                
                  
                }, timeRef.current);
                    timeRef.current += 800
                setTimeout(() => {
                  document.querySelector('.Eual2').classList.remove('boxShadowBlue');
                  
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                  myRef.current.style.opacity='0%'
                  
                }, timeRef.current);  
            
            timeRef.current += 1000
        //busData.transferer(Machine.RIM.envoyer(),Machine.UAL.UAL1.recevoir())
        return Machine.RIM
    }, function Indrct(Machine, reg, C) {
        var Co = Machine.CO
        var busAdr = Machine.bus_adresse
        var busData = Machine.bus_donnes
        var Mem = Machine.memoire
        var RI = Machine.RI
        Co.incCO()//incrémentation de CO
        table.current.push(Co.value.hexa)
        console.log(table.current)
        setTimeout(() => {
            coo.current = table.current.shift()
            setFo(coo.current)
            blue = document.querySelector(".Co")
            console.log(blue)
            blue.className = "Co boxShadowBlue"
        }, timeRef.current)
        timeRef.current += 500

        machine.bus_adresse.transferer(Machine.CO, Machine.RAM)//co->RAM
        tableR.current.push(Machine.RAM.value.hexa)
        
        //******************************88 */
        let x1 = myRef.current.getBoundingClientRect().left;//x1 we get actual position of the element
        let y1 = myRef.current.getBoundingClientRect().top;//y1 we get actual position of the element
        let x2 = document.querySelector('.BusCo .rectangle').getBoundingClientRect().left;//destination position
        let y2 = document.querySelector('.BusCo .triangleHaut').getBoundingClientRect().top;//destination position
        tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
        setTimeout(() => {
            pos.current = tabPos.current.shift()//we get the first element of the array
            setPosition(pos.current)//we set the position of the element
        }, timeRef.current);
        timeRef.current += 800
        setTimeout(() => {
            myRef.current.style.opacity = '60%'
        }, timeRef.current);
        timeRef.current += 500
        setTimeout(() => {
            blue.className = "Co"
        }, timeRef.current)
        timeRef.current += 500
        y2 = document.querySelector('.CoToRam .rectangle').getBoundingClientRect().top;
        tabPos.current.push({ x: x2 - x1, y: y2 - y1+10 })
        setTimeout(() => {
            pos.current = tabPos.current.shift()
            setPosition(pos.current)
        }, timeRef.current);
        timeRef.current += 800
        x2 = document.querySelector('.CoToRam .triangleDroit').getBoundingClientRect().left;
        tabPos.current.push({ x: x2 - x1, y: y2 - y1+10 })
        setTimeout(() => {
            pos.current = tabPos.current.shift()
            setPosition(pos.current)
        }, timeRef.current);
        timeRef.current += 800
        setTimeout(() => {
            document.querySelector('.RAM').classList.add('boxShadowBlue');
            ramm.current = tableR.current.shift()
            setFo1(ramm.current)
        }, timeRef.current);
        timeRef.current += 800
        setTimeout(() => {
            document.querySelector('.RAM').classList.remove('boxShadowBlue');
            myRef.current.style.opacity = '0%'
        }, timeRef.current);
        timeRef.current += 800
        
        setTimeout(() => {
            // blue.className = "RAM"
            blue = document.querySelector(".Memoire")
            blue.className = "Memoire boxShadowBlue"
        }, timeRef.current)
        timeRef.current += 500
        machine.memoire.lecture(Machine.RAM, Machine.RIM)//lecture 
        tableR2.current.push(Machine.RIM.value.hexa)
        setTimeout(() => {
            blue.className = "Memoire"
            blue = document.querySelector(".rim")
            blue.className = "rim boxShadowBlue"
            rimm.current = tableR2.current.shift()
            setFo2(rimm.current)
        }, timeRef.current)
        timeRef.current += 500
        setTimeout(() => {
            document.querySelector('.rim').classList.remove('boxShadowBlue');}, timeRef.current);
busData.transferer(Machine.RIM, busAdr)//RIM->busAdr

x2 = document.querySelector('.RimToRi .rectangle').getBoundingClientRect().left;
y2 = document.querySelector('.RimToRi .triangleHaut').getBoundingClientRect().top;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
pos.current = tabPos.current.shift()//we get the first element of the array
setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500
setTimeout(() => {
myRef.current.style.opacity = '60%'
}, timeRef.current);
y2 = document.querySelector('.RimBusDonnees .rectangle').getBoundingClientRect().top;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
pos.current = tabPos.current.shift()//we get the first element of the array
setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500

x2 = document.querySelector('.RimBusDonnees').getBoundingClientRect().left;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
pos.current = tabPos.current.shift()//we get the first element of the array
setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500

x2 = document.querySelector('.RamBusDonnees .rectangle').getBoundingClientRect().left;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
pos.current = tabPos.current.shift()//we get the first element of the array
setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500

y2 = document.querySelector('.CoToRam .rectangle').getBoundingClientRect().top;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
pos.current = tabPos.current.shift()//we get the first element of the array
setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500

x2 = document.querySelector('.CoToRam .triangleDroit').getBoundingClientRect().left;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
pos.current = tabPos.current.shift()//we get the first element of the array
setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500
busAdr.transferer(busAdr, Machine.RAM)//busAdr->RAM
tableR.current.push(Machine.RAM.value.hexa)
setTimeout(() => {
document.querySelector('.RAM').classList.add('boxShadowBlue');
ramm.current = tableR.current.shift()
            setFo1(ramm.current)
}, timeRef.current);
timeRef.current += 500
setTimeout(() => {
document.querySelector('.RAM').classList.remove('boxShadowBlue');
}, timeRef.current);
//timeRef.current += 800
setTimeout(() => {
myRef.current.style.opacity='0%'
}, timeRef.current);  
//Mem.lecture(Machine.RAM, Machine.RIM)//lecture
timeRef.current += 500
setTimeout(() => {
// blue.className = "RAM"
blue = document.querySelector(".Memoire")
blue.className = "Memoire boxShadowBlue"
}, timeRef.current)
timeRef.current += 500
machine.memoire.lecture(Machine.RAM, Machine.RIM)//lecture 
busData.transferer(Machine.RIM, busAdr)//RIM->busAdr
tableR2.current.push(Machine.RIM.value.hexa)
setTimeout(() => {
blue.className = "Memoire"
blue = document.querySelector(".rim")
blue.className = "rim boxShadowBlue"
rimm.current = tableR2.current.shift()
setFo2(rimm.current)
}, timeRef.current)
timeRef.current += 500
setTimeout(() => {
document.querySelector('.rim').classList.remove('boxShadowBlue');}, timeRef.current);

x2 = document.querySelector('.RimToRi .rectangle').getBoundingClientRect().left;
y2 = document.querySelector('.RimToRi .triangleHaut').getBoundingClientRect().top;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
  pos.current = tabPos.current.shift()//we get the first element of the array
  setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500
setTimeout(() => {
  myRef.current.style.opacity = '60%'
}, timeRef.current);
y2 = document.querySelector('.RimBusDonnees .rectangle').getBoundingClientRect().top;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
  pos.current = tabPos.current.shift()//we get the first element of the array
  setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500

x2 = document.querySelector('.RimBusDonnees').getBoundingClientRect().left;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
  pos.current = tabPos.current.shift()//we get the first element of the array
  setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500

x2 = document.querySelector('.RamBusDonnees .rectangle').getBoundingClientRect().left;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
  pos.current = tabPos.current.shift()//we get the first element of the array
  setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500

y2 = document.querySelector('.CoToRam .rectangle').getBoundingClientRect().top;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
  pos.current = tabPos.current.shift()//we get the first element of the array
  setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500

x2 = document.querySelector('.CoToRam .triangleDroit').getBoundingClientRect().left;
tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
setTimeout(() => {
  pos.current = tabPos.current.shift()//we get the first element of the array
  setPosition(pos.current)//we set the position of the element
}, timeRef.current);
timeRef.current += 500
busAdr.transferer(busAdr, Machine.RAM)
console.log(Machine.RAM.value.hexa)
tableR.current.push(Machine.RAM.value.hexa)
setTimeout(() => {
  document.querySelector('.RAM').classList.add('boxShadowBlue');
  ramm.current = tableR.current.shift()
              setFo1(ramm.current)
}, timeRef.current);
  timeRef.current += 500
setTimeout(() => {
  document.querySelector('.RAM').classList.remove('boxShadowBlue');
}, timeRef.current);
  //timeRef.current += 800
setTimeout(() => {
  myRef.current.style.opacity='0%'
}, timeRef.current);  
//Mem.lecture(Machine.RAM, Machine.RIM)
 timeRef.current += 500
 setTimeout(() => {
  // blue.className = "RAM"
  blue = document.querySelector(".Memoire")
  blue.className = "Memoire boxShadowBlue"
}, timeRef.current)
timeRef.current += 500
machine.memoire.lecture(Machine.RAM, Machine.RIM)//lecture 
tableR2.current.push(Machine.RIM.value.hexa)
setTimeout(() => {
  blue.className = "Memoire"
  blue = document.querySelector(".rim")
  blue.className = "rim boxShadowBlue"
  rimm.current = tableR2.current.shift()
  setFo2(rimm.current)
}, timeRef.current)
timeRef.current += 500
setTimeout(() => {
  document.querySelector('.rim').classList.remove('boxShadowBlue');}, timeRef.current);
  tableUal2.current.push(Machine.RIM.value.hexa)
           
            
                x2 = document.querySelector('.RimToRi .rectangle').getBoundingClientRect().left;
                y2 = document.querySelector('.RimToRi .triangleHaut').getBoundingClientRect().top;
                
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    myRef.current.style.opacity = '60%'
                   
                }, timeRef.current);
                timeRef.current += 500

                y2 = document.querySelector('.RimBusDonnees .rectangle').getBoundingClientRect().top;
               
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                }, timeRef.current);
                timeRef.current += 800
                x2 = document.querySelector('.EualsBusDonnees .rectangle').getBoundingClientRect().left;
                
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
               
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                   
                }, timeRef.current);
                timeRef.current += 1000
                y2 = document.querySelector('.BusEuals .rectangle').getBoundingClientRect().top;
                
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                }, timeRef.current);
                timeRef.current += 800
                
                x2 = document.querySelector('#Eual2 #eual2').getBoundingClientRect().left
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                    
                   
                }, timeRef.current);
                timeRef.current += 1000
            
                setTimeout(() => {
                  
                  document.querySelector('.Eual2').classList.add('boxShadowBlue');
                 
                uall.current =tableUal2.current.shift()
                setFo6(uall.current)
                
                  
                }, timeRef.current);
                    timeRef.current += 800
                setTimeout(() => {
                  document.querySelector('.Eual2').classList.remove('boxShadowBlue');
                  
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                  myRef.current.style.opacity='0%'
                  
                }, timeRef.current);  
            
            timeRef.current += 1000
        //busData.transferer(Machine.RIM.envoyer(),Machine.UAL.UAL1.recevoir())
        return Machine.RIM
    }, function Reg(Machine, reg, C) {
        //busData.transferer(Machine[reg[parseInt(UC.C,2)]].envoyer(),Machine.UAL.UAL1.recevoir())
        let x12 = myRef1.current.getBoundingClientRect().left;//x1 we get actual position of the element
        let y12 = myRef1.current.getBoundingClientRect().top;//y1 we get actual position of the element
        let x22 = document.querySelector('.RegToBusDonnees .triangleHaut').getBoundingClientRect().left;
        let y22 = document.querySelector('.RegToBusDonnees .triangleHaut').getBoundingClientRect().top;
tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
        setTimeout(() => {
            
            pos1.current = tabPos1.current.shift()//we get the first element of the array
            setPosition1(pos1.current)//we set the position of the element
        }, timeRef.current);
        timeRef.current += 800
setTimeout(() => {
           
            myRef1.current.style.opacity = '60%'
        }, timeRef.current);
        timeRef.current += 500
y22 = document.querySelector('.RimBusDonnees .rectangle').getBoundingClientRect().top;
        
        tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
        setTimeout(() => {
            
            pos1.current = tabPos1.current.shift()//we get the first element of the array
            setPosition1(pos1.current)//we set the position of the element
        }, timeRef.current);
        timeRef.current += 800
x22 = document.querySelector('.EualsBusDonnees .triangleHaut').getBoundingClientRect().left;
        
        tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
        setTimeout(() => {
            
            pos1.current = tabPos1.current.shift()//we get the first element of the array
            setPosition1(pos1.current)//we set the position of the element
        }, timeRef.current);
timeRef.current += 1000
       
        y22 = document.querySelector('.BusEuals').getBoundingClientRect().top;
        
        tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
        setTimeout(() => {
            
            pos1.current = tabPos1.current.shift()//we get the first element of the array
            setPosition1(pos1.current)//we set the position of the element
        }, timeRef.current);
        timeRef.current += 800
x22 = document.querySelector('#Eual2 #eual2').getBoundingClientRect().left;
tableUal2.current.push(Machine[reg[parseInt(C, 2)]].value.hexa)
tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
        setTimeout(() => {
            
            pos1.current = tabPos1.current.shift()//we get the first element of the array
            setPosition1(pos1.current)//we set the position of the element
        }, timeRef.current);
        timeRef.current += 1000
setTimeout(() => {
          document.querySelector('.Eual2').classList.add('boxShadowBlue');
          
        uall.current = tableUal2.current.shift()
       
        setFo6(uall.current)
          
        }, timeRef.current);
            timeRef.current += 800
setTimeout(() => {
          document.querySelector('.Eual2').classList.remove('boxShadowBlue');
          
        }, timeRef.current);
        timeRef.current += 800
        setTimeout(() => {
          
          myRef1.current.style.opacity='0%'
        }, timeRef.current);  
    
    timeRef.current += 1000
        return Machine[reg[parseInt(C, 2)]]
        //here Machine[...] to can access attributes dynamically i'm not sure if it'll work
    }, function Base(Machine, reg, C) {
        var Co = Machine.CO
        var busAdr = Machine.bus_adresse
        var busData = Machine.bus_donnes
        var Mem = Machine.memoire
        var RI = Machine.RI
        busData.transferer(Machine.BX, busAdr)
        //***************************************** */
        let x12 = myRef1.current.getBoundingClientRect().left;//x1 we get actual position of the element
                let y12 = myRef1.current.getBoundingClientRect().top;//y1 we get actual position of the element
                let x22 = document.querySelector('.RegToBusDonnees .triangleHaut').getBoundingClientRect().left;
                let y22 = document.querySelector('.RegToBusDonnees .triangleHaut').getBoundingClientRect().top;
                
                tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
                setTimeout(() => {
                    
                    pos1.current = tabPos1.current.shift()//we get the first element of the array
                    setPosition1(pos1.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    
                    myRef1.current.style.opacity = '60%'
                }, timeRef.current);
                timeRef.current += 500

                
                y22 = document.querySelector('.RimBusDonnees .rectangle').getBoundingClientRect().top;
                
                tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
                setTimeout(() => {
                    
                    pos1.current = tabPos1.current.shift()//we get the first element of the array
                    setPosition1(pos1.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                x22=document.querySelector('.RamBusDonnees ').getBoundingClientRect().left;
                tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
                setTimeout(() => {
                    
                    pos1.current = tabPos1.current.shift()//we get the first element of the array
                    setPosition1(pos1.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                y22=document.querySelector('.CoToRam .rectangle ').getBoundingClientRect().top;
                tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
                setTimeout(() => {
                    
                    pos1.current = tabPos1.current.shift()//we get the first element of the array
                    setPosition1(pos1.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                x22=document.querySelector('.CoToRam .triangleDroit ').getBoundingClientRect().left;
                tabPos1.current.push({ x: x22 - x12, y: y22 - y12 })// we push the difference between the two positions
                setTimeout(() => {
                    
                    pos1.current = tabPos1.current.shift()//we get the first element of the array
                    setPosition1(pos1.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                busAdr.transferer(busAdr, Machine.RAM)
                tableR.current.push(Machine.RAM.value.hexa)
                setTimeout(() => {
                    myRef1.current.style.opacity = '0%'
                    document.querySelector('.Ram').classList.add('boxShadowBlue');
                    ramm.current = tableR.current.shift()
                    setFo1(ramm.current)
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    document.querySelector('.Ram').classList.remove('boxShadowBlue');
                    document.querySelector('.Memoire').classList.add('boxShadowBlue');}, timeRef.current);
                timeRef.current += 800
        //***************************************** */
        //busAdr.transferer(busAdr, Machine.RAM)
        
        Mem.lecture(Machine.RAM, Machine.RIM)
        tableR2.current.push(Machine.RIM.value.hexa)
        setTimeout(() => {
            document.querySelector('.Memoire').classList.remove('boxShadowBlue');
            document.querySelector('.Rim').classList.add('boxShadowBlue');
            rimm.current = tableR2.current.shift()
            setFo2(rimm.current)
        }, timeRef.current);
        timeRef.current += 800
        setTimeout(() => {
            document.querySelector('.Rim').classList.remove('boxShadowBlue');}, timeRef.current);
        //busData.transferer(Machine.RIM.envoyer(),Machine.UAL.UAL1.recevoir())
        return Machine.RIM
    }, function Indexe(Machine, reg, C) {
        var Co = Machine.CO
        var busAdr = Machine.bus_adresse
        var busData = Machine.bus_donnes
        var Mem = Machine.memoire
        var RI = Machine.RI
        busData.transferer(Machine.SI, busAdr)
        busAdr.transferer(busAdr, Machine.RAM)
        //busData.transferer(Machine.RIM.envoyer(),Machine.UAL.UAL1.recevoir())
        Mem.lecture(Machine.RAM, Machine.RIM)
        return Machine.RIM
    }, function Bindexe(Machine, reg, C) {
        var Co = Machine.CO
        var busAdr = Machine.bus_adresse
        var busData = Machine.bus_donnes
        var Mem = Machine.memoire
        var RI = Machine.RI
        var Res = (Machine.SI.value.entier + Machine.BX.value.entier).toString(2).padStart(16, "0")
        busAdr.transferer(new Mot16(Res), Machine.RAM)
        Mem.lecture(Machine.RAM, Machine.RIM)

        return Machine.RIM
    }, function Relatif(Machine, reg, C) {
        var Co = Machine.CO
        var busAdr = Machine.bus_adresse
        var busData = Machine.bus_donnes
        var Mem = Machine.memoire
        var RI = Machine.RI
        busData.transferer(Machine[reg[parseInt(C, 2)]], busAdr)
        busAdr.transferer(busAdr, Machine.RAM)
        Mem.lecture(Machine.RAM, Machine.RIM)
        return Machine.RIM
    }]
    /**************************************************************************** */

    let blue
    let som = 0
    const [hexx, setHexx] = useState([])
    const HandleToggle = () => {
        setShowPageOne(true)
        setTimeout(() => {
            if (comp) {
                co.RAZ()//RAZ co=0
                table.current.push(co.value.hexa)
                console.log(table.current)
                setTimeout(() => {
                    coo.current = table.current.shift()
                    setFo(coo.current)
                    blue = document.querySelector(".Co")
                    console.log(blue)
                    blue.className = "Co boxShadowBlue"
                }, timeRef.current)
                timeRef.current += 500

                machine.bus_adresse.transferer(machine.CO, machine.RAM)//co->RAM
                tableR.current.push(machine.RAM.value.hexa)
                
                //******************************88 */
                let x1 = myRef.current.getBoundingClientRect().left;//x1 we get actual position of the element
                let y1 = myRef.current.getBoundingClientRect().top;//y1 we get actual position of the element
                let x2 = document.querySelector('.BusCo .rectangle').getBoundingClientRect().left;//destination position
                let y2 = document.querySelector('.BusCo .triangleHaut').getBoundingClientRect().top;//destination position
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    myRef.current.style.opacity = '60%'
                }, timeRef.current);
                timeRef.current += 500
                setTimeout(() => {
                    blue.className = "Co"
                }, timeRef.current)
                timeRef.current += 500
                y2 = document.querySelector('.CoToRam .rectangle').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1+10 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()
                    setPosition(pos.current)
                }, timeRef.current);
                timeRef.current += 800
                x2 = document.querySelector('.CoToRam .triangleDroit').getBoundingClientRect().left;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1+10 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()
                    setPosition(pos.current)
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    document.querySelector('.RAM').classList.add('boxShadowBlue');
                    ramm.current = tableR.current.shift()
                    setFo1(ramm.current)
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    document.querySelector('.RAM').classList.remove('boxShadowBlue');
                    myRef.current.style.opacity = '0%'
                }, timeRef.current);
                timeRef.current += 800
                
                setTimeout(() => {
                    // blue.className = "RAM"
                    blue = document.querySelector(".Memoire")
                    blue.className = "Memoire boxShadowBlue"
                }, timeRef.current)
                timeRef.current += 1000
                machine.memoire.lecture(machine.RAM, machine.RIM)//lecture 
                tableR2.current.push(machine.RIM.value.hexa)
                setTimeout(() => {
                    blue.className = "Memoire"
                    blue = document.querySelector(".rim")
                    blue.className = "rim boxShadowBlue"
                    rimm.current = tableR2.current.shift()
                    setFo2(rimm.current)
                }, timeRef.current)
                timeRef.current += 800
                //*************************************** */
                 x1 = myRef.current.getBoundingClientRect().left;
                 y1 = myRef.current.getBoundingClientRect().top;
                 console.log(myRef.current)
                 x2 = document.querySelector('.RimToRi .rectangle').getBoundingClientRect().left;
                y2 = document.querySelector('.RimToRi .triangleHaut').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    myRef.current.style.opacity = '60%'
                }, timeRef.current);
                timeRef.current += 800
                y2 = document.querySelector('.RimBusRi .rectangle').getBoundingClientRect().top
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    blue.className = "rim"
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);    
                timeRef.current += 1000
                x2 = document.querySelector('.RimBusRi .triangleGauche').getBoundingClientRect().left;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                  myRef.current.style.opacity='0%'
                }, timeRef.current);
                timeRef.current += 800
                machine.bus_donnes.transferer(machine.RIM, machine.RI)//rim->ri
                tableR3.current.push(machine.RIM.value.hexa)
                setTimeout(() => {
                  document.querySelector('.Ri').classList.add('boxShadowBlue');
                  rii.current = tableR3.current.shift()
                    setFo3(rii.current)
                }, timeRef.current);
                timeRef.current += 500
                
                
                setTimeout(() => {
                  document.querySelector('.Ri').classList.remove('boxShadowBlue');
                }, timeRef.current);
                //timeRef.current += 300
                 x2 = document.querySelector('.BusUcToRi').getBoundingClientRect().left;
                 tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                 setTimeout(() => {
                     pos.current = tabPos.current.shift()//we get the first element of the array
                     setPosition(pos.current)//we set the position of the element
                 }, timeRef.current);
                    timeRef.current += 500
                    
                y2 = document.querySelector('.BusUcToRi .triangleBas').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 500
                setTimeout(() => {
                    myRef.current.style.opacity='60%'
                  }, timeRef.current);
                  timeRef.current += 500
                 y2 = document.querySelector('.BusUcToRi, triangleHaut').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 500
                setTimeout(() => {
                  document.querySelector('.Uc').classList.add('boxShadowBlue');
                }, timeRef.current);
                timeRef.current += 2000
                 setTimeout(() => {
                  document.querySelector('.Uc').classList.remove('boxShadowBlue');
                  myRef.current.style.opacity='0%'
                }, timeRef.current);
          
                // setTimeout(() => {
                //   myRef.current.style.opacity='0%'
                // }, 8500);  
                //******************************************* */
                // setTimeout(() => {
                //     blue.className = "rim"
                //     addChildComponent(<LightRimUc time={0}></LightRimUc>)
                // }, timeRef.current)
                
                
                let Arr = machine.RI.decode();//decode la donnee de ri
                machine.UC = new UniteCommandes(Arr[0], Arr[1], Arr[2], Arr[3])

                setMachine(machine)
                //Co.incCO()
                let here
                console.log(coo.current)
                while (parseInt(machine.UC.Cop, 2) != 27) {
                    console.log("here", parseInt(machine.UC.Cop, 2))
                    
                    timeRef.current += 800
                    console.log(timeRef.current)
                    Traiter(machine)
                    setMachine(machine)
                    machine.CO.incCO()//inc co
                    table.current.push(machine.CO.value.hexa)
                console.log(table.current)
                setTimeout(() => {
                    coo.current = table.current.shift()
                    setFo(coo.current)
                    blue = document.querySelector(".Co")
                    console.log(blue)
                    blue.className = "Co boxShadowBlue"
                }, timeRef.current)
                timeRef.current += 500

                machine.bus_adresse.transferer(machine.CO, machine.RAM)//co->RAM
                tableR.current.push(machine.RAM.value.hexa)
                
                //******************************88 */
                let x1 = myRef.current.getBoundingClientRect().left;//x1 we get actual position of the element
                let y1 = myRef.current.getBoundingClientRect().top;//y1 we get actual position of the element
                let x2 = document.querySelector('.BusCo .rectangle').getBoundingClientRect().left;//destination position
                let y2 = document.querySelector('.BusCo .triangleHaut').getBoundingClientRect().top;//destination position
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })// we push the difference between the two positions
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    myRef.current.style.opacity = '60%'
                }, timeRef.current);
                timeRef.current += 500
                setTimeout(() => {
                    blue.className = "Co"
                }, timeRef.current)
                timeRef.current += 500
                y2 = document.querySelector('.CoToRam .rectangle').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1+10 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()
                    setPosition(pos.current)
                }, timeRef.current);
                timeRef.current += 800
                x2 = document.querySelector('.CoToRam .triangleDroit').getBoundingClientRect().left;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1+10 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()
                    setPosition(pos.current)
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    document.querySelector('.RAM').classList.add('boxShadowBlue');
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    document.querySelector('.RAM').classList.remove('boxShadowBlue');
                    myRef.current.style.opacity = '0%'
                }, timeRef.current);
                timeRef.current += 800
                console.log(myRef.current)
                // setTimeout(() => {
                //     myRef.current.style.opacity = '0%'
                // }, timeRef.current);
                // timeRef.current += 800
                //********************************** */
                console.log(myRef.current)


                setTimeout(() => {
                    // blue = document.querySelector(".RAM")
                    // blue.className = "RAM boxShadowBlue"
                    ramm.current = tableR.current.shift()
                    setFo1(ramm.current)
                }, timeRef.current)
                timeRef.current += 800
                setTimeout(() => {
                    // blue.className = "RAM"
                    blue = document.querySelector(".Memoire")
                    blue.className = "Memoire boxShadowBlue"
                }, timeRef.current)
                timeRef.current += 1000
                machine.memoire.lecture(machine.RAM, machine.RIM)//lecture 
                tableR2.current.push(machine.RIM.value.hexa)
                setTimeout(() => {
                    blue.className = "Memoire"
                    blue = document.querySelector(".rim")
                    blue.className = "rim boxShadowBlue"
                    rimm.current = tableR2.current.shift()
                    setFo2(rimm.current)
                }, timeRef.current)
                timeRef.current += 800
                //*************************************** */
                 x1 = myRef.current.getBoundingClientRect().left;
                 y1 = myRef.current.getBoundingClientRect().top;
                 console.log(myRef.current)
                 x2 = document.querySelector('.RimToRi .rectangle').getBoundingClientRect().left;
                y2 = document.querySelector('.RimToRi .triangleHaut').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                    myRef.current.style.opacity = '60%'
                }, timeRef.current);
                timeRef.current += 800
                y2 = document.querySelector('.RimBusRi .rectangle').getBoundingClientRect().top
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    blue.className = "rim"
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);    
                timeRef.current += 1000
                x2 = document.querySelector('.RimBusRi .triangleGauche').getBoundingClientRect().left;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 800
                setTimeout(() => {
                  myRef.current.style.opacity='0%'
                }, timeRef.current);
                timeRef.current += 800
                machine.bus_donnes.transferer(machine.RIM, machine.RI)//rim->ri
                tableR3.current.push(machine.RIM.value.hexa)
                setTimeout(() => {
                  document.querySelector('.Ri').classList.add('boxShadowBlue');
                  rii.current = tableR3.current.shift()
                    setFo3(rii.current)
                }, timeRef.current);
                timeRef.current += 500
                
                
                setTimeout(() => {
                  document.querySelector('.Ri').classList.remove('boxShadowBlue');
                }, timeRef.current);
                //timeRef.current += 300
                 x2 = document.querySelector('.BusUcToRi').getBoundingClientRect().left;
                 tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                 setTimeout(() => {
                     pos.current = tabPos.current.shift()//we get the first element of the array
                     setPosition(pos.current)//we set the position of the element
                 }, timeRef.current);
                    timeRef.current += 500
                    
                y2 = document.querySelector('.BusUcToRi .triangleBas').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 500
                setTimeout(() => {
                    myRef.current.style.opacity='60%'
                  }, timeRef.current);
                  timeRef.current += 500
                 y2 = document.querySelector('.BusUcToRi, triangleHaut').getBoundingClientRect().top;
                tabPos.current.push({ x: x2 - x1, y: y2 - y1 })
                setTimeout(() => {
                    pos.current = tabPos.current.shift()//we get the first element of the array
                    setPosition(pos.current)//we set the position of the element
                }, timeRef.current);
                timeRef.current += 500
                setTimeout(() => {
                  document.querySelector('.Uc').classList.add('boxShadowBlue');
                }, timeRef.current);
                timeRef.current += 2000
                 setTimeout(() => {
                  document.querySelector('.Uc').classList.remove('boxShadowBlue');
                  myRef.current.style.opacity='0%'
                }, timeRef.current);
                    Arr = machine.RI.decode()//decode la donnee de ri
                    machine.UC = new UniteCommandes(Arr[0], Arr[1], Arr[2], Arr[3])
                }
                console.log(elem.current)
            }
        }, 1000)

    }

    return (
        <>{showPageOne ? <>
            <div className='Light' ref={myRef} style={{ position: 'absolute', transform: `translate(${position.x}px, ${position.y}px)` }} />
            <div className='Light1' ref={myRef1} style={{ position: 'absolute', transform: `translate(${position1.x}px, ${position1.y}px)` }} />
            <Simulation case1={fo5} case2={fo6} memoire={hexx} Co={fo}
                elements={elem.current} Ram={fo1} Rim={fo2} RI={fo3} Pile={fo12}
                ACC={fo4} SI={fo7} DI={fo8} BX={fo9} Flags={fo11} CX={fo10} /></> : <Code handleToggle={HandleToggle} handleClick={HandleClick} />}

        </>
    )
}