
const date =  () => {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let h=d.getHours();
    let m=d.getMinutes();
    let s=d.getSeconds();
    let createAtDate = `${yyyy}-${mm}-${dd}-${h}:${m}:${s}`;
    return createAtDate;
}

export{date}