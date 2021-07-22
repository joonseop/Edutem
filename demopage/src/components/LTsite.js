import React, {useEffect, useState} from 'react';

import {LanguageTool,Big_button} from './API/LanguageTool';

function LTsite() {
  let [text, setText] = useState("");
  let [noText, setNoText] = useState("문자을 입력해주세요.");

  let [languageToolTime, setLanguageToolTime] = useState(0);
  let [resultLanguageTool, setResultLanguageTool] = useState(null);
  useEffect(()=>{

  },[]);
  var loading="";

  const postLanguageTool = () => {
    console.log("postLT");
    var innertext = document.getElementById("input_text").innerHTML;
    const data= { text : innertext };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        body : JSON.stringify(data)
    };
    fetch('/api/languagetool', requestOptions)
    .then(response =>response.json())
    .then( (result) => {
        setResultLanguageTool(result)
        setLanguageToolTime(result['time'])
    })
    .catch(error => {
      setResultLanguageTool(null)
      //console.error(error);
    })
}


const clear = () =>{
  setResultLanguageTool(null);
  setLanguageToolTime(0);
}

const postData = async ()  =>{
  if( !document.getElementById("input_text").innerText ){
    console.log("notext")
    setNoText("빈칸은 허용되지 않습니다.")
    return;
}

await clear();
try {
    loading='true';
    postLanguageTool();
} catch (e) {
    Error(e)
}finally{
   
}
}

  const cleartext = ()=>{
    document.getElementById("input_text").innerHTML="";
    document.getElementById("correct_button").innerHTML="";
  }

  const put = () =>{
    var select = document.getElementById("select_example");
    var selectvalue = select.options[select.selectedIndex].value;
    document.getElementById("correct_text").innerText=selectvalue;
  }
  const button_style = {
    width:"40px",
    height:"40px"
  };

  const copy=()=>{
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = document.getElementById('input_text').innerHTML;

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);
  }

  return (
          
    <div id ="wrap">
      <div className="chat_wrap" id="input">
        <h3>Write the sentence</h3>
        <div id = "text">
          <div className="header">LanguageTool</div>
          <div id="context">
            <Big_button result ={resultLanguageTool}/>
          </div>
        </div>
        <div id="input_text" contentEditable="true"></div>
        
        <div id ="input_button">
          <button className="child_input_button" onClick={() => copy()}><img src="copy.png" style={button_style}></img></button>
          <button className="child_input_button" onClick={() => cleartext()}><img src="delete.png" style={button_style}></img></button>
          <button className="child_input_button" onClick={() => postData()}><img src="submit.png" style={button_style}></img></button>
        </div>      
      </div>
      <div id="correct">
        <h3>Correction List</h3>
        <div id="correct_button">
          <LanguageTool result = {resultLanguageTool}/>
        </div>
      </div>
    </div>
  );
}

export default LTsite;
