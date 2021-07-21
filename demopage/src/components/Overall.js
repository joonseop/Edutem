import React from "react";
import { useState } from 'react';
import './Overall.css';
import {LanguageTool,Big_button} from './API/LanguageTool.js';

const Overall = ()=>{
    let [text, setText] = useState("");
  let [noText, setNoText] = useState("문자을 입력해주세요.");
  let [languageToolTime, setLanguageToolTime] = useState(0);
  let [resultLanguageTool, setResultLanguageTool] = useState(null);
  const [loading, setLoading] = useState(false);
  const postLanguageTool = () => {
    console.log("postLT");
    var innertext = document.getElementById("input_text").innerText;
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
        console.error(error);
    });
        // unregister()
}

  const  post = () =>{
    document.getElementById("show_text").innerText=document.getElementById("input_text").innerText
    console.log("post")
    postLanguageTool();
}

const clear = () =>{
  setLanguageToolTime(0);
  setResultLanguageTool(null);
}

const postData = async ()  =>{
  if( !document.getElementById("input_text").innerText ){
    console.log("notext")
    setNoText("빈칸은 허용되지 않습니다.")
    return;
}

await clear();
setLoading(true);
try {
    post();
} catch (e) {
    Error(e)
}finally{
    setLoading(false)
}
}

  const cleartext = ()=>{
    document.getElementById("input_text").innerHTML="";
    document.getElementById("correct_text").innerHTML="";
    document.getElementById("show_text").innerHTML="";
    clear();
  }

  const put = () =>{
    var select = document.getElementById("select_example");
    var selectvalue = select.options[select.selectedIndex].value;
    document.getElementById("correct_text").innerText=selectvalue;
  }
  const handleChange = (event) => {
    console.log("handleChange")
    setText(event.target.innerHTML);
}
  const button_style = {
    width:"40px",
    height:"40px"
  };
  const link_gector = ()=>{

  }
  const link_grammarly =() =>{

  }
  const link_languagetool=()=>{

  }
  const link_prowritingaid=()=>{

  }

    return (
    <div id ="wrap">
      <div className="chat_wrap" id="input">
        <h3>Write the sentence</h3>
        <div id = "text">
          <div className="header">LanguageTool</div>
          <ul>
            
          </ul>
        </div>
        <div id="input_text" contentEditable="true"></div>
        
        <div id ="input_button">
          <button className="child_input_button" onClick={() => cleartext()}><img src="copy.png" style={button_style}></img></button>
          <button className="child_input_button" onClick={() => cleartext()}><img src="delete.png" style={button_style}></img></button>
          <button className="child_input_button" onClick={() => postData()}><img src="submit.png" style={button_style}></img></button>
        </div>
      </div>
      <div id="correct">
        <h3>Correction List</h3>
        <div id="LanguageTool">
          <LanguageTool result = {resultLanguageTool}/>
        </div>
        <div id = "GECToR">

        </div>
        <div id="BERT_VERNET">

        </div>
        <div id="Fairseq_gec">

        </div>
      </div>
    </div>
    );
}
export default Overall;