const labConfiguration = {
    mostExistenceAmount:6000,
    mostReactionTime:3000,
    leastRefillAmount:5,
    leastTransferAmount:50,
    "W22N25":{
        mode:"default",
        allowedCompounds:["LH2O","XLH2O","KH2O","XKH2O","XLHO2","XZHO2","XUH2O","XKHO2","XGHO2"],
        reverse:["GO","ZH","UH","KO"],
        default:["KH","ZO","UH","OH","ZHO2","KH2O","UH2O","XUH2O","XZHO2","XKH2O","XKHO2"],
        focus:undefined,
        clear:undefined,
        allocate:{
            "5e643b349a5535ad81e4c7ed":"XLHO2",
            "5eb1131602f45354abfa53dd":"XZHO2",
            "5eb0ef7adcb707132fd32f7d":"XKHO2",
            "5eb12e73ede952a85643d4a2":"XGHO2",
        }
    },
    "W23N25":{
        mode:"default",
        allowedCompounds:["LH2O","XLH2O","KH2O","XKH2O","XLHO2","XZHO2","XUH2O","XKHO2","XGHO2"],
        reverse:["GO"],
        default:["KO","OH","KHO2","ZK","UL","G","GO","GH","GH2O","XKHO2"],
        focus:undefined,
        clear:undefined
    },
    "W21N24":{
        mode:"default",
        allowedCompounds:["KH2O","XGHO2"],
        reverse:["GO","ZH","UH","KO"],
        default:["OH","GHO2","XGHO2"],
        focus:undefined,
        clear:undefined,
        allocate:{
            "5e92fee13274810b0386ffd3":"XGHO2",
        }
    },
    "W19N22":{
        mode:"default",
        allowedCompounds:["XGH2O"],
        reverse:["GO","ZH","UH","KO"],
        default:["XGH2O"],
        focus:undefined,
        clear:undefined
    },
    "W18N22":{
        mode:"default",
        allowedCompounds:[],
        reverse:["GO","ZH","UH","KO"],
        default:["LO","OH","LHO2","XLHO2"],
        focus:undefined,
        clear:undefined
    },
    "sim":{
        mode:"default",
        allowedCompounds:[],
        reverse:[],
        default:[],
        focus:undefined,
        clear:undefined
    }
}
module.exports = labConfiguration