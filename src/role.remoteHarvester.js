
var roleRemoteHarvester = {
  run: function(creep) {
    var droppedEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
    if(droppedEnergy.length && creep.carry.energy < creep.carryCapacity) {
      creep.pickup(droppedEnergy[0]);
    }
    
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

        // Look for storage if everything is full
        if (target == null) {
          var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE
          });
        }

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
