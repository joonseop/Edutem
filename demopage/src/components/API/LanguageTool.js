import React, { useState, useEffect } from 'react';

function LanguageTool(props){
    console.log(props)
    var result = props.result ;
    var lichild = [];
    var mResult = [];
    var tResult = [];
    var bResult = [];
    var oldOffset = 0;
    var start;
    var end;
    var newSetence =[];
    var wrongWordsList = [];
    let [buttonText, setButtonText] = useState(wrongWordsList);
    let [text, setText] = useState("");

    function describeError(){
        console.log(tResult)
       setText("This is grammar error");
       console.log(tResult)
    }

    function resetButtonText(){
        if(result && result.matches){
            wrongWordsList = []
            for (let i = 0; i < result.matches.length; i++) {
                if(result.matches[i].replacements[0]){
                    wrongWordsList.push( result.matches[i].replacements[0].value) ;
                }
            }
            setButtonText (wrongWordsList)
        }
    }

    function changeTextByClick(i, newWord){
        var newArr = [...buttonText];
        newArr[i] = newWord;
        setButtonText(newArr);
    }



    useEffect(()=>{
        resetButtonText()
    }, [props]);



    try {
        if(result){
            if(!result.matches.length){
                return  <div key = "noError">There is No error.</div>
            }
            //<>document.getElementById("correct_text").innerHTML=""
            for (let i = 0; i < result.matches.length; i++) {
               
                tResult = [];

                start = result.matches[i].start
                end = result.matches[i].end
                // tid = result.content.substring(offset, offset+len) + i ;
                lichild.push(result.text.substring(oldOffset,start))
                //<>document.getElementsByClassName('text').innerHTML+=result.text.substring(oldOffset,start);
                newSetence.push(result.text.substring(oldOffset,start))
                //newSetence.push(buttonText[i])
                lichild.push("<span class=wrong onClick='clear()'>"+buttonText[i]+"</span>")
                //<>document.getElementById("correct_text").innerHTML+="<span class=wrong onClick='clear()'>"+buttonText[i]+"</span>"
                //document.getElementById("input_text").innerHTML+=<span className='wrong' key= {result.matches[i].word} > {buttonText[i]} </span>
                newSetence.push(<span className='wrong' key= {result.matches[i].word} > {buttonText[i]} </span>) //원래 
                oldOffset = end;
                //tResult.push("\t")
                //tResult.push(<button style={{width: '490px', border: '1px solid #003458', height:'100px',alignItems:'center'}}>)
                
                tResult.push(result.text.substring(start, end ))  // offset lengh 계산!!!
                tResult.push("->")

                if(result.matches[i].replacements.length){
                    for(let j=0; j< Math.min(result.matches[i].replacements.length,3); j++){
                        tResult.push(<button className='btn btn-primary' style={{margin: '1%', padding:'1%'}} key={result.matches[i].replacements[j].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[j].value)} >{result.matches[i].replacements[j].value}</button>);
                    }
                }
                else{
                    tResult.push(<button className='btn btn-primary' style={{margin: '0.3%'}} key={"noReplacement"} onClick={() => changeTextByClick(i, "")} >{"\t"}</button>);
                }

                // ignore = result.text.substring(offset, offset+len )
                tResult.push(<button style={ {marginRight:'10px', float: 'right', margin: '3%', color: '#EB0000', borderColor  :  '#EB0000'}} key={ result.matches[i].word + "n" } onClick={() => changeTextByClick(i, result.matches[i].word )} >IGNORE</button>);
                tResult.push(<br/>);
                tResult.push(text);
                //tResult.push(</button>)
                // tResult.push(<button style={{flow: 'right', margin: '0.3%'}} key={ignore} onClick={() => console.log({ignore}) } >IGNORE</button>);
                mResult.push(<button className="big_button" style={{width: '490px', border: '1px solid #003458', height:'100px', margin: '15px', display:'block', borderRadius:'10px', fontFamily:'non-serif'}}onClick={()=>describeError()}>{tResult}</button>)
            }
            lichild.push(result.text.substring(oldOffset))
            var sentence=lichild.join('');
            //<>document.getElementById("correct_text").innerHTML+=result.text.substring(oldOffset);
            newSetence.push(result.text.substring(oldOffset));
            //document.getElementById("context").innerHTML+=sentence;

            //document.getElementById("input_text").innerHTML = newSetence.join("");  // string형식
           
           //fResult.push(<div key="newSetence" >{newSetence}</div>)
            //fResult.push(<button key="mResult" style={{width: '490px', border: '1px solid #003458', height:'100px', margin:'auto', display:'block'}}>{mResult}</button>)
            //console.log(mResult)
        //
            return mResult;
        }
        else{
            buttonText = [];
            return <div></div>
        }
    } catch (e) {
        console.log("error")
        return <div key={"error"}>ERROR OCCUR {e}</div>
    }
}
function Big_button(props){
    var result = props.result ;
    var lichild = [];
    var mResult = [];
    var tResult = [];
    var bResult = [];
    var oldOffset = 0;
    var start;
    var end;
    var newSetence =[];
    var wrongWordsList = [];
    let [buttonText, setButtonText] = useState(wrongWordsList);


    function resetButtonText(){
        if(result && result.matches){
            wrongWordsList = []
            for (let i = 0; i < result.matches.length; i++) {
                if(result.matches[i].replacements[0]){
                    wrongWordsList.push( result.matches[i].replacements[0].value) ;
                }
            }
            setButtonText (wrongWordsList)
        }
    }

    function changeTextByClick(i, newWord){
        var newArr = [...buttonText];
        newArr[i] = newWord;
        setButtonText(newArr);
    }



    useEffect(()=>{
        resetButtonText()
    }, [props]);



    try {
        if(result){
            if(!result.matches.length){
                return  <div key = "noError">There is No error.</div>
            }
            //<>document.getElementById("correct_text").innerHTML=""
            for (let i = 0; i < result.matches.length; i++) {
                tResult = [];

                start = result.matches[i].start
                end = result.matches[i].end
                // tid = result.content.substring(offset, offset+len) + i ;
                lichild.push(result.text.substring(oldOffset,start))
                //<>document.getElementsByClassName('text').innerHTML+=result.text.substring(oldOffset,start);
                newSetence.push(result.text.substring(oldOffset,start))
                //newSetence.push(buttonText[i])
                lichild.push("<span class=wrong onClick='clear()'>"+buttonText[i]+"</span>")
                //<>document.getElementById("correct_text").innerHTML+="<span class=wrong onClick='clear()'>"+buttonText[i]+"</span>"
                //document.getElementById("input_text").innerHTML+=<span className='wrong' key= {result.matches[i].word} > {buttonText[i]} </span>
                newSetence.push(<span className='wrong' key= {result.matches[i].word} > {buttonText[i]} </span>) //원래 
                oldOffset = end;
                //tResult.push("\t")
                //tResult.push(<button style={{width: '490px', border: '1px solid #003458', height:'100px',alignItems:'center'}}>)
                tResult.push(result.text.substring(start, end ))  // offset lengh 계산!!!
                tResult.push("->")

                if(result.matches[i].replacements.length){
                    for(let j=0; j< Math.min(result.matches[i].replacements.length,3); j++){
                        tResult.push(<button className='btn btn-primary' style={{margin: '1%', padding:'1%'}} key={result.matches[i].replacements[j].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[j].value)} >{result.matches[i].replacements[j].value}</button>);
                    }
                }
                else{
                    tResult.push(<button className='btn btn-primary' style={{margin: '0.3%'}} key={"noReplacement"} onClick={() => changeTextByClick(i, "")} >{"\t"}</button>);
                }

                // ignore = result.text.substring(offset, offset+len )
                tResult.push(<button style={ {marginRight:'10px', float: 'right', margin: '3%', color: '#EB0000', borderColor  :  '#EB0000'}} key={ result.matches[i].word + "n" } onClick={() => changeTextByClick(i, result.matches[i].word )} >IGNORE</button>);
                
                //tResult.push(</button>)
                // tResult.push(<button style={{flow: 'right', margin: '0.3%'}} key={ignore} onClick={() => console.log({ignore}) } >IGNORE</button>);
                mResult.push(<button className="big_button" style={{width: '490px', border: '1px solid #003458', height:'100px', margin: '15px', display:'block'} }>{tResult}</button>)
            }
            lichild.push(result.text.substring(oldOffset))
            var sentence=lichild.join('');
            //<>document.getElementById("correct_text").innerHTML+=result.text.substring(oldOffset);
            newSetence.push(result.text.substring(oldOffset));
            
            //document.getElementById("input_text").innerHTML = newSetence.join("");  // string형식
           
           //fResult.push(<div key="newSetence" >{newSetence}</div>)
            //fResult.push(<button key="mResult" style={{width: '490px', border: '1px solid #003458', height:'100px', margin:'auto', display:'block'}}>{mResult}</button>)
            //console.log(mResult)
        //
            return sentence;
        }
        else{
            buttonText = [];
            return <div></div>
        }
    } catch (e) {
        console.log("error")
        return <div key={"error"}>ERROR OCCUR {e}</div>
    }
}

export {LanguageTool,Big_button}
