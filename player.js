const playerTest = [
    {id: 1, name: 'Messi'},
    {id: 2, name: 'Higuain'},
    {id: 3, name: 'Mandzukic'}
];
exports.list = function(req, res){
    res.send(playerTest);
  };