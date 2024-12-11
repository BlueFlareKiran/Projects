let toastbox=document.getElementById("toastbox");
let succes=`<img src="check.png">Successfully submitted`;
let error=`<img src="cancel.png">Please fix the error`;
let invalid=`<img src="exclamation.png">Invalid ,Check again`;


function showToast(msg){
    let toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML=msg;
    toastbox.appendChild(toast);
    // if(msg.includes("error")){
    //     toast.classList.add("errorline");
    // }
    setTimeout(()=>{
        toast.remove();
    },6000);
}