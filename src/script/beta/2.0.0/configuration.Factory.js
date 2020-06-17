const factoryConfiguration = {
    reservedEnergy:10000,
    // [type,amount] amount can be greedy
    "W22N25":[[RESOURCE_REDUCTANT,4000],[RESOURCE_OXIDANT,2500],[RESOURCE_UTRIUM_BAR,2500],[RESOURCE_ZYNTHIUM_BAR,2500],[RESOURCE_COMPOSITE,1000],[RESOURCE_WIRE,1000],[RESOURCE_SWITCH,100]],
    "W23N25":[[RESOURCE_KEANIUM_BAR,4000],[RESOURCE_ENERGY,"greedy"],[RESOURCE_CRYSTAL,1000]],
    "W21N24":[[RESOURCE_REDUCTANT,4000],[RESOURCE_ENERGY,"greedy"]],
    "W19N22":[[RESOURCE_PURIFIER,4000],[RESOURCE_ENERGY,"greedy"]],
    "W18N22":[[RESOURCE_LEMERGIUM_BAR,4000]],
    "sim":[]
}
module.exports = factoryConfiguration