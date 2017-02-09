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

    return this.createCreep(body, undefined, { home: this.room.name, role: roleName, working: false });
  }

  StructureSpawn.prototype.createRemoteHarvesterCreep = function(target) {
    var body = [
      WORK,WORK,WORK,WORK,
      CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
      MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
    ];

    return this.createCreep(body, undefined, { home: this.room.name, role: 'remoteHarvester', working: false, target: target });
  }

  StructureSpawn.prototype.createClaimerCreep = function(targetRoom) {
    var body = [CLAIM, MOVE];

    return this.createCreep(body, undefined, { home: this.room.name, role: 'claimer', working: false, targetRoom: targetRoom });
  }
}