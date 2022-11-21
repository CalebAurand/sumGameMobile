import React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'


class RandomNumber extends React.Component {

  handlePress = () => {
    if(this.props.isDisabled){return;}
    this.props.onPress(this.props.id)
    //handle ui change on the state for the number to disable number after press
    //style selected number
  };

  render(){
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>{this.props.number}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    random: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    borderRadius: 30,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  
  disabled: {
        opacity: .3,
  }
})

export default RandomNumber