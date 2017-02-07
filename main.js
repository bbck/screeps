var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMasonry = require('role.masonry');
var roleRemoteHarvester = require('role.remoteHarvester');

require('prototype.spawn')();

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_TOWER
    });

    for (let tower of towers) {
      var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

      if (target) {
        tower.attack(target);
      }
    }

    var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester');
    var masonrys = _.filter(Game.creeps, (creep) => creep.memory.role == 'masonary');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(harvesters.length < 2) {
        var newName = Game.spawns['Spawn1'].createWorkerCreep('harvester');
        console.log('Spawning new harvester: ' + newName);
    } else if(remoteHarvesters.length < 2) {
        var newName = Game.spawns['Spawn1'].createRemoteHarvesterCreep('57ef9ef486f108ae6e6102e9');
        console.log('Spawning new remote harvester: ' + newName);
    } else if(upgraders.length < 1) {
        var newName = Game.spawns['Spawn1'].createWorkerCreep('upgrader');
        console.log('Spawning new upgrader: ' + newName);
    } else if(builders.length < 1) {
        var newName = Game.spawns['Spawn1'].createWorkerCreep('builder');
        console.log('Spawning new builder: ' + newName);
    } else if (repairers.length < 1) {
        var newName = Game.spawns['Spawn1'].createWorkerCreep('repairer');
        console.log('Spawning new repairer: ' + newName);
    } else {
        var newName = Game.spawns['Spawn1'].createWorkerCreep('masonary');
        console.log('Spawning new masonary: ' + newName);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'masonary') {
            roleMasonry.run(creep);
        }
        if(creep.memory.role == 'remoteHarvester') {
            roleRemoteHarvester.run(creep);
        }
    }
}
