import React, { useState, useEffect } from 'react';

function Fairseq(props){
    var fResult = [];
    var mResult = [];
    var tResult = [];
    var offset;
    var oldOffset = 0;
    var len;
    var replacement;
    var newSetence =[];
    var wrongWordsList = [];
    let [buttonText, setButtonText] = useState(wrongWordsList);

    function resetButtonText(){
        if(props.result && props.result.matches){
            wrongWordsList = []
            for (let i = 0; i < props.result.matches.length; i++) {
                if(props.result.matches[i].replacements[0]){
                    wrongWordsList.push( props.result.matches[i].replacements[0].value) ;
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
        // console.log(props.result);
        resetButtonText()
    }, [props]);


    if(props.result){
        // if(!result["matches"]){
        //     return  <div key = "noError">There is No error.</div>
        // }


        return <div>{props.result.text}</div>
    }
    return <div></div>
}

export default Fairseq
