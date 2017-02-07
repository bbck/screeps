module.exports = function() {
  StructureSpawn.prototype.createWorkerCreep = function(roleName) {
    var size = Math.floor(this.room.energyCapacityAvailable / 200);
    var body = [];

    for (var i = 0; i < size; i++) {
      body.push(WORK);
    }
    for (var i = 0; i < size; i++) {
      body.push(CARRY);
    }
    for (var i = 0; i < size; i++) {
      body.push(MOVE);
    }

    return this.createCreep(body, undefined, { role: roleName, working: false });
  }
}
