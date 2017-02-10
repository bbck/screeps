var roleRepairer = require('role.repairer');

var roleMasonry = {
  run: function(creep) {
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
            filter: (s) => (s.hits / s.hitsMax) < 0.01 && s.structureType == STRUCTURE_WALL
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
