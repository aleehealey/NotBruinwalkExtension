

document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transitionDuration = '3.0s';
document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transform = 'rotate(3000deg)';


chrome.runtime.sendMessage({ message: "getProfRating", prof: "Cong, J.J." }, (res) => {
    console.log(res);
})
