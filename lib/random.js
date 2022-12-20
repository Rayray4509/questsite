

const randomNumStr = (num)=>{

    let numStr = []
    for(let i = 0; i<num;i++){
        const randomNum = Math.floor(Math.random()*10);
        numStr.push(randomNum);
    }
    return numStr.join("")
}
const randomPassword = (len)=>{
    let result =[];
    const char = ["!","@","#","$","%","&","*"];
    result.push(char[Math.floor(Math.random()*7)]);
    for (let i = 0; i < len; i++) {        
        const ram = Math.ceil(Math.random() * 25);
        result.push(Math.floor(Math.random()*10));
        const char = String.fromCharCode(65 + ram);// 大寫（A~Z的ASCII碼65-90）
        if (i == 1 ) {
            result.push(char);
            continue
        }
        result.push(char.toLowerCase());
    }    
    return result.join('');
    
}


export default{
    randomNumStr,
    randomPassword
}