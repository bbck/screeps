
var roleRemoteHarvester = {
  run: function(creep) {
    if(creep.memory.working && creep.carry.energy == 0) {
      creep.memory.working = false;
    }
    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    if(creep.memory.working) {
      if (creep.room.name == creep.memory.home) {
        var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
          }
        });
        if(target) {
          if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      } else {
        creep.moveTo(Game.spawns['Spawn1']);
      }
    } else {
      var source = creep.pos.findPathTo(Game.flags['Flag1']);
      if(creep.harvest(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE || creep.harvest(creep.memory.target) == ERR_INVALID_TARGET) {
        creep.moveByPath(source);
      }
    }
  }
};

module.exports = roleRemoteHarvester;
