import Machine from "./Machine.js";
import Instructions from "./Instructions.js";
import memoire from "./memoire.js";
import Mot16 from "./Mot16.js";
import RAM from "./Registres/RAM.js";
import Flags from "./Flags.js";
import mot_mem from "./mot_mem.js";
import ABCD from "../../../ComponentsArchi/ACCtoBD.js"
import React from "react";
import ReactDOM from 'react-dom';
class UniteCommandes{
    constructor(Cop,Mod,R1,C){
        this.Cop=Cop
        this.Mod=Mod
        this.R1=R1
        this.C=C
    }
    // Structures de donnees *******************************************
    Coprnd=["ADD","SUB","INC","DEC","MUL","NOT",
            "AND","OR","NAND","NOR","XOR",
            "CMP","RAZ","SHL","SHR","ROL",
            "ROR","LOOP","BCV","BCF","ENT","SORT",
            "MOV","CHM","RGM","PUSH","POP","STOP"]

    reg=["ACC","BX","CX","DX","SI","CO"]

    
    //**********************************************/
    // Execute(Machine,container,setElements,elements,setACC,ax) {
    //     //Machine,container,setElements,elements,setACC,ax
    //         var Co=Machine.CO
    //         var busAdr=Machine.bus_adresse
    //         var busData=Machine.bus_donnes
    //         var Mem= Machine.memoire
    //         var RI=Machine.RI
    //         Co.RAZ()
    //         busAdr.transferer(Co,Machine.RAM)
    //         Mem.lecture(Machine.RAM,Machine.RIM)
    //         busData.transferer(Machine.RIM,Machine.RI)
           
    //         let Arr=RI.decode();
    //         this.Cop=Arr[0];this.Mod=Arr[1];this.R1=Arr[2];this.C=Arr[3]
    //         //Co.incCO()
    //         let here
    //     while (parseInt(this.Cop,2)!=27) {
    //         //console.log("here",parseInt(this.Cop,2))
    //         this.Traiter(Machine,container,setElements,elements,setACC,ax)
    //         Co.incCO()
    //         busAdr.transferer(Co,Machine.RAM)
    //         Mem.lecture(Machine.RAM,Machine.RIM)
    //         busData.transferer(Machine.RIM,Machine.RI)
    //         Arr=RI.decode()
    //         this.Cop=Arr[0];this.Mod=Arr[1];this.R1=Arr[2];this.C=Arr[3]
    //     }
        
    // }
    // Traiter(Machine){
    //      let Co=Machine.CO
    //      let busAdr=Machine.bus_adresse
    //      let busData=Machine.bus_donnes
    //      let Mem=Machine.memoire
    //     var RI=Machine.RI
    //     let here=[]
    //     // treating instructions from ADD to CMP in UAL
    //     /****************************************** */
    //     if (parseInt(this.Cop,2)<2 || parseInt(this.Cop,2)==4 || (parseInt(this.Cop,2)>=6 && parseInt(this.Cop,2)<=10 )) {
    //         Machine.UAL.UAL2=this.Mode[parseInt(this.Mod,2)](Machine,this.reg,this.C).value
    //         // if(parseInt(this.R1,2)==0){
    //         //     elements.push(<ABCD></ABCD>)
    //         //    setElements(elements)
    //         //    setTimeout(()=>{
    //         //    here[0]=(Machine[this.reg[parseInt(this.R1,2)]].value.hexa[0])
    //         //    here[1]=(Machine[this.reg[parseInt(this.R1,2)]].value.hexa[1])
    //         //    here[2]=(Machine[this.reg[parseInt(this.R1,2)]].value.hexa[2])
    //         //    here[3]=(Machine[this.reg[parseInt(this.R1,2)]].value.hexa[3])
    //         //    here[4]=("boxShadowBlue")
    //         //    setACC(here)

               
    //         // },7000)
    //         // let here1=[]
    //         // setTimeout(()=>{
    //         //     here1[0]=(Machine[this.reg[parseInt(this.R1,2)]].value.hexa[0])
    //         //    here1[1]=(Machine[this.reg[parseInt(this.R1,2)]].value.hexa[1])
    //         //    here1[2]=(Machine[this.reg[parseInt(this.R1,2)]].value.hexa[2])
    //         //    here1[3]=(Machine[this.reg[parseInt(this.R1,2)]].value.hexa[3])
    //         //    here1[4]=("")
    //         //    console.log(ax,here1)
    //         //    setACC(here1)
    //         //    },9000)
    //         // }
    //         Machine.UAL.UAL1=Machine[this.reg[parseInt(this.R1,2)]].value
    //         Machine[this.reg[parseInt(this.R1,2)]].value=new Mot16 (Machine.UAL.executer(this.Coprnd[parseInt(this.Cop,2)],Machine.Flags))
    //     }
    //     else if(parseInt(this.Cop,2)==2 || parseInt(this.Cop,2)==3 || parseInt(this.Cop,2)==5){
            
    //         Machine.UAL.UAL1=this.Mode[parseInt(this.Mod,2)](Machine,this.reg,this.C).value
    //         Machine.UAL.UAL2=Machine[this.reg[parseInt(this.R1,2)]].value
            
    //         Machine[this.reg[parseInt(this.R1,2)]].value=new Mot16 (Machine.UAL.executer(this.Coprnd[parseInt(this.Cop,2)],Machine.Flags))
    //         let mM = new mot_mem(Machine.RAM.value.entier,new Mot16("0000000000000000"))
    //         if (parseInt(this.Mod,2)==1 || parseInt(this.Mod,2)==2 || parseInt(this.Mod,2)>=4) {
    //             Instructions.MOV(Machine[this.reg[parseInt(this.R1,2)]],mM,Machine)
    //         }
    //     }
    //     else if(parseInt(this.Cop,2)==11){
    //         Machine.UAL.UAL2=this.Mode[parseInt(this.Mod,2)](Machine,this.reg,this.C).value
    //         Machine.UAL.UAL1=Machine[this.reg[parseInt(this.R1,2)]].value
    //         Machine.UAL.executer(this.Coprnd[parseInt(this.Cop,2)],Machine.Flags)
    //     }
    //     //***************************************************** */
    //     //treating RAZ
    //     else if(parseInt(this.Cop,2)==12){
    //         Instructions.RAZ(Machine[this.reg[parseInt(this.R1,2)]].value,Machine.Flags)
    //     }
    //     //***************************************************** */
    //     // treating instructions from SHL to ROR 
    //     else if (parseInt(this.Cop,2)>=13 && parseInt(this.Cop,2)<17){
    //         let i= new Mot16(this.C)
    //         Machine.UAL.UAL2=i
    //         Machine.UAL.UAL1=Machine[this.reg[parseInt(this.R1,2)]].value
    //         Machine[this.reg[parseInt(this.R1,2)]].value =new Mot16(Machine.UAL.executer(this.Coprnd[parseInt(this.Cop,2)],Machine.Flags))
    //     }
    //     //***************  LOOP UNTIL CX==0 ***************** */
    //     else if(parseInt(this.Cop,2)==17)
    //     {
    //         let op=this.Mode[0](Machine,this.reg,this.C).value
    //         if (Machine.CX.value.entier==0) {
    //             //Co.incCO()
    //         } else {
    //             const flags=new Flags(new Mot16("0000000000000000"))
    //             Co.value= new Mot16(Instructions.DEC(op,flags))
    //             Machine.CX.DecCX()
    //         }
    //     }
    //     /** BCV */
    //     else if(parseInt(this.Cop,2)==18){
    //         let op2=this.Mode[0](Machine,this.reg,this.C).value
    //         let op1=parseInt(this.C,2)
    //         if (Instructions.BCV(op1,Machine.Flags)) {
    //             Co.value= new Mot16(Instructions.DEC(op2,new Flags(new Mot16("0000000000000000"))))
    //         }
    //     }
    //     /**BCF */
    //     else if (parseInt(this.Cop,2)==19){
    //         let op2=this.Mode[0](Machine,this.reg,this.C).value
    //         let op1=parseInt(this.C,2)
    //         if (Instructions.BCF(op1,Machine.Flags)) {
    //             Co.value= new Mot16(Instructions.DEC(op2,new Flags(new Mot16("0000000000000000"))))
    //         }
    //     }
    //     else if (parseInt(this.Cop,2)==20){
    //         Machine.ACC=Instructions.ENT(Machine.Flags)
    //     }
    //     else if (parseInt(this.Cop,2)==21){
    //         Instructions.SOR(Machine.ACC.value)
    //     }
    //     /**MOV */
    //     else if(parseInt(this.Cop,2)==22){
    //         Instructions.MOV(this.Mode[parseInt(this.Mod,2)](Machine,this.reg,this.C),Machine[this.reg[parseInt(this.R1,2)]],Machine)
            
    //     }
    //     else if(parseInt(this.Cop,2)==23){
    //         Instructions.CHM(this.Mode[parseInt(this.Mod,2)](Machine,this.reg,this.C).value,Machine)
    //     }
    //     else if(parseInt(this.Cop,2)==24){
    //         Instructions.RGM(this.Mode[parseInt(this.Mod,2)](Machine,this.reg,this.C).value,Machine)
    //     }
    //     /**PUSH/POP */
    //     else if(parseInt(this.Cop,2)==25){
    //         let op=Machine[this.reg[parseInt(this.R1,2)]].value
    //         Instructions.PUSH(Machine.pile,op)
    //     }
    //     else if(parseInt(this.Cop,2)==26){
    //         let op=Machine[this.reg[parseInt(this.R1,2)]]
    //         Machine.bus_donnes.transferer(Instructions.POP(Machine.pile),op)
    //     }
        
    // }
    
}

export default UniteCommandes; 