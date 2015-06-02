var genetic = Genetic.create();
genetic.optimize = Genetic.Optimize.Minimize;
genetic.select1 = Genetic.Select1.Tournament3;
genetic.select2 = Genetic.Select2.Tournament3;

genetic.operations = {
  "flipUnder": function flipUnder(game) {
    var temp = game.pizza;
    var pizza = [temp[0], temp[1], temp[5], temp[4], temp[3], temp[2], temp[6], temp[7]];
    temp = game.cars;
    var cars = [temp[0], temp[1], temp[5], temp[4], temp[3], temp[2], temp[6], temp[7]];
    var result = { pizza: pizza, cars: cars, ops: game.ops };
    return result;
  },
  "flipUpper": function flipUpper(game) {
    var temp = game.pizza;
    var pizza = [temp[7], temp[6], temp[2], temp[3], temp[4], temp[5], temp[1], temp[0]];
    temp = game.cars;
    var cars = [temp[7], temp[6], temp[2], temp[3], temp[4], temp[5], temp[1], temp[0]];
    var result = { pizza: pizza, cars: cars, ops: game.ops };
    return result;
  },
  "flipLeft": function flipLeft(game) {
    var temp = game.pizza;
    var pizza = [temp[0], temp[1], temp[2], temp[3], temp[7], temp[6], temp[5], temp[4]];
    temp = game.cars;
    var cars = [temp[0], temp[1], temp[2], temp[3], temp[7], temp[6], temp[5], temp[4]];
    var result = { pizza: pizza, cars: cars, ops: game.ops };
    return result;
  },
  "flipRight": function flipRight(game) {
    var temp = game.pizza;
    var pizza = [temp[3], temp[2], temp[1], temp[0], temp[4], temp[5], temp[6], temp[7]];
    temp = game.cars;
    var cars = [temp[3], temp[2], temp[1], temp[0], temp[4], temp[5], temp[6], temp[7]];
    var result = { pizza: pizza, cars: cars, ops: game.ops };
    return result;
  },
  "rotateCarsC1": function rotateCarsC1(game) {
    var temp = game.cars;
    var cars = [temp[7], temp[0], temp[1], temp[2], temp[3], temp[4], temp[5], temp[6]];
    var result = { pizza: game.pizza, cars: cars, ops: game.ops };
    return result;
  },
  "rotateCarsC2": function rotateCarsC2(game) {
    var temp = game.cars;
    var cars = [temp[6], temp[7], temp[0], temp[1], temp[2], temp[3], temp[4], temp[5]];
    var result = { pizza: game.pizza, cars: cars, ops: game.ops };
    return result;
  },
  "rotateCarsC3": function rotateCarsC3(game) {
    var temp = game.cars;
    var cars = [temp[5], temp[6], temp[7], temp[0], temp[1], temp[2], temp[3], temp[4]];
    var result = { pizza: game.pizza, cars: cars, ops: game.ops };
    return result;
  },
  "rotateCarsC4": function rotateCarsC4(game) {
    var temp = game.cars;
    var cars = [temp[4], temp[5], temp[6], temp[7], temp[0], temp[1], temp[2], temp[3]];
    var result = { pizza: game.pizza, cars: cars, ops: game.ops };
    return result;
  },
  "rotateCarsC5": function rotateCarsC5(game) {
    var temp = game.cars;
    var cars = [temp[3], temp[4], temp[5], temp[6], temp[7], temp[0], temp[1], temp[2]];
    var result = { pizza: game.pizza, cars: cars, ops: game.ops };
    return result;
  },
  "rotateCarsC6": function rotateCarsC6(game) {
    var temp = game.cars;
    var cars = [temp[2], temp[3], temp[4], temp[5], temp[6], temp[7], temp[0], temp[1]];
    var result = { pizza: game.pizza, cars: cars, ops: game.ops };
    return result;
  },
  "rotateCarsC7": function rotateCarsC7(game) {
    var temp = game.cars;
    var cars = [temp[1], temp[2], temp[3], temp[4], temp[5], temp[6], temp[7], temp[0]];
    var result = { pizza: game.pizza, cars: cars, ops: game.ops };
    return result;
  }
};
genetic.operationsNames = ["flipUnder", "flipUpper", "flipLeft", "flipRight", "rotateCarsC1", "rotateCarsC2",
  "rotateCarsC3", "rotateCarsC4", "rotateCarsC5", "rotateCarsC6", "rotateCarsC7"];
genetic.operationsNamesNl = {
  "flipUnder": "draai onderkant",
  "flipUpper": "draai bovenkant",
  "flipLeft": "draai linkerkant",
  "flipRight": "draai rechterkant",
  "rotateCarsC1": "draai auto's 1x",
  "rotateCarsC2": "draai auto's 2x",
  "rotateCarsC3": "draai auto's 3x",
  "rotateCarsC4": "draai auto's 4x",
  "rotateCarsC5": "draai auto's 5x",
  "rotateCarsC6": "draai auto's 6x",
  "rotateCarsC7": "draai auto's 7x"
};
  
genetic.drawCircle = function drawCircle(canvas, size, start, end, color) {

  canvas.fillStyle = color;
  //draw a circle
  canvas.beginPath();
  canvas.moveTo(175, 175);
  canvas.arc(175, 175, size, start * Math.PI, Math.PI * end, false);
  canvas.lineTo(175, 175);
  canvas.closePath();
  canvas.fill();
};

genetic.drawWithFitness = function drawWithFitness(canvasid, game, fitness) {

  var canvas = $('#' + canvasid)[0];
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.cars.forEach(function (c, i) { genetic.drawCircle(ctx, 120,(i * 0.25) - 0.45,(i * 0.25) - 0.3, c); });

  genetic.drawCircle(ctx, 102, 0, 2, '#000000');

  game.pizza.forEach(function (p, i) { genetic.drawCircle(ctx, 100, (i * 0.25) - 0.5,(i * 0.25) - 0.25, p); });

  if (fitness) {
    ctx.fillStyle = black;
    ctx.font = "24px serif";
    ctx.fillText(fitness, 270, 45);
  }
};

genetic.simplify = function (ops) {
  var simpleOps = [];
  var curOps = "";
  for (var i = 0; i < ops.length; i++) {
    curOps = ops[i];
     
    if (simpleOps.length > 0) {
      var prevOps = simpleOps[simpleOps.length - 1];

      if (curOps.indexOf("rotateCarsC") === 0 && prevOps.indexOf("rotateCarsC") === 0) {
        var curNr = parseInt(curOps.substr(11), 10);
        var prevNr = parseInt(prevOps.substr(11), 10);

        simpleOps.pop();
        var nrs = (curNr + prevNr) % 8;
        if (nrs > 0) {
          simpleOps.push("rotateCarsC" + nrs);
        }

      } else if (curOps.indexOf("flip") === 0 && prevOps.indexOf("flip") === 0 && prevOps == curOps) {
        simpleOps.pop();
      } else {
        simpleOps.push(curOps);
      }
    } else {
      simpleOps.push(curOps);
    }
  }

  return simpleOps;
};

genetic.distance = function (game) {

  return game.cars.map(function (c, i) {
    var pI = game.pizza.indexOf(c);
    var dist = Math.abs(i - pI);
    dist = Math.abs(dist > 4 ? dist - 8 : dist);
    return dist;
  }).reduce(function (prev, cur) { return prev + cur; }, 0);
};

genetic.seed = function () {
  return this.userData["initial"];
};

genetic.mutate = function (entity) {

  var numberOfOps = 1 + Math.floor(Math.random() * 10);
  var game = entity;
  var opIndex = 0, opName = "", op = null;

  for (var i = 0; i < numberOfOps; i++) {
    opIndex = Math.floor(Math.random() * genetic.operationsNames.length);
    opName = genetic.operationsNames[opIndex];
    op = genetic.operations[opName];
    game = op(game);
    game.ops.push(op.name);
  }
  return game;
};

genetic.crossover = function (mother, father) {
  // two-point crossover. In this case there is no crossover.
  // let's see if the algorithm then still works
  var son = father;
  var daughter = mother;

  return [son, daughter];
};

genetic.fitness = function (entity) {
  return genetic.distance(entity);
};

genetic.generation = function (pop, generation, stats) {
  return pop[0].fitness != 0;
};

genetic.notification = function (pop, generation, stats, isFinished) {
  console.log(generation);
  var value = pop[0].entity;
  this.last = this.last || value;

  this.drawWithFitness('canvas', value, pop[0].fitness.toPrecision(1));
  this.last = value;

  if (isFinished && stats.maximum != 0) {

    $('.oplossing').nextAll("h1, canvas").remove();
    alert('De oplossing is niet gevonden! :(');
    
  } else if (isFinished && stats.maximum == 0) {

    $('.oplossing').nextAll("h1, canvas").remove();
    
    var ops = this.simplify(value.ops);
    if (confirm('De oplossing is ' + ops.length + ' stappen. Zal ik hem tonen?')) {
      var initial = this.userData["initial"];
      initial = {
        pizza: initial.pizza,
        cars: initial.cars,
        ops: []
      };
      $('<h1>Oplossing</h1>').appendTo("body");
      $('<canvas id="ops" width="350" height="350"></canvas>').appendTo("body");
      this.drawWithFitness('ops', initial, this.distance(initial));
      for (var i = 0; i < ops.length; i++) {
        var op = ops[i];
        $('<h1>' + genetic.operationsNamesNl[op] + '</h1>').appendTo("body");
        $('<canvas id="ops' + i + '" width="350" height="350"></canvas>').appendTo("body");
        initial = this.operations[op](initial);
        this.drawWithFitness('ops' + i, initial, this.distance(initial));
      }
    }
    
  }
};