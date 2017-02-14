var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMasonry = require('role.masonry');
var roleRemoteHarvester = require('role.remoteHarvester');
var roleClaimer = require('role.claimer');
var roleMiner = require('role.miner');

require('prototype.spawn')();
require('prototype.creep')();

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

    for (let spawnName in Game.spawns) {
      let spawn = Game.spawns[spawnName];

      var miners = _.filter(Game.creeps, (creep) => creep.memory.home == spawn.room.name && creep.memory.role == 'miner');
      var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.home == spawn.room.name && creep.memory.role == 'remoteHarvester');
      var masonrys = _.filter(Game.creeps, (creep) => creep.memory.home == spawn.room.name && creep.memory.role == 'masonary');
      var repairers = _.filter(Game.creeps, (creep) => creep.memory.home == spawn.room.name && creep.memory.role == 'repairer');
      var builders = _.filter(Game.creeps, (creep) => creep.memory.home == spawn.room.name && creep.memory.role == 'builder');
      var upgraders = _.filter(Game.creeps, (creep) => creep.memory.home == spawn.room.name && creep.memory.role == 'upgrader');
      var harvesters = _.filter(Game.creeps, (creep) => creep.memory.home == spawn.room.name && creep.memory.role == 'harvester');

      if(harvesters.length < spawn.memory.harvesters) {
          var newName = spawn.createWorkerCreep('harvester');
          console.log('Spawning new harvester: ' + newName);
      } else if(miners.length < spawn.memory.miners){
          var newName = spawn.createMinerCreep();
          console.log('Spawning new miner: ' + newName);
      } else if(remoteHarvesters.length < spawn.memory.remoteHarvesters) {
          var newName = spawn.createRemoteHarvesterCreep('57ef9ef486f108ae6e6102e7');
          console.log('Spawning new remote harvester: ' + newName);
      } else if(upgraders.length < spawn.memory.upgraders) {
          var newName = spawn.createWorkerCreep('upgrader');
          console.log('Spawning new upgrader: ' + newName);
      } else if(builders.length < spawn.memory.builders) {
          var newName = spawn.createWorkerCreep('builder');
          console.log('Spawning new builder: ' + newName);
      } else if (repairers.length < spawn.memory.repairers) {
          var newName = spawn.createWorkerCreep('repairer');
          console.log('Spawning new repairer: ' + newName);
      } else if (masonrys.length < spawn.memory.masonrys){
          var newName = spawn.createWorkerCreep('masonary');
          console.log('Spawning new masonary: ' + newName);
      }
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
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
    }
}
