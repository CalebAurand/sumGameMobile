import React, {useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import RandomNumber from './RandomNumber'

export default function Game(props){

  const [selectedIds, setSelectedIds] = useState([]);

  let randomNumbers = Array.from({length: props.randomNumberCount}).map(() => 1 + Math.floor(10 * Math.random()));
  target = randomNumbers.slice(0, props.randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0);
  //todo shuffle the random numbers

  const isNumberSelected = (numberIndex) => {
    return selectedIds.indexOf(numberIndex) >= 0;
  };
  const selectNumber = (numberIndex) => {
    setSelectedIds((prevState)=>{
      return [...prevState, numberIndex];
    });
  };

  //gameStatus: Playing, wON, lOST
  const gameStatus = () => {
    const sumSelected = selectedIds.reduce((acc, curr)=>{
      return acc + randomNumbers[curr];
    }, 0);
    // console.warn(sumSelected)
    if(sumSelected < target){
      return 'PLAYING';
    };
    if(sumSelected === target){
      return 'WON';
    };
    if(sumSelected > target){
      return 'LOST';
    };
  };

  let currentGameStatus = gameStatus();
  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${currentGameStatus}`]]}>{target}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) => (
          <RandomNumber 
            key={index}
            id={index}
            number={randomNumber} 
            isDisabled={isNumberSelected(index) || currentGameStatus !== 'PLAYING'}
            onPress={selectNumber}
         />
         ))}
      </View>
      {/* Testing purpose section */}
      <Text>{currentGameStatus}</Text>
      <Text>
        {selectedIds.map((num, index)=><Text key={index}>{num}</Text>)}
      </Text>
      {/* Testing purpose section */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7D94B3',
    flex: 1,
    paddingTop: 30,
  },
  target: {
    fontSize: 50,
    margin: 50,
    textAlign: 'center'
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },

  STATUS_PLAYING: {
    backgroundColor: '#eee',
  },

  STATUS_WON: {
    backgroundColor: 'green',
  },

  STATUS_LOST: {
    backgroundColor: 'red',
  },
})