export function weightedSelect( values, weights ) {
  const totalWeight = weights.reduce( (a,b) => a+b );
  const position = totalWeight * Math.random(); //min is 0, max is the total
  let rollingSum = 0;
  let chosen;
  for ( let i = 0; i < weights.length; i++ ) {
    rollingSum += weights[i];
    if ( position <= rollingSum ) {
      chosen = i;
      break;
    }
  }
  return values[chosen];
}

export function weightedSelectTrials( values, weights, trials = 10000 ) {
  let outcomes = Object.fromEntries( values.map( value => [value, 0] ) );
  for ( let i = 0; i < trials; i++ ) {
    let chosenValue = weightedSelect( values, weights );
    outcomes[chosenValue]++;
  }
  return outcomes;
}

export function testWeightedSelect( values, weights, trials = 10000 ) {
  //normalize to a percentage
  //look at difference from expected
  let outcomes = weightedSelectTrials( values, weights, trials );
  const totalWeight = weights.reduce( (a,b) => a+b );
  const percentage = (number) => {
    return number * 100 / trials;
  }
  let results = values.map( (value, i) => {
    let chosen = outcomes[value];
    let expected = Math.round( trials * weights[i] / totalWeight );
    let errorMargin = percentage( chosen - expected );
    return [ value, { actual: {n: chosen, percent: percentage(chosen)}, expected: {n: expected, percent: percentage(expected)}, errorMargin } ];
  })

  return Object.fromEntries( results );
}

export function errorMargins( results ) {
  let margins = Object.values(results).map( object => object.errorMargin );
  margins.sort();
  return margins;
}