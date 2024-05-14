import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 



export default function App() {
  const buttons = ['AC', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 3, 2, 1, '+', 0, '.', '+/-', '=']  

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")


  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const fistNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    switch(operator){
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString())
        return
      case '-': 
        setCurrentNumber((fistNumber - lastNumber).toString())
        return
      case '*':
        setCurrentNumber((fistNumber * lastNumber).toString())
        return
      case '/': 
        setCurrentNumber((fistNumber / lastNumber).toString())
        return
    }
  }

  function handleInput(buttonPressed){
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "*" | buttonPressed === "/" ){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length -1)))
        return
      case 'AC':
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }

  const layoutStyle = {
    main: "#f5f5f5",
    secondary: "#7c7c7c",
    button: "#e5e5e5",
    text: "#282F38",
    number: "#fff",
    expression: "#ededed",
    action: '#9DBC7B'
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: layoutStyle.main,
      width: '100%',
      minHeight: 280,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    resultText: {
      color: layoutStyle.text,
      margin: 10,
      fontSize: 40
    },

    historyText:{
      color: layoutStyle.secondary,
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: 120,
      margin: 10,
      backgroundColor: layoutStyle.button,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: layoutStyle.button,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 90, 
      minHeight: 90,
      flex: 2,
    },
    textButton: {
      color:  layoutStyle.secondary,
      fontSize: 20,
    }, 
  });

  return (
    <View>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => 
          button === '=' ?
        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: layoutStyle.action}]}>
          <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, 
          {backgroundColor: typeof(button) === 'number' ? layoutStyle.number: layoutStyle.expression}]}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}


