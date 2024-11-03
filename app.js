const baseUrl = "https://api.frankfurter.app/latest?";           //actual url for usd to eur is "https://api.frankfurter.app/latest?from=USD&to=EUR"
let dropdowns = document.querySelectorAll(".dropdown select");
let exchangebtn= document.querySelector("#exchangebutton")
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newoption= document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        if( select.name === "from" && currCode==="USD"){
            newoption.selected="selected";
        }
        if( select.name === "to" && currCode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{                                        //evt.target is jaha pr change aya hai evt(event) me
        updateflag(evt.target);
    })
}

const updateflag =(element) =>{                                                     
    let  currCode=element.value;
    let CountryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${CountryCode}/flat/64.png`;                 ////select(from,to) is the element
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}

exchangebtn.addEventListener("click", async (evt)=>{        
evt.preventDefault();                          //amount.value: This is the value directly tied to the input field. It always stores the value as a string (even if the user types a number)
 let amount=document.querySelector(".amount input");                      //This is a temporary variable used to hold the value from the input, usually for validation and calculations.
 let amountVal= amount.value;
 if(amountVal==""  || amountVal< 1 || isNaN(amountVal) ){
    amountVal=1;
    amount.value="1";                                                     //input takes the value as string even if you add number
 }

const url= `${baseUrl}from=${fromCurr.value}&to=${toCurr.value}` ;
let response= await fetch(url);
let data= await response.json();
let rate=data.rates[toCurr.value];
let finalamt= rate*amountVal;
msg.innerText=`${amountVal} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
msg.style.color='black'
})


