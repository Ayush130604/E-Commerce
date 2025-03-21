let likebuttons = document.querySelectorAll(".like-button");

async function likefunction(productid , btn){
    try{
        let response = await axios({
            method:'post',
            url:`/product/${productid}/like`,
            headers:{'X-Requested-With':'XMLHttpRequest'}
        })
        if(btn.children[0].classList.contains('fas')){
            btn.children[0].classList.remove('fas')
            btn.children[0].classList.add('far')
        }       
        else{
            btn.children[0].classList.remove('far')
            btn.children[0].classList.add('fas')
        }
    }
    catch(e){
        console.log(e);
        window.location.replace('/login');
    }

}

for(let btn of likebuttons){
    btn.addEventListener('click' , ()=>{
        let productid = btn.getAttribute('product_id');
        likefunction(productid, btn);
    })
}