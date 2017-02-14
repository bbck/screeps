var roleMiner = {
  run: function(creep) {
    if (creep.room.name != creep.memory.home) {
      var exitDir = Game.map.findExit(creep.room, creep.memory.home);
      var exit = creep.pos.findClosestByRange(exitDir);
      creep.moveTo(exit);
    } else {
      if (creep.memory.working) {
        var source = creep.pos.findInRange(FIND_SOURCES_ACTIVE, 1);

        if (source.length) {
          creep.harvest(source[0]);
        }
      } else {
      // Get sources in the room
        var sources = creep.room.find(FIND_SOURCES);

        for (var i = 0; i < sources.length; i++) {
          // Find a container next to the source
          var container = sources[i].pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
          });

          if (container.length > 0) {
            // See if there is a creep on the container
            var found = container[0].pos.lookFor(LOOK_CREEPS);

            // Check if its this creep
            if (found.length && creep.pos.isEqualTo(found[0])) {
              creep.memory.working = true;
            }

            // If the container spot is free move there
            if(!found.length) {
              creep.moveTo(container[0]);
            }
          }
        }
      }
    }
  }
};

module.exports = roleMiner;
