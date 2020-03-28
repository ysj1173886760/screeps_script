const referenceModule = {
    assess:{
        economy:{
            assessRatio:{
                "available":0.7,
                "backUp":0.2,
                "storage":0.1
            },
            availableRatio:{
                "0":0.9,
                "1":0.8,
                "2":0.7,
                "3":0.5,
                "4":0
            },
            backUpRatio:{
                "0":0.8,
                "1":0.6,
                "2":0.5,
                "3":0.4,
                "4":0
            },
            storageAmount:{
                "0":30000,
                "1":15000,
                "2":10000,
                "3":5000,
                "4":0
            }
        },
        repair:{
            assessRatio:{
                average:{
                    "structure":0.5,
                    "core":0.5
                },
                min:{
                    "structure":1,
                    "core":1
                }
            },
            bearableHitLevel:"1",
            hitRatio:{
                "0":0.8,
                "1":0.7,
                "2":0.6,
                "3":0
            },
            downgradeFactor:{
                "0":1.0,
                "1":1.0,
                "2":0.8,
                "3":0.6,
                "4":0.4
            },
            defendnCoreRatio:{
                "0":1,
                "1":1,
                "2":1,
                "3":0
            },
            structureRank:{
                STRUCTURE_SPAWN:0,
                STRUCTURE_TOWER:1,
                STRUCTURE_STORAGE:2,
                STRUCTURE_EXTENSION:3,
                STRUCTURE_TERMINAL:4,
                STRUCTURE_EXTRACTOR:5,
                STRUCTURE_LINK:6,
                STRUCTURE_FACTORY:7,
                STRUCTURE_LAB:8
            },
            strengthenDefense:{
                "rampart":{
                    "0":0,
                    "1":0,
                    "2":0,
                    "3":0,
                    "4":0,
                    "5":0.00001,
                    "6":0.0001,
                    "7":0.001,
                    "8":1
                },
                "wall":{
                    "0":0,
                    "1":0,
                    "2":0,
                    "3":0,
                    "4":0,
                    "5":0.00001,
                    "6":0.0001,
                    "7":0.001,
                    "8":0.1
                }
            }
        },
        war:{
            assessAmount:{
                0:50,
                1:10,
                2:5,
                3:1,
                4:0
            }
        },
        work:{
            tower:{
                leastWarEnergyRatio:0.5,
            },
            creep:{
                containerWaitingBearableTimeInterval:15,
            },
            build:{
                helpBuildControllerLevel:2
            }
        }
    },
    spawn:{
        num:{
            "harvester":1,
            "builder":1,
            "upgrader":1
        },
        worker:{work:2,carry:3,move:6},
        upgrader:{work:5,carry:1,move:2},
        transferer:{work:4,carry:1,move:2},
        miner:{work:5,carry:2,move:6},
        repairer:{work:3,carry:4,move:6},
        pickuper:{tough:1,carry:5,move:6},
        attacker:{tough:1,attack:5,move:8},
        claimer:{claim:1,move:5},
        "BODYPART_COST": {move: 50, work: 100, attack: 80, carry: 50, heal: 250, "ranged_attack": 150, tough: 10, claim: 600 },
        getTotalCost:function(spawnSet){
            let totalCost = 0
            for (let bodypart in this.BODYPART_COST) {
                if (bodypart in spawnSet) {
                    totalCost += this.BODYPART_COST[bodypart] * spawnSet[bodypart]
                }
            }
            return totalCost
        },
        getRatio:function(spawnSet){
            let spawnRatio = {}
            const totalCost = this.getTotalCost(spawnSet)
            for (let bodypart in spawnSet) {
                spawnRatio[bodypart] = (this.BODYPART_COST[bodypart]*spawnSet[bodypart]) / totalCost
            }
            return spawnRatio
        },
        timeInterval:50, // Set to ensure many creeps do not die at the same time which exerts hugh pressure on the system of storage
    },
    work:{
        // Always have an argument of absolute executing
        interpret:{
            "0":"chargeEnergy",
            "1":"build",
            "2":"upgrade",
            "3":"store",
            "4":"chargeDefense",
            "5":"repair",
            "6":"defendTower",
            "7":"pickUp",
            "8":"transfer",
            "9":"attack",
            "10":"heal",
            "11":"chargeLink",
            "12":"containerHarvest",
            "13":"resourceHarvest",
            "14":"mineralHarvest",
            "15":"storageHarvest",
            "16":"linkUpdateHarvest",
            "17":"linkStorageHarvest",
            "18":"mineralContainerHarvest",
            "19":"strengthenTower",
            "20":"chargeLab",
            "21":"claim",
        },
        standard:{
            standardNum:4,
            "0":{
                standard:"true",
                call:"normalJob"
            },
            "1":{
                standard:"Game.spawns['Origin'].memory.assess.access.stateLevel.repair[roomName]>=2",
                call:"repairJob"
            },
            "2":{
                standard:"Game.spawns['Origin'].memory.assess.access.stateLevel.economy[roomName]>=2",
                call:"economyJob"
            },
            "3":{
                standard:"Game.spawns['Origin'].memory.assess.access.stateLevel.war[roomName]!=4",
                call:"warJob"
            }
        },
        normalJob:{
            harvester:"12-13-0-3-4-1-20-2-12-13",
            builder:"12-13-1-0-4-20-2-12-13",
            transferer:"13-11-13",
            upgrader:"16-12-13-2-16-12-13",
            repairer:"12-13-4-5-0-1-2-12-13",
            miner:"14-Game.spawns['Origin'].memory.assess.access.creeps[roomName].pickupers>0?14:3-14",
            pickuper:"18-7-3-0-8",
            tower:"6-5-19-5",
            attacker:"9",
            claimer:"21"
        },
        economyJob:{
            harvester:"15-12-13-0-4-3-1-2-15-12-13",
            builder:"12-13-0-1-4-2-12-15-13",
            repairer:"12-13-0-4-5-1-2-12-13",
            pickuper:"15-0-18-7-3-8-15",
            tower:"6-5",
        },
        repairJob:{
            harvester:"12-13-0-4-3-1-2-12-13",
            builder:"12-13-1-0-4-2-12-13",
            repairer:"12-13-4-5-0-1-2-12-13",
            pickuper:"18-15-creep.store.getUsedCapacity(RESOURCE_ENERGY)>0?4:3-18-7-3-8-15",
            tower:"6-5",
        },
        warJob:{
            harvester:"15-12-13-4-0-3-1-2-15-12-13",
            builder:"12-13-4-1-0-2-12-15-13",
            repairer:"12-13-4-0-5-1-2-12-13",
            pickuper:"15-4-18-7-3-8-15",
            tower:"6",
        }
    },
    constants:{
        resourceList:[
            RESOURCE_HYDROGEN,
            RESOURCE_OXYGEN,
            RESOURCE_UTRIUM,
            RESOURCE_LEMERGIUM,
            RESOURCE_KEANIUM,
            RESOURCE_ZYNTHIUM,
            RESOURCE_CATALYST,
            RESOURCE_GHODIUM,
            RESOURCE_SILICON,
            RESOURCE_METAL,
            RESOURCE_BIOMASS,
            RESOURCE_MIST,
            RESOURCE_HYDROXIDE,
            RESOURCE_ZYNTHIUM_KEANITE,
            RESOURCE_UTRIUM_LEMERGITE,
            RESOURCE_UTRIUM_HYDRIDE,
            RESOURCE_UTRIUM_OXIDE,
            RESOURCE_KEANIUM_HYDRIDE,
            RESOURCE_KEANIUM_OXIDE,
            RESOURCE_LEMERGIUM_HYDRIDE,
            RESOURCE_LEMERGIUM_OXIDE,
            RESOURCE_ZYNTHIUM_HYDRIDE,
            RESOURCE_ZYNTHIUM_OXIDE,
            RESOURCE_GHODIUM_HYDRIDE,
            RESOURCE_GHODIUM_OXIDE,
            RESOURCE_UTRIUM_ACID,
            RESOURCE_UTRIUM_ALKALIDE,
            RESOURCE_KEANIUM_ACID,
            RESOURCE_KEANIUM_ALKALIDE,
            RESOURCE_LEMERGIUM_ACID,
            RESOURCE_LEMERGIUM_ALKALIDE,
            RESOURCE_ZYNTHIUM_ACID,
            RESOURCE_ZYNTHIUM_ALKALIDE,
            RESOURCE_GHODIUM_ACID,
            RESOURCE_GHODIUM_ALKALIDE,
            RESOURCE_CATALYZED_UTRIUM_ACID,
            RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
            RESOURCE_CATALYZED_KEANIUM_ACID,
            RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
            RESOURCE_CATALYZED_LEMERGIUM_ACID,
            RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
            RESOURCE_CATALYZED_ZYNTHIUM_ACID,
            RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
            RESOURCE_CATALYZED_GHODIUM_ACID,
            RESOURCE_CATALYZED_GHODIUM_ALKALIDE,
            RESOURCE_OPS,
            RESOURCE_UTRIUM_BAR,
            RESOURCE_LEMERGIUM_BAR,
            RESOURCE_ZYNTHIUM_BAR,
            RESOURCE_KEANIUM_BAR,
            RESOURCE_GHODIUM_MELT,
            RESOURCE_OXIDANT,
            RESOURCE_REDUCTANT,
            RESOURCE_PURIFIER,
            RESOURCE_BATTERY,
            RESOURCE_COMPOSITE,
            RESOURCE_CRYSTAL,
            RESOURCE_LIQUID,
            RESOURCE_WIRE,
            RESOURCE_SWITCH,
            RESOURCE_TRANSISTOR,
            RESOURCE_MICROCHIP,
            RESOURCE_CIRCUIT,
            RESOURCE_DEVICE,
            RESOURCE_CELL,
            RESOURCE_PHLEGM,
            RESOURCE_TISSUE,
            RESOURCE_MUSCLE,
            RESOURCE_ORGANOID,
            RESOURCE_ORGANISM,
            RESOURCE_ALLOY,
            RESOURCE_TUBE,
            RESOURCE_FIXTURES,
            RESOURCE_FRAME,
            RESOURCE_HYDRAULICS,
            RESOURCE_MACHINE,
            RESOURCE_CONDENSATE,
            RESOURCE_CONCENTRATE,
            RESOURCE_EXTRACT,
            RESOURCE_SPIRIT,
            RESOURCE_EMANATION,
            RESOURCE_ESSENCE,
            RESOURCE_ENERGY,
        ]
    }
}
module.exports = referenceModule

