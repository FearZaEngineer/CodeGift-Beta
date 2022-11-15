import axios from "axios"
const API = "http://46.101.54.25/api/user/"


export const HomeCatgories= (callBack)=>{
    axios.get(API+'getAllCategories')
    .then((response) => {
    return callBack(response.data) 
    }).catch((e) => {
       console.log(e);
    })
}

export const countries= (callBack)=>{
    axios.get(API+'countryForMobile')
    .then((response) => {
    return callBack(response.data) 
    }).catch((e) => {
        return callBack(e) 
    })
}
export function Questions(callBack){
    axios.get(API+'commonQuestions')
    .then((response) => {
        
    return callBack(response.data) 
    }).catch((e) => {
        return callBack(e) 
    })

}
export function getOffers(callBack){
    axios.get(API+'offersAdmin')
    .then((response) => {
        
    return callBack(response.data) 
    }).catch((e) => {
        return callBack(e) 
    })

}
export function getIntialOffers(callBack,titleAR){
    axios.get(API+'offersAdmin')
    .then((response) => {
     const data =response.data.filter((item)=>{
        if(titleAR=='الكل' && item.status ==1){
            return true
        }
        if (item.category.titleAR!==undefined && item.status ==1) {
            return (item.category.titleAR== titleAR ) }

        })
    return callBack(data) 
    }).catch((e) => {
        return callBack(e) 
    })

}

export function getSettings(callBack){
    axios.get(API+'setting')
    .then((response) => {
        
    return callBack(response.data) 
    }).catch((e) => {
        return callBack(e) 
    })

}
export function sliderImages(callBack){
    axios.get(API+'adsForMobile')
    .then((response) => {
        
    return callBack(response.data) 
    }).catch((e) => {
        return callBack(e) 
    })

}
export function contentText(callBack){
    axios.get(API+'employeeByID?id=6087dc99b68a767710ed3c19')
    .then((response) => {
        
    return callBack(response.data) 
    }).catch((e) => {
        return callBack(e) 
    })

}


