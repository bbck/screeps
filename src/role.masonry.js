var roleRepairer = require('role.repairer');

var roleMasonry = {
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
        creep.memory.target = null;
      }
      if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
      }

      if(creep.memory.working) {
        var savedTarget = Game.getObjectById(creep.memory.target);

        if (savedTarget && savedTarget.hits < savedTarget.hitsMax) {
          if(creep.repair(savedTarget) == ERR_NOT_IN_RANGE) {
            creep.moveTo(savedTarget);
          }
        } else {
          var newTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.hits / s.hitsMax) < creep.room.memory.wallHealth &&
                           s.structureType == STRUCTURE_WALL
          });

          if(newTarget) {
            creep.memory.target = newTarget.id;
            if(creep.repair(newTarget) == ERR_NOT_IN_RANGE) {
              creep.moveTo(newTarget);
            }
          } else {
            roleRepairer.run(creep);
          }
        }
      } else {
        creep.collectEnergy();
      }
    }
  }
};

module.exports = roleMasonry;
