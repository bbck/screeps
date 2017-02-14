module.exports = function() {
  StructureSpawn.prototype.createWorkerCreep = function(roleName) {
    var size = Math.floor(this.room.energyCapacityAvailable / 200);
    var body = [];

    if (size > 10) {
      size = 10;
    }

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
      WORK,WORK,WORK,
      CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
      MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
    ];

    return this.createCreep(body, undefined, { home: this.room.name, role: 'remoteHarvester', working: false, target: target });
  }

  StructureSpawn.prototype.createClaimerCreep = function(targetRoom) {
    var body = [CLAIM, MOVE];

    return this.createCreep(body, undefined, { home: this.room.name, role: 'claimer', working: false, targetRoom: targetRoom });
  }

  StructureSpawn.prototype.createMinerCreep = function() {
    var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE];

    return this.createCreep(body, undefined, { home: this.room.name, role: 'miner', working: false });
  }
  StructureSpawn.prototype.createLorryCreep = function() {
    var body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];

    return this.createCreep(body, undefined, { home: this.room.name, role: 'lorry', working: false });
  }
}
