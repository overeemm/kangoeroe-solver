var genetic = Genetic.create();
genetic.optimize = Genetic.Optimize.Minimize;
genetic.select1 = Genetic.Select1.Tournament3;
genetic.select2 = Genetic.Select2.Tournament3;

genetic.operations = {
  "flipUnder": function flipUnder(game) {
    var temp = game.pizza;
    var pizza = [temp[3], temp[2], temp[1], temp[0], temp[4], temp[5], temp[6], temp[7]];
    temp = game.cars;
    var cars = [temp[3], temp[2], temp[1], temp[0], temp[4], temp[5], temp[6], temp[7]];
    var result = { pizza: pizza, cars: cars, ops: game.ops };
    return result;
  },
  "flipUpper": function flipUpper(game) {
    var temp = game.pizza;
    var pizza = [temp[0], temp[1], temp[2], temp[3], temp[7], temp[6], temp[5], temp[4]];
    temp = game.cars;
    var cars = [temp[0], temp[1], temp[2], temp[3], temp[7], temp[6], temp[5], temp[4]];
    var result = { pizza: pizza, cars: cars, ops: game.ops };
    return result;
  },
  "flipLeft": function flipLeft(game) {
    var temp = game.pizza;
    var pizza = [temp[0], temp[1], temp[5], temp[4], temp[3], temp[2], temp[6], temp[7]];
    temp = game.cars;
    var cars = [temp[0], temp[1], temp[5], temp[4], temp[3], temp[2], temp[6], temp[7]];
    var result = { pizza: pizza, cars: cars, ops: game.ops };
    return result;
  },
  "flipRight": function flipRight(game) {
    var temp = game.pizza;
    var pizza = [temp[7], temp[6], temp[2], temp[3], temp[4], temp[5], temp[1], temp[0]];
    temp = game.cars;
    var cars = [temp[7], temp[6], temp[2], temp[3], temp[4], temp[5], temp[1], temp[0]];
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

  var ctx = $('#' + canvasid)[0].getContext("2d");
  ctx.clearRect(0, 0, $('#' + canvasid)[0].width, $('#' + canvasid)[0].height);

  game.cars.forEach(function (c, i) { genetic.drawCircle(ctx, 120,(i * 0.25) - 0.45,(i * 0.25) - 0.3, c); });

  genetic.drawCircle(ctx, 102, 0, 2, '#000000');

  game.pizza.forEach(function (p, i) { genetic.drawCircle(ctx, 100, (i * 0.25) - 0.5,(i * 0.25) - 0.25, p); });

  if (fitness) {
    ctx.fillStyle = black;
    ctx.font = "24px serif";
    ctx.fillText(fitness, 270, 45);
  }
};

genetic.draw = function draw(canvasid, game) {

  genetic.drawWithFitness(canvasid, game, pop[0].fitness.toPrecision(1));
};

genetic.simplify = function (ops) {
  var simpleOps = [];
  var prevOps = "";
  var curOps = "";
  var rotateCOps = 0;
  for (var i = 0; i < ops.length; i++) {
    curOps = ops[i];
     
    // Cancel out two equal flips in combination
    //     if(curOps.indexOf("flip") === 0 && prevOps.indexOf("flip") === 0 && prevOps == curOps){
    //       simpleOps.pop();
    //       prevOps = "";
    //     // combine all rotations into one
    //     } else 
    if (curOps.indexOf("rotateCarsC") === 0) {
      rotateCOps += parseInt(curOps.substr(11));
      prevOps = curOps;
    } else if (rotateCOps > 0) {
      var nrs = rotateCOps % 8;
      if (nrs > 0) {
        simpleOps.push("rotateCarsC" + (rotateCOps % 8));
        rotateCOps = 0;
        simpleOps.push(curOps);
      }
      prevOps = curOps;
    } else {
      simpleOps.push(curOps);
      prevOps = curOps;
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
  var value = pop[0].entity;
  this.last = this.last || value;

  this.drawWithFitness('canvas', value, pop[0].fitness.toPrecision(1));
  this.last = value;

  if (isFinished) {
    var ops = value.ops; //this.simplify(value.ops);
    if (confirm('Solution in ' + ops.length + ' steps. Visualize?')) {
      var initial = this.userData["initial"];
      initial = {
        pizza: initial.pizza,
        cars: initial.cars,
        ops: []
      };
      $('<canvas id="ops" width="350" height="350"></canvas>').appendTo("body");
      this.drawWithFitness('ops', initial, this.distance(initial));
      for (var i = 0; i < ops.length; i++) {
        var op = ops[i];
        $('<h1>' + op + '</h1>').appendTo("body");
        $('<canvas id="ops' + i + '" width="350" height="350"></canvas>').appendTo("body");
        initial = this.operations[op](initial);
        this.drawWithFitness('ops' + i, initial, this.distance(initial));
      }
    }
  }
};