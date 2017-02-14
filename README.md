# screeps
This is my AI for the game [Screeps](https://screeps.com/). It is currently extremely basic.

## Uploading code to the game

Create a secrets.json file with the following content:
```
{
  "screeps": {
    "email": "screeps@example.com",
    "password": "secret"
  }
}
```
Then run `grunt screeps` to push

## TODO
- [ ] Move remote harvesting locations into spawn memory
- [x] Container mining
- [x] Towers in other rooms
- [ ] Defense creeps
