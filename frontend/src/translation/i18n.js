import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translation:{
                navbar:{
                    home: "Home", FAQ: "FAQ", contact:"Contact"
                },
                hero:{
                    title:"",
                    subtitle: ""
                    
                },

            }
        },
        fr:{
            translation:{
                navbar:{
                    home: "Home", FAQ: "FAQ", contact:"Contact"
                },
                hero:{
                    title:"",
                    subtitle: ""
                    
                },

            }
        },
        ar:{
            translation:{
                navbar:{
                    home: "Home", FAQ: "FAQ", contact:"Contact"
                },
                hero:{
                    title:"",
                    subtitle: ""
                    
                },

            }
        },



    }
})