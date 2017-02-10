var roleUpgrader = require('role.upgrader');

var roleBuilder = {
  run: function(creep) {
    var droppedEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
    if(droppedEnergy.length && creep.carry.energy < creep.carryCapacity) {
      creep.pickup(droppedEnergy[0]);
    }
    
    if (creep.room.name != creep.memory.home) {
      var exitDir = Game.map.findExit(creep.room, creep.memory.home);
      var exit = creep.pos.findClosestByRange(exitDir);
      creep.moveTo(exit);
    } else {
      if(creep.memory.working && creep.carry.energy == 0) {
        creep.memory.working = false;
      }
      if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
      }

      if(creep.memory.working) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
          if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
          }
        }
        else {
          roleUpgrader.run(creep);
        }
      }
      else {
        creep.collectEnergy();
      }
    }
  }
};

module.exports = roleBuilder;
