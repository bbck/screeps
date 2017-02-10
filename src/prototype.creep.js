module.exports = function() {
  Creep.prototype.collectEnergy = function() {
    var containersWithEnergy = this.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_CONTAINER &&
                     s.store[RESOURCE_ENERGY] > 0
    });
    var storageWithEnergy = this.room.find(FIND_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_STORAGE &&
                     s.store[RESOURCE_ENERGY] > 0
    });

    // Get energy from containers
    if (containersWithEnergy) {
      if (this.withdraw(containersWithEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(containersWithEnergy);
      }
    // Otherwise get some from storage
    } else if (storageWithEnergy.length) {
      if (this.withdraw(storageWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(storageWithEnergy[0]);
      }
    // If all else fails harvest some
    } else {
      var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if(this.harvest(source) == ERR_NOT_IN_RANGE) {
        this.moveTo(source);
      }
    }
  }
}
